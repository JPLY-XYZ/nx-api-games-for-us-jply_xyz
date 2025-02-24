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

        console.log(process.env.ENCRYPTION_SERVER_KEY);

        let { usuarioId } = decryptJSON(body.encryptedData, body.iv, process.env.ENCRYPTION_SERVER_KEY);

        console.log(usuarioId);

        const { database } = await connectToDatabase();
        const collection = database.collection(process.env.MONGODB_USERS);

        const usuario = await collection.findOne( {_id: new ObjectId(usuarioId)} );

        if (!usuario) {
            return Response.json(
                { message: "El usuario no existe" },
                { status: 401 }
            );
        }

        const userData = {
            nickName: usuario.nickName,
            avatar_url: usuario.avatar_url,
            email: usuario.email,
            fullName: usuario.fullName
        };

        return Response.json({
            message: "Datos enviados correctamente",
            body: JSON.stringify(userData), 
        }, { status: 200 });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return Response.json({ message: "Hubo un error en el servidor" }, { status: 500 });
    }
}

