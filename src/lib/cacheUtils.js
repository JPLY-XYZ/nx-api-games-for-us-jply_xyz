import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";

export async function setCache(data) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_CACHE_GAMES);

    data.forEach(async (game) => {
       
         
        const juego = await collection.findOne({ _id : game.id });

        if(juego){
            console.log("ya existe");
            return;
        }

        console.log("haciendo set cache");
        const newGame = {
            _id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms,
            released: game.released,
            images: game.images,
        }
        const results = await collection.insertOne(newGame);
        console.log(results);
    }

)
  
}

export async function findCache(name, limit = 0) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_CACHE_GAMES);
    const results = await collection.find({ name: { $regex: `.*${name}.*`, $options: "i" } }).limit(limit).toArray();


    // console.log(results);

    return results;


}