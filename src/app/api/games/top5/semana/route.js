import { setCache } from "@/lib/cacheUtils";
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

    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
    
    const firstDateOfWeek = firstDayOfWeek.toISOString().split("T")[0];
    const lastDateOfWeek = lastDayOfWeek.toISOString().split("T")[0];
    

    const results = await fetch(`https://api.rawg.io/api/games?dates=${firstDateOfWeek},${lastDateOfWeek}&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    const data = await results.json();

    const body = await request.json();
    console.log(body);

    console.log(process.env.ENCRYPTION_SERVER_KEY);

    let { usuarioId } = decryptJSON(body.encryptedData, body.iv, process.env.ENCRYPTION_SERVER_KEY);

    console.log(usuarioId);

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_USERS);

    const usuario = await collection.findOne({ _id: new ObjectId(usuarioId) });

    if (!usuario) {
        return Response.json(
            { message: "El usuario no existe" },
            { status: 401 }
        );
    }
    console.log(usuario.liked_games); //usuario.liked_games

    const games = data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms.map(platform => platform.platform.id),
            released: game.released,
            images: game.short_screenshots.map(image => image.image),
            btnStatus: { liked: usuario.liked_games.includes(game.id.toString()), saved: usuario.saved_games.includes(game.id.toString())  }
        }
    });
    await setCache(games);
    // console.log(games);

    return Response.json(games);
}


export async function GET(request) {
    const apiKeyHeader = request.headers.get("x-api-key");
        if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
            return Response.json(
                { message: "No tienes permiso para acceder a este recurso" },
                { status: 401 }
            );
        };

    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() - 6));
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 14));
    
    const firstDateOfWeek = firstDayOfWeek.toISOString().split("T")[0];
    const lastDateOfWeek = lastDayOfWeek.toISOString().split("T")[0];
    
    console.log(firstDateOfWeek)
    console.log(lastDateOfWeek)

     const results = await fetch(`https://api.rawg.io/api/games?dates=${firstDateOfWeek},${lastDateOfWeek}&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
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