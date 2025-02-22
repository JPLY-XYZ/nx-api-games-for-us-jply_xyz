import { findCache } from "@/lib/cacheUtils";
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


    if (search == "") {
        console.log("no hay busqueda");
    }

    const data = await findCache(search);


    console.log("Mostrando cache");
    const games = data
        .map(game => {
            if (usuario.liked_games.includes(game._id.toString())) {
                return {
                    id: game._id,
                    name: game.name,
                    background_image: game.background_image,
                    platforms: game.platforms,
                    released: game.released,
                    images: game.images,
                    btnStatus: {
                        liked: usuario.liked_games.includes(game._id.toString()),
                        saved: usuario.saved_games.includes(game._id.toString())
                    }
                };
            }
            return null; // Opcional, pero más claro
        })
        .filter(Boolean); // Filtra los `null` o `undefined`
    console.log(games);
    return Response.json(games);

}

