export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function GET(request) {
    const apiKeyHeader = request.headers.get("x-api-key");
        if (apiKeyHeader !== process.env.CLIENT_API_KEY) {
            return Response.json(
                { message: "No tienes permiso para acceder a este recurso" },
                { status: 401 }
            );
        }      
        const body = await request.json();
        console.log(body);

        
    

    return Response.json(results);
}