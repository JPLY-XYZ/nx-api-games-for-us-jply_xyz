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

    const steamId64 = request.nextUrl.searchParams.get("steamId64");

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

    await collection.updateOne(
        { _id: new ObjectId(usuarioId) }, // Filtro para encontrar el usuario
        { $set: { steamId64: steamId64 } } // Nuevo campo steamId64 con su valor
    );

    const result = await verifySteamId64(steamId64);

    if (result.exists) {
        // Si el SteamID64 es válido, obtenemos los juegos del usuario
       await getUserGames(steamId64, usuarioId);

        // Mostrar los juegos en consola (si es necesario, puedes modificar esto)


        // Responder con un mensaje que indica que la actualización se realizó correctamente
        return Response.json({ message: "Actualizando" }, { status: 200 });
    } else {
        // Si el SteamID64 no es válido, respondemos con un error 401

        return Response.json({ message: result.message }, { status: 401 });
    }





}









//NUEVO CODIGO

const axios = require("axios");

// Función para verificar si un SteamID64 es válido
async function verifySteamId64(steamId64) {
    const apiKey = "TU_API_KEY"; // Tu API Key de Steam
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${steamId64}`;

    try {
        const response = await axios.get(url);

        // Verificamos si la respuesta contiene información del jugador
        if (response.data.response.players && response.data.response.players.length > 0) {
            const player = response.data.response.players[0];
            return { exists: true, player }; // El SteamID64 es válido
        } else {
            return { exists: false, message: "SteamID64 no encontrado" }; // El SteamID64 no corresponde a un usuario existente
        }
    } catch (error) {
        console.error("Error al verificar SteamID64:", error.message);
        return { exists: false, message: "Error en la consulta a la API de Steam" };
    }
}

// Ejemplo de uso




// 🎮 Función para obtener juegos de Steam
async function getSteamGames(steamId64) {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId64}&include_appinfo=true`;
    try {
        const response = await axios.get(url);
        return response.data.response.games.map(game => game.name); // Retorna solo los nombres de los juegos
    } catch (error) {
        console.error("Error al obtener juegos de Steam:", error.message);
        return [];
    }
}

// 🔍 Función para buscar un juego en RAWG
async function searchGameInRawg(gameName) {
    const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&page_size=1&key=${process.env.RAWG_API_KEY}`;
    try {
        const response = await axios.get(url);
        const game = response.data.results[0]; // Tomar el primer resultado
        if (!game) return null;

        return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms.map(platform => platform.platform.id),
            released: game.released,
            images: game.short_screenshots.map(image => image.image),
        };
    } catch (error) {
        console.error(`Error al buscar ${gameName} en RAWG:`, error.message);
        return null;
    }
}

// 🔥 Función para obtener y guardar juegos en MongoDB
async function getUserGames(steamId64, usuarioId) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_USERS);

    // 📌 Buscar al usuario en la base de datos
    const usuario = await collection.findOne({ _id: new ObjectId(usuarioId) });
    if (!usuario) {
        return { message: "El usuario no existe", status: 401 };
    }

    // 🕹️ Obtener juegos de Steam
    const steamGames = await getSteamGames(steamId64);
    const gamesData = [];

    // Realizamos las consultas en paralelo
    const rawgGamesPromises = steamGames.map(async (gameName) => {
        const game = await searchGameInRawg(gameName);
        if (game) {
            const gameId = game.id.toString();

            // 🏆 Verificar si el juego ya está en `saved_games`, si no, lo agregamos
            if (!usuario.saved_games.includes(gameId)) {
                await collection.updateOne(
                    { _id: new ObjectId(usuarioId) },
                    { $addToSet: { saved_games: gameId } } // Agregar sin duplicados
                );
            }

            // 📌 Agregar juego a la lista con el estado de los botones
            gamesData.push({
                ...game,
                btnStatus: {
                    liked: usuario.liked_games.includes(gameId),
                    saved: usuario.saved_games.includes(gameId),
                },
            });
        }
    });

    // Esperamos todas las búsquedas en paralelo
    await Promise.all(rawgGamesPromises);

    // 🚀 Cacheamos los juegos
    await setCache(gamesData);

    return gamesData;
}

