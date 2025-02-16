import { connectToDatabase } from "@/lib/mongodb";
import CryptoJS from "crypto-js";


export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function POST(request) {
    try {
        const apiKeyHeader = request.headers.get("x-api-key");
        if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
            return Response.json(
                { message: "No tienes permiso para acceder a este recurso" },
                { status: 401 }
            );
        }

        const { database } = await connectToDatabase();
        const collection = database.collection(process.env.MONGODB_USERS);

        const {data} = await request.json();

        

        const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_CLIENT_KEY);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        const { email, password } = JSON.parse(decryptedText);

        console.log(email, password);

        const usuario = await collection.findOne({ email });

        if (!usuario) {
            return Response.json(
                { message: "El usuario no existe" },
                { status: 401 }
            );
        }

        if (usuario.password !== password) {
            return Response.json(
                { message: "La contraseña es incorrecta" },
                { status: 401 }
            );
        }

        return Response.json({
            message: "Autenticación exitosa",
        }, { status: 202 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return Response.json({ message: "Hubo un error en el servidor" }, { status: 500 });
    }
}
