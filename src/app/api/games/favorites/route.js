import { decryptJSON } from "@/lib/cryptoUtils";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function POST(request) {
    try {
        // Verificar la clave de API
        const apiKeyHeader = request.headers.get("x-api-key");
        if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
            return Response.json(
                { message: "No tienes permiso para acceder a este recurso" },
                { status: 401 }
            );
        }

        // Obtener los datos cifrados desde la solicitud
        const body = await request.json();
        console.log(body);

        // console.log(process.env.ENCRYPTION_SERVER_KEY);

        let {usuarioId, gameId, status} = decryptJSON(body.encryptedData, body.iv, process.env.ENCRYPTION_CLIENT_KEY);
        let subdata = JSON.parse(usuarioId);
        let userId = decryptJSON(subdata.encryptedData, subdata.iv, process.env.ENCRYPTION_SERVER_KEY);

        console.log(userId);
        console.log(gameId);
        console.log(status);

        const { database } = await connectToDatabase();
        const collection = database.collection(process.env.MONGODB_USERS);

        const usuario = await collection.findOne( {_id: new ObjectId(userId.usuarioId)} );
        
        if (usuario.liked_games.includes(gameId.toString())) {
            // eliminarlo
            const results = await collection.updateOne(
                { _id: new ObjectId(userId.usuarioId) },
                { $pull: { liked_games:  gameId.toString()  } }
            );
        } else {
            // agregarlo
            const results = await collection.updateOne(
                { _id: new ObjectId(userId.usuarioId) },
                { $push: { liked_games: gameId.toString() } }
            );
        }

       
        return Response.json({
            message: "Datos enviados correctamente"
        }, { status: 200 });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return Response.json({ message: "Hubo un error en el servidor" }, { status: 500 });
    }

    
    
}