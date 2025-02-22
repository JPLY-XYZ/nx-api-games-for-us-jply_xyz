import { findCache, setCache } from "@/lib/cacheUtils";
import { decryptJSON } from "@/lib/cryptoUtils";

import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function POST(request) {
    const apiKeyHeader = request.headers.get("x-api-key");
    if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
        return Response.json(
            { message: "No tienes permiso para acceder a este recurso" },
            { status: 401 }
        );
    };

    const search = request.nextUrl.searchParams.get("search");

    const body = await request.json();
    console.log(body);

    let { usuarioId } = decryptJSON(body.encryptedData, body.iv, process.env.ENCRYPTION_SERVER_KEY);

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_USERS);

    const usuario = await collection.findOne({ _id: new ObjectId(usuarioId) });

    if (!usuario) {
        return Response.json(
            { message: "El usuario no existe" },
            { status: 401 }
        );
    }

    console.log(usuario.liked_games);

    let data = [];

    if (search == "") {
        data = await findCache(search, 30);
    } else {
        data = await findCache(search, 0);
    }

   

    if (data.length > 0) {
        console.log("Mostrando cache");
        const games = data.map(game => {
            return {
                id: game._id,
                name: game.name,
                background_image: game.background_image,
                 platforms: game.platforms,
                released: game.released,
                images: game.images,
                btnStatus: { liked: usuario.liked_games.includes(game._id.toString()), saved: usuario.saved_games.includes(game._id.toString()) }
            }
        });

        return Response.json(games);
    } else {
        console.log("Buscando en la api");
        const results = await fetch(`https://api.rawg.io/api/games?search=${search}&page_size=25&key=${process.env.RAWG_API_KEY}`);
        const data = await results.json();

        const games = data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                platforms: game.platforms.map(platform => platform.platform.id),
                released: game.released,
                images: game.short_screenshots.map(image => image.image),
                btnStatus: { liked: usuario.liked_games.includes(game.id.toString()), saved: usuario.saved_games.includes(game.id.toString()) }
            }
        });
        await setCache(games);
        // console.log(games);
        return Response.json(games);
    }
}



export async function GET(request, { params }) {
    const apiKeyHeader = request.headers.get("x-api-key");
    if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
        return Response.json(
            { message: "No tienes permiso para acceder a este recurso" },
            { status: 401 }
        );
    };

    const search = request.nextUrl.searchParams.get("search");
    // const search = "grand";



    if (search == "") {
        console.log("no hay busqueda");
    }

    const games = await findCache(search);

    if (games.length > 0) {
        console.log("Mostrando cache");
        return Response.json(games);
    }

    else {
        console.log("Buscando en la api");
        const results = await fetch(`https://api.rawg.io/api/games?search=${search}&page_size=25&key=${process.env.RAWG_API_KEY}`);
        const data = await results.json();

        const games = data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                platforms: game.platforms.map(platform => platform.platform.id),
                released: game.released,
                images: game.short_screenshots.map(image => image.image),
                btnStatus: { liked: false, saved: false }
            }
        });
        await setCache(games);
        // console.log(games);
        return Response.json(games);
    }
}



