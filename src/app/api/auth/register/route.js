import { decryptJSON, encryptJSON, hashPassword } from "@/lib/cryptoUtils";
import { connectToDatabase } from "@/lib/mongodb";



export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function POST(request) {
    const bcrypt = require('bcrypt');

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

        const body = await request.json();
        console.log(body);

        console.log(process.env.ENCRYPTION_CLIENT_KEY);

        let { email, password, fullName, nickName } = decryptJSON(body.encryptedData, body.iv, process.env.ENCRYPTION_CLIENT_KEY);


        const usuarioExixtente = await collection.findOne({ email: email.toUpperCase() });

        if (usuarioExixtente) {
            return Response.json(
                { message: "El usuario ya existe" },
                { status: 406 }
            );
        }

        console.log(email);
        console.log(password);
        console.log(fullName);
        console.log(nickName);

        

        const availableColors = ["blue", "green", "red", "purple", "yellow", "orange", "navy", "turquoise", "magenta", "gray"];
        function getRandomColor() {
            const idx = Math.floor(Math.random() * availableColors.length);
            return availableColors[idx];
        }
        const avatar_url = 'https://placehold.co/400x400/' + getRandomColor() + '/white?text=' + nickName.substring(0, 1).toUpperCase();

        let newUser = {
            email : email.toUpperCase(),
            password : await hashPassword(password),
            fullName,
            nickName,
            avatar_url,
            created_at: new Date().toISOString(),
            liked_games: [],
            saved_games: [],
        }

        await collection.insertOne(newUser);

        const usuario = await collection.findOne({ email: email.toUpperCase() });


        const loginToken = {
            usuarioId: usuario._id,  //inicialmente se manda como token de inicio de sesion el cual se guarda en localstorage, el id de usuario, se pueden mandar alguna frase de seguraidad o algo mas
        };

        const userData = {
            nickName: usuario.nickName,
            avatar_url: usuario.avatar_url,
        };

        const encryptedLoginToken = encryptJSON(loginToken, process.env.ENCRYPTION_SERVER_KEY);

        return Response.json({
            message: "Autenticación exitosa",
            body: {
                loginToken: JSON.stringify(encryptedLoginToken),
                userData: JSON.stringify(userData),
            }
        }, { status: 202 });


    } catch (error) {
        console.error("Error en el servidor:", error);
        return Response.json({ message: "Hubo un error en el servidor" }, { status: 500 });
    }
}