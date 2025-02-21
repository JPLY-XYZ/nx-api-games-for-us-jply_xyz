
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
        };

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');


    console.log(year, +month+1);

    const results = await fetch(`https://api.rawg.io/api/games?dates=${year}-${month}-01,${year}-${String(+month+1).padStart(2, '0')}-31&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);

    

    const data = await results.json();

    const games = data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms.map(platform => platform.platform.id),
            released: game.released,
            images: game.short_screenshots.map(image => image.image)
        }
    });
    console.log(games);

    return Response.json(games);
}