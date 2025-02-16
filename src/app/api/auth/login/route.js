import { decryptJSON, encryptJSON } from "@/lib/cryptoUtils";
import { connectToDatabase } from "@/lib/mongodb";



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

        const  body  = await request.json();
        console.log(body);

        console.log(process.env.ENCRYPTION_CLIENT_KEY); 

        let {email,password} = decryptJSON(body.encryptedData,body.iv,process.env.ENCRYPTION_CLIENT_KEY);

        console.log(email);
        console.log(password);

        const usuario = await collection.findOne( {email} );

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

        const loginToken = {
            usuarioId: usuario._id,//inicialmente se manda como token de inicio de sesion el cual se guarda en localstorage, el id de usuario, se pueden mandar alguna frase de seguraidad o algo mas
        };

        const encryptedLoginToken = encryptJSON(loginToken,process.env.ENCRYPTION_SERVER_KEY);

        return Response.json({
            message: "Autenticación exitosa",
            body: JSON.stringify(encryptedLoginToken),
        }, { status: 202 });

        
    } catch (error) {
        console.error("Error en el servidor:", error);
        return Response.json({ message: "Hubo un error en el servidor" }, { status: 500 });
    }
}
