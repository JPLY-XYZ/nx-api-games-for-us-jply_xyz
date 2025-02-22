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
    

    //  const results = await fetch(`https://api.rawg.io/api/games?dates=${firstDateOfWeek},${firstDateOfWeek}&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    //  const data = await results.json();

   const data = {
        "count": 224,
        "next": "https://api.rawg.io/api/games?dates=2025-02-17%2C2025-02-23&=-added&page=2&page_size=5",
        "previous": null,
        "results": [
            {
                "slug": "avowed",
                "name": "Avowed",
                "playtime": 4,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/3d3/3d33abf32d9fb92b9f242917abe276ba.jpg",
                "rating": 3.07,
                "rating_top": 1,
                "ratings": [
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 5,
                        "percent": 33.33
                    },
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 4,
                        "percent": 26.67
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 3,
                        "percent": 20.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 3,
                        "percent": 20.0
                    }
                ],
                "ratings_count": 14,
                "reviews_text_count": 0,
                "added": 325,
                "added_by_status": {
                    "yet": 49,
                    "owned": 41,
                    "beaten": 2,
                    "toplay": 213,
                    "dropped": 7,
                    "playing": 13
                },
                "metacritic": null,
                "suggestions_count": 205,
                "updated": "2025-02-21T08:35:44",
                "id": 471025,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235424,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58241,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44585,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42830,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43562,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20578,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20972,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 36021,
                        "image_background": "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14913,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23501,
                        "image_background": "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19906,
                        "image_background": "https://media.rawg.io/media/games/4e0/4e0e7b6d6906a131307c94266e5c9a1c.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24049,
                        "image_background": "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg"
                    },
                    {
                        "id": 42442,
                        "name": "Открытый мир",
                        "slug": "otkrytyi-mir",
                        "language": "rus",
                        "games_count": 6486,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 36,
                        "name": "Open World",
                        "slug": "open-world",
                        "language": "eng",
                        "games_count": 8300,
                        "image_background": "https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg"
                    },
                    {
                        "id": 42429,
                        "name": "От первого лица",
                        "slug": "ot-pervogo-litsa",
                        "language": "rus",
                        "games_count": 13183,
                        "image_background": "https://media.rawg.io/media/games/be0/be01c3d7d8795a45615da139322ca080.jpg"
                    },
                    {
                        "id": 8,
                        "name": "First-Person",
                        "slug": "first-person",
                        "language": "eng",
                        "games_count": 34104,
                        "image_background": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8418,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12893,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13830,
                        "image_background": "https://media.rawg.io/media/games/d2c/d2c74dacd89fd817c2deb625b01adb1a.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30076,
                        "image_background": "https://media.rawg.io/media/games/af7/af7a831001c5c32c46e950cc883b8cb7.jpg"
                    },
                    {
                        "id": 42402,
                        "name": "Насилие",
                        "slug": "nasilie",
                        "language": "rus",
                        "games_count": 6109,
                        "image_background": "https://media.rawg.io/media/games/3ea/3ea3c9bbd940b6cb7f2139e42d3d443f.jpg"
                    },
                    {
                        "id": 34,
                        "name": "Violent",
                        "slug": "violent",
                        "language": "eng",
                        "games_count": 7147,
                        "image_background": "https://media.rawg.io/media/games/0af/0af85e8edddfa55368e47c539914a220.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7768,
                        "image_background": "https://media.rawg.io/media/games/8d4/8d46786ca86b1d95f3dc7e700e2dc4dd.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4759,
                        "image_background": "https://media.rawg.io/media/games/f99/f9979698c43fd84c3ab69280576dd3af.jpg"
                    },
                    {
                        "id": 11669,
                        "name": "stats",
                        "slug": "stats",
                        "language": "eng",
                        "games_count": 5331,
                        "image_background": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg"
                    },
                    {
                        "id": 42530,
                        "name": "Кастомизация персонажа",
                        "slug": "kastomizatsiia-personazha",
                        "language": "rus",
                        "games_count": 4786,
                        "image_background": "https://media.rawg.io/media/games/9bf/9bfac18ff678f41a4674250fa0e04a52.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6877,
                        "image_background": "https://media.rawg.io/media/games/07a/07a74470a2618fd71945db0619602baf.jpg"
                    },
                    {
                        "id": 121,
                        "name": "Character Customization",
                        "slug": "character-customization",
                        "language": "eng",
                        "games_count": 5558,
                        "image_background": "https://media.rawg.io/media/games/8fc/8fc59e74133fd8a8a436b7e2d0fb36c2.jpg"
                    },
                    {
                        "id": 42601,
                        "name": "Цветастая",
                        "slug": "tsvetastaia",
                        "language": "rus",
                        "games_count": 16483,
                        "image_background": "https://media.rawg.io/media/games/0be/0bea0a08a4d954337305391b778a7f37.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6665,
                        "image_background": "https://media.rawg.io/media/games/2e1/2e187b31e5cee21c110bd16798d75fab.jpg"
                    },
                    {
                        "id": 42529,
                        "name": "Для взрослых",
                        "slug": "dlia-vzroslykh",
                        "language": "rus",
                        "games_count": 3651,
                        "image_background": "https://media.rawg.io/media/games/2a2/2a2f9a0035544500e59a171c7038ec3a.jpg"
                    },
                    {
                        "id": 165,
                        "name": "Colorful",
                        "slug": "colorful",
                        "language": "eng",
                        "games_count": 25040,
                        "image_background": "https://media.rawg.io/media/screenshots/46a/46ac84997152eaf4f760257a60099231.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87927,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 192,
                        "name": "Mature",
                        "slug": "mature",
                        "language": "eng",
                        "games_count": 3844,
                        "image_background": "https://media.rawg.io/media/games/aa3/aa36ba4b486a03ddfaef274fb4f5afd4.jpg"
                    },
                    {
                        "id": 1465,
                        "name": "combat",
                        "slug": "combat",
                        "language": "eng",
                        "games_count": 13979,
                        "image_background": "https://media.rawg.io/media/games/048/048b46cdc66cbc7e235e1f359c2a77ec.jpg"
                    },
                    {
                        "id": 82,
                        "name": "Magic",
                        "slug": "magic",
                        "language": "eng",
                        "games_count": 10281,
                        "image_background": "https://media.rawg.io/media/games/330/330952c1726bbb56fc3b9f8a8c83ab1d.jpg"
                    },
                    {
                        "id": 42478,
                        "name": "Магия",
                        "slug": "magiia",
                        "language": "rus",
                        "games_count": 4916,
                        "image_background": "https://media.rawg.io/media/games/f6b/f6bed028b02369d4cab548f4f9337e81.jpg"
                    },
                    {
                        "id": 40937,
                        "name": "Steam Trading Cards",
                        "slug": "steam-trading-cards-2",
                        "language": "eng",
                        "games_count": 723,
                        "image_background": "https://media.rawg.io/media/games/cfe/cfe114c081281960bd79ace5209c0a4a.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11719,
                        "image_background": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg"
                    },
                    {
                        "id": 58127,
                        "name": "Бой",
                        "slug": "boi-2",
                        "language": "rus",
                        "games_count": 8829,
                        "image_background": "https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2225,
                        "image_background": "https://media.rawg.io/media/games/246/246367eab7ccfaaad14ad4507deee067.jpeg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/d1c/d1cd8a226cb224357c1f59605577cbf2.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1877,
                        "image_background": "https://media.rawg.io/media/screenshots/fdb/fdbe2b3f4b670900c342c86f07427b8d.jpg"
                    }
                ],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 15,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/3d3/3d33abf32d9fb92b9f242917abe276ba.jpg"
                    },
                    {
                        "id": 3995022,
                        "image": "https://media.rawg.io/media/screenshots/ac3/ac3579b4cbc333f2b18ee552027093bb.jpg"
                    },
                    {
                        "id": 3995023,
                        "image": "https://media.rawg.io/media/screenshots/100/1006c41b4aba7ab83b5cb5bdbb37ca2c.jpg"
                    },
                    {
                        "id": 3995024,
                        "image": "https://media.rawg.io/media/screenshots/287/2877abf64cdbfe978aab512d45031729.jpg"
                    },
                    {
                        "id": 3995025,
                        "image": "https://media.rawg.io/media/screenshots/c37/c37345ff1a95b341137fcafd0ad7179f.jpg"
                    },
                    {
                        "id": 3995026,
                        "image": "https://media.rawg.io/media/screenshots/675/67578060d4231329e6ec9574e528fae8.jpg"
                    },
                    {
                        "id": 3995027,
                        "image": "https://media.rawg.io/media/screenshots/4a1/4a1f99895c69ff14d756c9ee44514552.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "like-a-dragon-pirate-yakuza-in-hawaii",
                "name": "Like a Dragon: Pirate Yakuza in Hawaii",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 187,
                            "name": "PlayStation 5",
                            "slug": "playstation5"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-21",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/23e/23e3803318123533db02a2fceb3d3e54.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 57,
                "added_by_status": {
                    "yet": 12,
                    "owned": 6,
                    "toplay": 37,
                    "dropped": 2
                },
                "metacritic": null,
                "suggestions_count": 248,
                "updated": "2025-02-21T11:00:09",
                "id": 989189,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44633,
                        "image_background": "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42888,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 21009,
                        "image_background": "https://media.rawg.io/media/games/951/951572a3dd1e42544bd39a5d5b42d234.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23530,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19935,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8435,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12910,
                        "image_background": "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg"
                    },
                    {
                        "id": 42482,
                        "name": "Смешная",
                        "slug": "smeshnaia",
                        "language": "rus",
                        "games_count": 10588,
                        "image_background": "https://media.rawg.io/media/games/ec3/ec3a7db7b8ab5a71aad622fe7c62632f.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13851,
                        "image_background": "https://media.rawg.io/media/games/63f/63f0e68688cad279ed38cde931dbfcdb.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30097,
                        "image_background": "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg"
                    },
                    {
                        "id": 4,
                        "name": "Funny",
                        "slug": "funny",
                        "language": "eng",
                        "games_count": 26577,
                        "image_background": "https://media.rawg.io/media/games/25c/25c4776ab5723d5d735d8bf617ca12d9.jpg"
                    },
                    {
                        "id": 6,
                        "name": "Exploration",
                        "slug": "exploration",
                        "language": "eng",
                        "games_count": 25751,
                        "image_background": "https://media.rawg.io/media/games/a3c/a3c529a12c896c0ef02db5b4741de2ba.jpg"
                    },
                    {
                        "id": 69,
                        "name": "Action-Adventure",
                        "slug": "action-adventure",
                        "language": "eng",
                        "games_count": 18545,
                        "image_background": "https://media.rawg.io/media/games/569/56978b5a77f13aa2ec5d09ec81d01cad.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7775,
                        "image_background": "https://media.rawg.io/media/games/a6c/a6ccd34125c594abf1a9c9821b9a715d.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4766,
                        "image_background": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg"
                    },
                    {
                        "id": 42487,
                        "name": "Слэшер",
                        "slug": "slesher",
                        "language": "rus",
                        "games_count": 3222,
                        "image_background": "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg"
                    },
                    {
                        "id": 68,
                        "name": "Hack and Slash",
                        "slug": "hack-and-slash",
                        "language": "eng",
                        "games_count": 4711,
                        "image_background": "https://media.rawg.io/media/games/736/736c0eaec96d848d7824b33298a182f2.jpg"
                    },
                    {
                        "id": 42530,
                        "name": "Кастомизация персонажа",
                        "slug": "kastomizatsiia-personazha",
                        "language": "rus",
                        "games_count": 4798,
                        "image_background": "https://media.rawg.io/media/games/eb5/eb514db62d397c64288160d5bd8fd67a.jpg"
                    },
                    {
                        "id": 42490,
                        "name": "Приключенческий экшен",
                        "slug": "prikliuchencheskii-ekshen",
                        "language": "rus",
                        "games_count": 10938,
                        "image_background": "https://media.rawg.io/media/games/c50/c5085506fe4b5e20fc7aa5ace842c20b.jpg"
                    },
                    {
                        "id": 121,
                        "name": "Character Customization",
                        "slug": "character-customization",
                        "language": "eng",
                        "games_count": 5570,
                        "image_background": "https://media.rawg.io/media/games/214/214b29aeff13a0ae6a70fc4426e85991.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87977,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 110,
                        "name": "Cinematic",
                        "slug": "cinematic",
                        "language": "eng",
                        "games_count": 2712,
                        "image_background": "https://media.rawg.io/media/games/be0/be084b850302abe81675bc4ffc08a0d0.jpg"
                    },
                    {
                        "id": 42623,
                        "name": "Кинематографичная",
                        "slug": "kinematografichnaia",
                        "language": "rus",
                        "games_count": 2619,
                        "image_background": "https://media.rawg.io/media/games/471/4712c9ac591f556f553556b864a7e92b.jpg"
                    },
                    {
                        "id": 233,
                        "name": "JRPG",
                        "slug": "jrpg",
                        "language": "eng",
                        "games_count": 4707,
                        "image_background": "https://media.rawg.io/media/games/a14/a14acef284eaa4854f83c99e80fc15d8.jpg"
                    },
                    {
                        "id": 42514,
                        "name": "Японская ролевая игра",
                        "slug": "iaponskaia-rolevaia-igra",
                        "language": "rus",
                        "games_count": 3048,
                        "image_background": "https://media.rawg.io/media/screenshots/73e/73e4d78a55248fc26a4e06726b6bd969.jpg"
                    },
                    {
                        "id": 209,
                        "name": "Drama",
                        "slug": "drama",
                        "language": "eng",
                        "games_count": 4904,
                        "image_background": "https://media.rawg.io/media/games/2ad/2ad87a4a69b1104f02435c14c5196095.jpg"
                    },
                    {
                        "id": 66533,
                        "name": "Исследования",
                        "slug": "issledovaniia",
                        "language": "rus",
                        "games_count": 11072,
                        "image_background": "https://media.rawg.io/media/games/102/102b3f5639c57ca39e96ea1cb554f9e2.jpg"
                    },
                    {
                        "id": 42650,
                        "name": "Драма",
                        "slug": "drama-2",
                        "language": "rus",
                        "games_count": 4293,
                        "image_background": "https://media.rawg.io/media/games/efd/efd6b2cb621c41a2b6580d8ac260b8ba.jpg"
                    },
                    {
                        "id": 42507,
                        "name": "Сражения на мечах",
                        "slug": "srazheniia-na-mechakh",
                        "language": "rus",
                        "games_count": 858,
                        "image_background": "https://media.rawg.io/media/games/0b2/0b240149610b8b20eac098b8071f575a.jpg"
                    },
                    {
                        "id": 185,
                        "name": "Swordplay",
                        "slug": "swordplay",
                        "language": "eng",
                        "games_count": 829,
                        "image_background": "https://media.rawg.io/media/games/3e4/3e43e29ae126ef951842393f5ff7f33a.jpg"
                    },
                    {
                        "id": 255,
                        "name": "Pirates",
                        "slug": "pirates",
                        "language": "eng",
                        "games_count": 2245,
                        "image_background": "https://media.rawg.io/media/screenshots/520/520ed5686073be29438e995febc4426d.jpg"
                    },
                    {
                        "id": 42499,
                        "name": "Пираты",
                        "slug": "piraty",
                        "language": "rus",
                        "games_count": 549,
                        "image_background": "https://media.rawg.io/media/screenshots/b4b/b4bc9b2b8be2fb16d20d7d437f86cd72.jpg"
                    },
                    {
                        "id": 256,
                        "name": "Naval",
                        "slug": "naval",
                        "language": "eng",
                        "games_count": 367,
                        "image_background": "https://media.rawg.io/media/screenshots/1fe/1fe5974a7744c646365f315a71b3d9f7.jpg"
                    },
                    {
                        "id": 500,
                        "name": "Solo",
                        "slug": "solo",
                        "language": "eng",
                        "games_count": 1636,
                        "image_background": "https://media.rawg.io/media/screenshots/9bf/9bf17af55dba0e49bb9259f62dafd6bc.jpg"
                    },
                    {
                        "id": 257,
                        "name": "Sailing",
                        "slug": "sailing",
                        "language": "eng",
                        "games_count": 482,
                        "image_background": "https://media.rawg.io/media/screenshots/674/6740ddd051de766ebd3e34d1cb5e1a65.jpg"
                    },
                    {
                        "id": 42543,
                        "name": "Мореплавание",
                        "slug": "moreplavanie",
                        "language": "rus",
                        "games_count": 274,
                        "image_background": "https://media.rawg.io/media/screenshots/fae/faec035e655b2f9edcab638114118066.jpeg"
                    },
                    {
                        "id": 40910,
                        "name": "Succès Steam",
                        "slug": "succes-steam",
                        "language": "eng",
                        "games_count": 5,
                        "image_background": "https://media.rawg.io/media/games/3a9/3a9ea2db24f879e61fe7b824f5888d2a.jpg"
                    },
                    {
                        "id": 73243,
                        "name": "Флот",
                        "slug": "flot",
                        "language": "eng",
                        "games_count": 180,
                        "image_background": "https://media.rawg.io/media/screenshots/82d/82dfe2776a454b05894c154713f6cd2d.jpg"
                    },
                    {
                        "id": 49971,
                        "name": "Naval Combat",
                        "slug": "naval-combat-2",
                        "language": "eng",
                        "games_count": 207,
                        "image_background": "https://media.rawg.io/media/screenshots/a6b/a6bff427df597727a9192928a4152af6.jpg"
                    },
                    {
                        "id": 60140,
                        "name": "Морской бой",
                        "slug": "morskoi-boi",
                        "language": "rus",
                        "games_count": 193,
                        "image_background": "https://media.rawg.io/media/screenshots/abd/abdb064c53a55096ce6a970f7f4a1802.jpg"
                    },
                    {
                        "id": 90369,
                        "name": "Compat. contrôleurs complète",
                        "slug": "compat-controleurs-complete",
                        "language": "eng",
                        "games_count": 2,
                        "image_background": "https://media.rawg.io/media/screenshots/6b2/6b2713c99b12df4394a695a06306537e.jpg"
                    },
                    {
                        "id": 40911,
                        "name": "Cartes à échanger Steam",
                        "slug": "cartes-a-echanger-steam",
                        "language": "eng",
                        "games_count": 2,
                        "image_background": "https://media.rawg.io/media/screenshots/ca7/ca7b282870202c389f037ecf1ace1b86.jpg"
                    },
                    {
                        "id": 92074,
                        "name": "Partage familial",
                        "slug": "partage-familial",
                        "language": "eng",
                        "games_count": 1,
                        "image_background": "https://media.rawg.io/media/screenshots/6b2/6b2713c99b12df4394a695a06306537e.jpg"
                    }
                ],
                "esrb_rating": {
                    "id": 5,
                    "name": "Adults Only",
                    "slug": "adults-only",
                    "name_en": "Adults Only",
                    "name_ru": "Только для взрослых"
                },
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/23e/23e3803318123533db02a2fceb3d3e54.jpg"
                    },
                    {
                        "id": 4164204,
                        "image": "https://media.rawg.io/media/screenshots/093/093e5d47c1f044b969bb805553232419.jpg"
                    },
                    {
                        "id": 4164205,
                        "image": "https://media.rawg.io/media/screenshots/ffd/ffdab629259a2fc7e584c5b2a82c6bf5.jpg"
                    },
                    {
                        "id": 4164206,
                        "image": "https://media.rawg.io/media/screenshots/7c2/7c206a717bacd549861f66099787073e.jpg"
                    },
                    {
                        "id": 4164207,
                        "image": "https://media.rawg.io/media/screenshots/b7b/b7b510a8492eaf889f2ac1ac906e983f.jpg"
                    },
                    {
                        "id": 4164208,
                        "image": "https://media.rawg.io/media/screenshots/cc4/cc477296c984e53d06e96cbcd37e6db2.jpg"
                    },
                    {
                        "id": 4164209,
                        "image": "https://media.rawg.io/media/screenshots/8ee/8ee585b3fe4a431f1db3993b0ab7a19f.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 2,
                            "name": "PlayStation",
                            "slug": "playstation"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "lost-records-bloom-rage",
                "name": "Lost Records: Bloom & Rage",
                "playtime": 1,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 187,
                            "name": "PlayStation 5",
                            "slug": "playstation5"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 50,
                "added_by_status": {
                    "yet": 5,
                    "owned": 4,
                    "beaten": 1,
                    "toplay": 36,
                    "playing": 4
                },
                "metacritic": null,
                "suggestions_count": 40,
                "updated": "2025-02-21T08:06:47",
                "id": 973376,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235424,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42830,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43562,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20578,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20972,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 36021,
                        "image_background": "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14913,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24049,
                        "image_background": "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8418,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12893,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 189,
                        "name": "Female Protagonist",
                        "slug": "female-protagonist",
                        "language": "eng",
                        "games_count": 13777,
                        "image_background": "https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6877,
                        "image_background": "https://media.rawg.io/media/games/07a/07a74470a2618fd71945db0619602baf.jpg"
                    },
                    {
                        "id": 42556,
                        "name": "Тайна",
                        "slug": "taina",
                        "language": "rus",
                        "games_count": 6655,
                        "image_background": "https://media.rawg.io/media/games/baf/baf9905270314e07e6850cffdb51df41.jpg"
                    },
                    {
                        "id": 117,
                        "name": "Mystery",
                        "slug": "mystery",
                        "language": "eng",
                        "games_count": 14778,
                        "image_background": "https://media.rawg.io/media/games/948/948fe7f00b6cba8472f5ecd07a455077.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6665,
                        "image_background": "https://media.rawg.io/media/games/2e1/2e187b31e5cee21c110bd16798d75fab.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87927,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 110,
                        "name": "Cinematic",
                        "slug": "cinematic",
                        "language": "eng",
                        "games_count": 2705,
                        "image_background": "https://media.rawg.io/media/games/a28/a289e23b4d4d84f26ab59125e3be4483.jpg"
                    },
                    {
                        "id": 218,
                        "name": "Multiple Endings",
                        "slug": "multiple-endings",
                        "language": "eng",
                        "games_count": 9969,
                        "image_background": "https://media.rawg.io/media/games/dc0/dc0926d3f84ffbcc00968fe8a6f0aed3.jpg"
                    },
                    {
                        "id": 42484,
                        "name": "90-е",
                        "slug": "90-e",
                        "language": "rus",
                        "games_count": 3315,
                        "image_background": "https://media.rawg.io/media/games/2a5/2a5072e5b28e1653a10e4f931f1991af.jpg"
                    },
                    {
                        "id": 42623,
                        "name": "Кинематографичная",
                        "slug": "kinematografichnaia",
                        "language": "rus",
                        "games_count": 2612,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 42606,
                        "name": "Стилизация",
                        "slug": "stilizatsiia",
                        "language": "rus",
                        "games_count": 8001,
                        "image_background": "https://media.rawg.io/media/screenshots/4a0/4a067c93dd1f331ac7a2e77bb3fc46e0.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11719,
                        "image_background": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg"
                    },
                    {
                        "id": 42672,
                        "name": "Сюрреалистичная",
                        "slug": "siurrealistichnaia",
                        "language": "rus",
                        "games_count": 2989,
                        "image_background": "https://media.rawg.io/media/screenshots/76f/76ff4289a2a3ad7659cae129b859d67e.jpg"
                    },
                    {
                        "id": 46,
                        "name": "Surreal",
                        "slug": "surreal",
                        "language": "eng",
                        "games_count": 5888,
                        "image_background": "https://media.rawg.io/media/screenshots/b0a/b0a14be9cf5547d82f079a5e988d0733.jpg"
                    },
                    {
                        "id": 243,
                        "name": "1990's",
                        "slug": "1990s",
                        "language": "eng",
                        "games_count": 3220,
                        "image_background": "https://media.rawg.io/media/games/9e5/9e5b91a6d02e66b8d450a977a59ae123.jpg"
                    },
                    {
                        "id": 166,
                        "name": "Stylized",
                        "slug": "stylized",
                        "language": "eng",
                        "games_count": 8019,
                        "image_background": "https://media.rawg.io/media/screenshots/e49/e497cca0e21625b8e36614399f0b970e.jpg"
                    },
                    {
                        "id": 217,
                        "name": "Romance",
                        "slug": "romance",
                        "language": "eng",
                        "games_count": 8773,
                        "image_background": "https://media.rawg.io/media/games/fae/faebf3c8cbf30db3f46bfbecf6ada3d6.jpg"
                    },
                    {
                        "id": 288,
                        "name": "Interactive Fiction",
                        "slug": "interactive-fiction",
                        "language": "eng",
                        "games_count": 3928,
                        "image_background": "https://media.rawg.io/media/games/177/1775aacedb915b0e0880476530dc87b4.jpg"
                    },
                    {
                        "id": 42655,
                        "name": "Психологическая",
                        "slug": "psikhologicheskaia",
                        "language": "rus",
                        "games_count": 2024,
                        "image_background": "https://media.rawg.io/media/screenshots/8f0/8f0b94922ad5e59968852649697b2643.jpg"
                    },
                    {
                        "id": 59643,
                        "name": "Протагонистка",
                        "slug": "protagonistka",
                        "language": "eng",
                        "games_count": 6260,
                        "image_background": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg"
                    },
                    {
                        "id": 285,
                        "name": "Psychological",
                        "slug": "psychological",
                        "language": "eng",
                        "games_count": 2124,
                        "image_background": "https://media.rawg.io/media/screenshots/f77/f77b685304e3c05087aed1d18a7b667f.jpg"
                    },
                    {
                        "id": 774,
                        "name": "nature",
                        "slug": "nature",
                        "language": "eng",
                        "games_count": 6493,
                        "image_background": "https://media.rawg.io/media/screenshots/b02/b02c8f7cc53dfa98a35552916c02fe6e.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2225,
                        "image_background": "https://media.rawg.io/media/games/246/246367eab7ccfaaad14ad4507deee067.jpeg"
                    },
                    {
                        "id": 64060,
                        "name": "Несколько концовок",
                        "slug": "neskolko-kontsovok",
                        "language": "rus",
                        "games_count": 5116,
                        "image_background": "https://media.rawg.io/media/games/9ac/9acdbcf11b7aa2c9d629ee38f8fa8c71.jpg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/d1c/d1cd8a226cb224357c1f59605577cbf2.jpg"
                    },
                    {
                        "id": 309,
                        "name": "Dynamic Narration",
                        "slug": "dynamic-narration",
                        "language": "eng",
                        "games_count": 531,
                        "image_background": "https://media.rawg.io/media/screenshots/425/4258ed0ffc18009a4eb7a42bbf03c6c7.jpg"
                    },
                    {
                        "id": 66535,
                        "name": "Интерактивная литература",
                        "slug": "interaktivnaia-literatura",
                        "language": "rus",
                        "games_count": 3227,
                        "image_background": "https://media.rawg.io/media/screenshots/fcc/fccf1a1d0c1615d4132bc779b4de7bb6.jpg"
                    },
                    {
                        "id": 42646,
                        "name": "Беседы",
                        "slug": "besedy",
                        "language": "rus",
                        "games_count": 2144,
                        "image_background": "https://media.rawg.io/media/games/ceb/ceb68aef14fbe54f0610acd8de480f64.jpg"
                    },
                    {
                        "id": 342,
                        "name": "Conversation",
                        "slug": "conversation",
                        "language": "eng",
                        "games_count": 2484,
                        "image_background": "https://media.rawg.io/media/games/74a/74a324529a14915adfc887d257f16f86.jpg"
                    },
                    {
                        "id": 58124,
                        "name": "Природа",
                        "slug": "priroda",
                        "language": "rus",
                        "games_count": 3113,
                        "image_background": "https://media.rawg.io/media/screenshots/691/6912cbe2a9e0aaab616688b554792e20.jpg"
                    },
                    {
                        "id": 66536,
                        "name": "Романтика",
                        "slug": "romantika",
                        "language": "eng",
                        "games_count": 3435,
                        "image_background": "https://media.rawg.io/media/games/154/1540d92a4768230fe46bfd05954b8ab4.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1877,
                        "image_background": "https://media.rawg.io/media/screenshots/fdb/fdbe2b3f4b670900c342c86f07427b8d.jpg"
                    },
                    {
                        "id": 74998,
                        "name": "Динамическое повествование",
                        "slug": "dinamicheskoe-povestvovanie",
                        "language": "rus",
                        "games_count": 385,
                        "image_background": "https://media.rawg.io/media/screenshots/61a/61a8c414a377202e89d2081ee58aaa50.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg"
                    },
                    {
                        "id": 3981477,
                        "image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 2,
                            "name": "PlayStation",
                            "slug": "playstation"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 51,
                        "name": "Indie",
                        "slug": "indie"
                    },
                    {
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    }
                ]
            },
            {
                "slug": "tribe-nine",
                "name": "TRIBE NINE",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/95c/95c29e8b5574c46b8ea83d3b9ac5a552.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [],
                "ratings_count": 0,
                "reviews_text_count": 0,
                "added": 5,
                "added_by_status": {
                    "owned": 5
                },
                "metacritic": null,
                "suggestions_count": 28,
                "updated": "2025-02-21T08:57:37",
                "id": 998008,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235469,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58277,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44598,
                        "image_background": "https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20589,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14922,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23510,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19915,
                        "image_background": "https://media.rawg.io/media/games/849/849414b978db37d4563ff9e4b0d3a787.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24058,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 45,
                        "name": "2D",
                        "slug": "2d",
                        "language": "eng",
                        "games_count": 200746,
                        "image_background": "https://media.rawg.io/media/games/226/2262cea0b385db6cf399f4be831603b0.jpg"
                    },
                    {
                        "id": 42420,
                        "name": "Сложная",
                        "slug": "slozhnaia",
                        "language": "rus",
                        "games_count": 5739,
                        "image_background": "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13837,
                        "image_background": "https://media.rawg.io/media/screenshots/c97/c97b943741f5fbc936fe054d9d58851d.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30083,
                        "image_background": "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg"
                    },
                    {
                        "id": 49,
                        "name": "Difficult",
                        "slug": "difficult",
                        "language": "eng",
                        "games_count": 13711,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 79,
                        "name": "Free to Play",
                        "slug": "free-to-play",
                        "language": "eng",
                        "games_count": 8194,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42538,
                        "name": "Бесплатная игра",
                        "slug": "besplatnaia-igra",
                        "language": "rus",
                        "games_count": 8181,
                        "image_background": "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
                    },
                    {
                        "id": 42415,
                        "name": "Пиксельная графика",
                        "slug": "pikselnaia-grafika",
                        "language": "rus",
                        "games_count": 14903,
                        "image_background": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg"
                    },
                    {
                        "id": 122,
                        "name": "Pixel Graphics",
                        "slug": "pixel-graphics",
                        "language": "eng",
                        "games_count": 95987,
                        "image_background": "https://media.rawg.io/media/games/926/926928beb8a9f9b31cf202965aa4cbbc.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7772,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4763,
                        "image_background": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg"
                    },
                    {
                        "id": 42477,
                        "name": "Мрачная",
                        "slug": "mrachnaia",
                        "language": "rus",
                        "games_count": 6523,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 41,
                        "name": "Dark",
                        "slug": "dark",
                        "language": "eng",
                        "games_count": 17052,
                        "image_background": "https://media.rawg.io/media/games/b54/b54598d1d5cc31899f4f0a7e3122a7b0.jpg"
                    },
                    {
                        "id": 42407,
                        "name": "Аниме",
                        "slug": "anime-2",
                        "language": "rus",
                        "games_count": 10849,
                        "image_background": "https://media.rawg.io/media/games/416/4164ca654a339af5be8e63cc9c480c70.jpg"
                    },
                    {
                        "id": 134,
                        "name": "Anime",
                        "slug": "anime",
                        "language": "eng",
                        "games_count": 14960,
                        "image_background": "https://media.rawg.io/media/screenshots/12e/12ee2600684863837596c0dbb1923fca.jpg"
                    },
                    {
                        "id": 40837,
                        "name": "In-App Purchases",
                        "slug": "in-app-purchases",
                        "language": "eng",
                        "games_count": 3001,
                        "image_background": "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87946,
                        "image_background": "https://media.rawg.io/media/games/9a1/9a18c226cf379272c698f26d2b79b3da.jpg"
                    },
                    {
                        "id": 42470,
                        "name": "Киберпанк",
                        "slug": "kiberpank",
                        "language": "rus",
                        "games_count": 2150,
                        "image_background": "https://media.rawg.io/media/screenshots/7f8/7f8b58994fc420fefaa5fb9992335a11.jpg"
                    },
                    {
                        "id": 226,
                        "name": "Cyberpunk",
                        "slug": "cyberpunk",
                        "language": "eng",
                        "games_count": 4868,
                        "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
                    },
                    {
                        "id": 233,
                        "name": "JRPG",
                        "slug": "jrpg",
                        "language": "eng",
                        "games_count": 4703,
                        "image_background": "https://media.rawg.io/media/screenshots/515/515e8cda2f9e3ea1ca2785e99c1a1893.jpg"
                    },
                    {
                        "id": 42502,
                        "name": "Чёрный юмор",
                        "slug": "chiornyi-iumor",
                        "language": "rus",
                        "games_count": 2016,
                        "image_background": "https://media.rawg.io/media/games/ab8/ab8217a1fe2ced388a388722734e6d16.jpg"
                    },
                    {
                        "id": 42514,
                        "name": "Японская ролевая игра",
                        "slug": "iaponskaia-rolevaia-igra",
                        "language": "rus",
                        "games_count": 3044,
                        "image_background": "https://media.rawg.io/media/games/158/15880530ce424311f264671e4b0611ee.jpg"
                    },
                    {
                        "id": 148,
                        "name": "Dark Humor",
                        "slug": "dark-humor",
                        "language": "eng",
                        "games_count": 3305,
                        "image_background": "https://media.rawg.io/media/games/907/90757eaa9dc7c5cf7c47bf4960843999.jpg"
                    },
                    {
                        "id": 171,
                        "name": "PvE",
                        "slug": "pve",
                        "language": "eng",
                        "games_count": 6258,
                        "image_background": "https://media.rawg.io/media/screenshots/06f/06fa9a33188522273623ef314ec4fc3b.jpg"
                    },
                    {
                        "id": 42592,
                        "name": "Похожа на Dark Souls",
                        "slug": "pokhozha-na-dark-souls",
                        "language": "rus",
                        "games_count": 1185,
                        "image_background": "https://media.rawg.io/media/games/16a/16a81cc458b0acb6ed2bcfd2a10f1527.jpg"
                    },
                    {
                        "id": 580,
                        "name": "Souls-like",
                        "slug": "souls-like",
                        "language": "eng",
                        "games_count": 1588,
                        "image_background": "https://media.rawg.io/media/games/16a/16a81cc458b0acb6ed2bcfd2a10f1527.jpg"
                    },
                    {
                        "id": 87088,
                        "name": "Игрок против ИИ",
                        "slug": "igrok-protiv-ii",
                        "language": "rus",
                        "games_count": 3741,
                        "image_background": "https://media.rawg.io/media/screenshots/57c/57c95db99124157a85962eb879733185.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 0,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/95c/95c29e8b5574c46b8ea83d3b9ac5a552.jpg"
                    },
                    {
                        "id": 4163403,
                        "image": "https://media.rawg.io/media/screenshots/1c3/1c30a43b66e8734aa79710efb5d10496.jpg"
                    },
                    {
                        "id": 4163404,
                        "image": "https://media.rawg.io/media/screenshots/ac1/ac19e9700dd7b53ee0aea1738e97fca2.jpg"
                    },
                    {
                        "id": 4163405,
                        "image": "https://media.rawg.io/media/screenshots/0a2/0a2f80ca2c67200516fcc2d4e8045b19.jpg"
                    },
                    {
                        "id": 4163406,
                        "image": "https://media.rawg.io/media/screenshots/c20/c20e231fbdeaa958e4daad9fbee526a4.jpg"
                    },
                    {
                        "id": 4163407,
                        "image": "https://media.rawg.io/media/screenshots/459/4590c69878491b0965f157cef46a6992.jpg"
                    },
                    {
                        "id": 4163408,
                        "image": "https://media.rawg.io/media/screenshots/258/2581ba83242868c48b98c52ce481ec2f.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "yin-yang-shi-hui-juan",
                "name": "陰陽師絵巻",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-20",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [],
                "ratings_count": 0,
                "reviews_text_count": 0,
                "added": 3,
                "added_by_status": {
                    "owned": 3
                },
                "metacritic": null,
                "suggestions_count": 119,
                "updated": "2025-02-21T10:57:26",
                "id": 998097,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235565,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58353,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44633,
                        "image_background": "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                    },
                    {
                        "id": 42398,
                        "name": "Инди",
                        "slug": "indi-2",
                        "language": "rus",
                        "games_count": 60771,
                        "image_background": "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23530,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19935,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42399,
                        "name": "Казуальная игра",
                        "slug": "kazualnaia-igra",
                        "language": "rus",
                        "games_count": 46964,
                        "image_background": "https://media.rawg.io/media/games/25c/25c4776ab5723d5d735d8bf617ca12d9.jpg"
                    },
                    {
                        "id": 79,
                        "name": "Free to Play",
                        "slug": "free-to-play",
                        "language": "eng",
                        "games_count": 8203,
                        "image_background": "https://media.rawg.io/media/games/742/7424c1f7d0a8da9ae29cd866f985698b.jpg"
                    },
                    {
                        "id": 42538,
                        "name": "Бесплатная игра",
                        "slug": "besplatnaia-igra",
                        "language": "rus",
                        "games_count": 8190,
                        "image_background": "https://media.rawg.io/media/games/11f/11fd681c312c14644ab360888dba3486.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7775,
                        "image_background": "https://media.rawg.io/media/games/a6c/a6ccd34125c594abf1a9c9821b9a715d.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4766,
                        "image_background": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 0,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg"
                    },
                    {
                        "id": 4164186,
                        "image": "https://media.rawg.io/media/screenshots/224/2241cbb1e8c169180b49c638910f6583.jpg"
                    },
                    {
                        "id": 4164187,
                        "image": "https://media.rawg.io/media/screenshots/b65/b654c7cc4d230642b786d881a0642784.jpg"
                    },
                    {
                        "id": 4164188,
                        "image": "https://media.rawg.io/media/screenshots/ea3/ea3c9e93b4059bd4bf555faa4217ff01.jpg"
                    },
                    {
                        "id": 4164189,
                        "image": "https://media.rawg.io/media/screenshots/a1c/a1c1435f0b1f7b89c30d37903b47cfe8.jpg"
                    },
                    {
                        "id": 4164190,
                        "image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 40,
                        "name": "Casual",
                        "slug": "casual"
                    },
                    {
                        "id": 51,
                        "name": "Indie",
                        "slug": "indie"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            }
        ],
        "user_platforms": false
    };

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
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
    
    const firstDateOfWeek = firstDayOfWeek.toISOString().split("T")[0];
    const lastDateOfWeek = lastDayOfWeek.toISOString().split("T")[0];
    

    //  const results = await fetch(`https://api.rawg.io/api/games?dates=${firstDateOfWeek},${firstDateOfWeek}&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    //  const data = await results.json();

   const data = {
        "count": 224,
        "next": "https://api.rawg.io/api/games?dates=2025-02-17%2C2025-02-23&=-added&page=2&page_size=5",
        "previous": null,
        "results": [
            {
                "slug": "avowed",
                "name": "Avowed",
                "playtime": 4,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/3d3/3d33abf32d9fb92b9f242917abe276ba.jpg",
                "rating": 3.07,
                "rating_top": 1,
                "ratings": [
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 5,
                        "percent": 33.33
                    },
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 4,
                        "percent": 26.67
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 3,
                        "percent": 20.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 3,
                        "percent": 20.0
                    }
                ],
                "ratings_count": 14,
                "reviews_text_count": 0,
                "added": 325,
                "added_by_status": {
                    "yet": 49,
                    "owned": 41,
                    "beaten": 2,
                    "toplay": 213,
                    "dropped": 7,
                    "playing": 13
                },
                "metacritic": null,
                "suggestions_count": 205,
                "updated": "2025-02-21T08:35:44",
                "id": 471025,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235424,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58241,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44585,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42830,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43562,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20578,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20972,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 36021,
                        "image_background": "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14913,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23501,
                        "image_background": "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19906,
                        "image_background": "https://media.rawg.io/media/games/4e0/4e0e7b6d6906a131307c94266e5c9a1c.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24049,
                        "image_background": "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg"
                    },
                    {
                        "id": 42442,
                        "name": "Открытый мир",
                        "slug": "otkrytyi-mir",
                        "language": "rus",
                        "games_count": 6486,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 36,
                        "name": "Open World",
                        "slug": "open-world",
                        "language": "eng",
                        "games_count": 8300,
                        "image_background": "https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg"
                    },
                    {
                        "id": 42429,
                        "name": "От первого лица",
                        "slug": "ot-pervogo-litsa",
                        "language": "rus",
                        "games_count": 13183,
                        "image_background": "https://media.rawg.io/media/games/be0/be01c3d7d8795a45615da139322ca080.jpg"
                    },
                    {
                        "id": 8,
                        "name": "First-Person",
                        "slug": "first-person",
                        "language": "eng",
                        "games_count": 34104,
                        "image_background": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8418,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12893,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13830,
                        "image_background": "https://media.rawg.io/media/games/d2c/d2c74dacd89fd817c2deb625b01adb1a.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30076,
                        "image_background": "https://media.rawg.io/media/games/af7/af7a831001c5c32c46e950cc883b8cb7.jpg"
                    },
                    {
                        "id": 42402,
                        "name": "Насилие",
                        "slug": "nasilie",
                        "language": "rus",
                        "games_count": 6109,
                        "image_background": "https://media.rawg.io/media/games/3ea/3ea3c9bbd940b6cb7f2139e42d3d443f.jpg"
                    },
                    {
                        "id": 34,
                        "name": "Violent",
                        "slug": "violent",
                        "language": "eng",
                        "games_count": 7147,
                        "image_background": "https://media.rawg.io/media/games/0af/0af85e8edddfa55368e47c539914a220.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7768,
                        "image_background": "https://media.rawg.io/media/games/8d4/8d46786ca86b1d95f3dc7e700e2dc4dd.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4759,
                        "image_background": "https://media.rawg.io/media/games/f99/f9979698c43fd84c3ab69280576dd3af.jpg"
                    },
                    {
                        "id": 11669,
                        "name": "stats",
                        "slug": "stats",
                        "language": "eng",
                        "games_count": 5331,
                        "image_background": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg"
                    },
                    {
                        "id": 42530,
                        "name": "Кастомизация персонажа",
                        "slug": "kastomizatsiia-personazha",
                        "language": "rus",
                        "games_count": 4786,
                        "image_background": "https://media.rawg.io/media/games/9bf/9bfac18ff678f41a4674250fa0e04a52.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6877,
                        "image_background": "https://media.rawg.io/media/games/07a/07a74470a2618fd71945db0619602baf.jpg"
                    },
                    {
                        "id": 121,
                        "name": "Character Customization",
                        "slug": "character-customization",
                        "language": "eng",
                        "games_count": 5558,
                        "image_background": "https://media.rawg.io/media/games/8fc/8fc59e74133fd8a8a436b7e2d0fb36c2.jpg"
                    },
                    {
                        "id": 42601,
                        "name": "Цветастая",
                        "slug": "tsvetastaia",
                        "language": "rus",
                        "games_count": 16483,
                        "image_background": "https://media.rawg.io/media/games/0be/0bea0a08a4d954337305391b778a7f37.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6665,
                        "image_background": "https://media.rawg.io/media/games/2e1/2e187b31e5cee21c110bd16798d75fab.jpg"
                    },
                    {
                        "id": 42529,
                        "name": "Для взрослых",
                        "slug": "dlia-vzroslykh",
                        "language": "rus",
                        "games_count": 3651,
                        "image_background": "https://media.rawg.io/media/games/2a2/2a2f9a0035544500e59a171c7038ec3a.jpg"
                    },
                    {
                        "id": 165,
                        "name": "Colorful",
                        "slug": "colorful",
                        "language": "eng",
                        "games_count": 25040,
                        "image_background": "https://media.rawg.io/media/screenshots/46a/46ac84997152eaf4f760257a60099231.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87927,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 192,
                        "name": "Mature",
                        "slug": "mature",
                        "language": "eng",
                        "games_count": 3844,
                        "image_background": "https://media.rawg.io/media/games/aa3/aa36ba4b486a03ddfaef274fb4f5afd4.jpg"
                    },
                    {
                        "id": 1465,
                        "name": "combat",
                        "slug": "combat",
                        "language": "eng",
                        "games_count": 13979,
                        "image_background": "https://media.rawg.io/media/games/048/048b46cdc66cbc7e235e1f359c2a77ec.jpg"
                    },
                    {
                        "id": 82,
                        "name": "Magic",
                        "slug": "magic",
                        "language": "eng",
                        "games_count": 10281,
                        "image_background": "https://media.rawg.io/media/games/330/330952c1726bbb56fc3b9f8a8c83ab1d.jpg"
                    },
                    {
                        "id": 42478,
                        "name": "Магия",
                        "slug": "magiia",
                        "language": "rus",
                        "games_count": 4916,
                        "image_background": "https://media.rawg.io/media/games/f6b/f6bed028b02369d4cab548f4f9337e81.jpg"
                    },
                    {
                        "id": 40937,
                        "name": "Steam Trading Cards",
                        "slug": "steam-trading-cards-2",
                        "language": "eng",
                        "games_count": 723,
                        "image_background": "https://media.rawg.io/media/games/cfe/cfe114c081281960bd79ace5209c0a4a.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11719,
                        "image_background": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg"
                    },
                    {
                        "id": 58127,
                        "name": "Бой",
                        "slug": "boi-2",
                        "language": "rus",
                        "games_count": 8829,
                        "image_background": "https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2225,
                        "image_background": "https://media.rawg.io/media/games/246/246367eab7ccfaaad14ad4507deee067.jpeg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/d1c/d1cd8a226cb224357c1f59605577cbf2.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1877,
                        "image_background": "https://media.rawg.io/media/screenshots/fdb/fdbe2b3f4b670900c342c86f07427b8d.jpg"
                    }
                ],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 15,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/3d3/3d33abf32d9fb92b9f242917abe276ba.jpg"
                    },
                    {
                        "id": 3995022,
                        "image": "https://media.rawg.io/media/screenshots/ac3/ac3579b4cbc333f2b18ee552027093bb.jpg"
                    },
                    {
                        "id": 3995023,
                        "image": "https://media.rawg.io/media/screenshots/100/1006c41b4aba7ab83b5cb5bdbb37ca2c.jpg"
                    },
                    {
                        "id": 3995024,
                        "image": "https://media.rawg.io/media/screenshots/287/2877abf64cdbfe978aab512d45031729.jpg"
                    },
                    {
                        "id": 3995025,
                        "image": "https://media.rawg.io/media/screenshots/c37/c37345ff1a95b341137fcafd0ad7179f.jpg"
                    },
                    {
                        "id": 3995026,
                        "image": "https://media.rawg.io/media/screenshots/675/67578060d4231329e6ec9574e528fae8.jpg"
                    },
                    {
                        "id": 3995027,
                        "image": "https://media.rawg.io/media/screenshots/4a1/4a1f99895c69ff14d756c9ee44514552.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "like-a-dragon-pirate-yakuza-in-hawaii",
                "name": "Like a Dragon: Pirate Yakuza in Hawaii",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 187,
                            "name": "PlayStation 5",
                            "slug": "playstation5"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-21",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/23e/23e3803318123533db02a2fceb3d3e54.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 57,
                "added_by_status": {
                    "yet": 12,
                    "owned": 6,
                    "toplay": 37,
                    "dropped": 2
                },
                "metacritic": null,
                "suggestions_count": 248,
                "updated": "2025-02-21T11:00:09",
                "id": 989189,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44633,
                        "image_background": "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42888,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 21009,
                        "image_background": "https://media.rawg.io/media/games/951/951572a3dd1e42544bd39a5d5b42d234.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23530,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19935,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8435,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12910,
                        "image_background": "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg"
                    },
                    {
                        "id": 42482,
                        "name": "Смешная",
                        "slug": "smeshnaia",
                        "language": "rus",
                        "games_count": 10588,
                        "image_background": "https://media.rawg.io/media/games/ec3/ec3a7db7b8ab5a71aad622fe7c62632f.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13851,
                        "image_background": "https://media.rawg.io/media/games/63f/63f0e68688cad279ed38cde931dbfcdb.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30097,
                        "image_background": "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg"
                    },
                    {
                        "id": 4,
                        "name": "Funny",
                        "slug": "funny",
                        "language": "eng",
                        "games_count": 26577,
                        "image_background": "https://media.rawg.io/media/games/25c/25c4776ab5723d5d735d8bf617ca12d9.jpg"
                    },
                    {
                        "id": 6,
                        "name": "Exploration",
                        "slug": "exploration",
                        "language": "eng",
                        "games_count": 25751,
                        "image_background": "https://media.rawg.io/media/games/a3c/a3c529a12c896c0ef02db5b4741de2ba.jpg"
                    },
                    {
                        "id": 69,
                        "name": "Action-Adventure",
                        "slug": "action-adventure",
                        "language": "eng",
                        "games_count": 18545,
                        "image_background": "https://media.rawg.io/media/games/569/56978b5a77f13aa2ec5d09ec81d01cad.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7775,
                        "image_background": "https://media.rawg.io/media/games/a6c/a6ccd34125c594abf1a9c9821b9a715d.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4766,
                        "image_background": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg"
                    },
                    {
                        "id": 42487,
                        "name": "Слэшер",
                        "slug": "slesher",
                        "language": "rus",
                        "games_count": 3222,
                        "image_background": "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg"
                    },
                    {
                        "id": 68,
                        "name": "Hack and Slash",
                        "slug": "hack-and-slash",
                        "language": "eng",
                        "games_count": 4711,
                        "image_background": "https://media.rawg.io/media/games/736/736c0eaec96d848d7824b33298a182f2.jpg"
                    },
                    {
                        "id": 42530,
                        "name": "Кастомизация персонажа",
                        "slug": "kastomizatsiia-personazha",
                        "language": "rus",
                        "games_count": 4798,
                        "image_background": "https://media.rawg.io/media/games/eb5/eb514db62d397c64288160d5bd8fd67a.jpg"
                    },
                    {
                        "id": 42490,
                        "name": "Приключенческий экшен",
                        "slug": "prikliuchencheskii-ekshen",
                        "language": "rus",
                        "games_count": 10938,
                        "image_background": "https://media.rawg.io/media/games/c50/c5085506fe4b5e20fc7aa5ace842c20b.jpg"
                    },
                    {
                        "id": 121,
                        "name": "Character Customization",
                        "slug": "character-customization",
                        "language": "eng",
                        "games_count": 5570,
                        "image_background": "https://media.rawg.io/media/games/214/214b29aeff13a0ae6a70fc4426e85991.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87977,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 110,
                        "name": "Cinematic",
                        "slug": "cinematic",
                        "language": "eng",
                        "games_count": 2712,
                        "image_background": "https://media.rawg.io/media/games/be0/be084b850302abe81675bc4ffc08a0d0.jpg"
                    },
                    {
                        "id": 42623,
                        "name": "Кинематографичная",
                        "slug": "kinematografichnaia",
                        "language": "rus",
                        "games_count": 2619,
                        "image_background": "https://media.rawg.io/media/games/471/4712c9ac591f556f553556b864a7e92b.jpg"
                    },
                    {
                        "id": 233,
                        "name": "JRPG",
                        "slug": "jrpg",
                        "language": "eng",
                        "games_count": 4707,
                        "image_background": "https://media.rawg.io/media/games/a14/a14acef284eaa4854f83c99e80fc15d8.jpg"
                    },
                    {
                        "id": 42514,
                        "name": "Японская ролевая игра",
                        "slug": "iaponskaia-rolevaia-igra",
                        "language": "rus",
                        "games_count": 3048,
                        "image_background": "https://media.rawg.io/media/screenshots/73e/73e4d78a55248fc26a4e06726b6bd969.jpg"
                    },
                    {
                        "id": 209,
                        "name": "Drama",
                        "slug": "drama",
                        "language": "eng",
                        "games_count": 4904,
                        "image_background": "https://media.rawg.io/media/games/2ad/2ad87a4a69b1104f02435c14c5196095.jpg"
                    },
                    {
                        "id": 66533,
                        "name": "Исследования",
                        "slug": "issledovaniia",
                        "language": "rus",
                        "games_count": 11072,
                        "image_background": "https://media.rawg.io/media/games/102/102b3f5639c57ca39e96ea1cb554f9e2.jpg"
                    },
                    {
                        "id": 42650,
                        "name": "Драма",
                        "slug": "drama-2",
                        "language": "rus",
                        "games_count": 4293,
                        "image_background": "https://media.rawg.io/media/games/efd/efd6b2cb621c41a2b6580d8ac260b8ba.jpg"
                    },
                    {
                        "id": 42507,
                        "name": "Сражения на мечах",
                        "slug": "srazheniia-na-mechakh",
                        "language": "rus",
                        "games_count": 858,
                        "image_background": "https://media.rawg.io/media/games/0b2/0b240149610b8b20eac098b8071f575a.jpg"
                    },
                    {
                        "id": 185,
                        "name": "Swordplay",
                        "slug": "swordplay",
                        "language": "eng",
                        "games_count": 829,
                        "image_background": "https://media.rawg.io/media/games/3e4/3e43e29ae126ef951842393f5ff7f33a.jpg"
                    },
                    {
                        "id": 255,
                        "name": "Pirates",
                        "slug": "pirates",
                        "language": "eng",
                        "games_count": 2245,
                        "image_background": "https://media.rawg.io/media/screenshots/520/520ed5686073be29438e995febc4426d.jpg"
                    },
                    {
                        "id": 42499,
                        "name": "Пираты",
                        "slug": "piraty",
                        "language": "rus",
                        "games_count": 549,
                        "image_background": "https://media.rawg.io/media/screenshots/b4b/b4bc9b2b8be2fb16d20d7d437f86cd72.jpg"
                    },
                    {
                        "id": 256,
                        "name": "Naval",
                        "slug": "naval",
                        "language": "eng",
                        "games_count": 367,
                        "image_background": "https://media.rawg.io/media/screenshots/1fe/1fe5974a7744c646365f315a71b3d9f7.jpg"
                    },
                    {
                        "id": 500,
                        "name": "Solo",
                        "slug": "solo",
                        "language": "eng",
                        "games_count": 1636,
                        "image_background": "https://media.rawg.io/media/screenshots/9bf/9bf17af55dba0e49bb9259f62dafd6bc.jpg"
                    },
                    {
                        "id": 257,
                        "name": "Sailing",
                        "slug": "sailing",
                        "language": "eng",
                        "games_count": 482,
                        "image_background": "https://media.rawg.io/media/screenshots/674/6740ddd051de766ebd3e34d1cb5e1a65.jpg"
                    },
                    {
                        "id": 42543,
                        "name": "Мореплавание",
                        "slug": "moreplavanie",
                        "language": "rus",
                        "games_count": 274,
                        "image_background": "https://media.rawg.io/media/screenshots/fae/faec035e655b2f9edcab638114118066.jpeg"
                    },
                    {
                        "id": 40910,
                        "name": "Succès Steam",
                        "slug": "succes-steam",
                        "language": "eng",
                        "games_count": 5,
                        "image_background": "https://media.rawg.io/media/games/3a9/3a9ea2db24f879e61fe7b824f5888d2a.jpg"
                    },
                    {
                        "id": 73243,
                        "name": "Флот",
                        "slug": "flot",
                        "language": "eng",
                        "games_count": 180,
                        "image_background": "https://media.rawg.io/media/screenshots/82d/82dfe2776a454b05894c154713f6cd2d.jpg"
                    },
                    {
                        "id": 49971,
                        "name": "Naval Combat",
                        "slug": "naval-combat-2",
                        "language": "eng",
                        "games_count": 207,
                        "image_background": "https://media.rawg.io/media/screenshots/a6b/a6bff427df597727a9192928a4152af6.jpg"
                    },
                    {
                        "id": 60140,
                        "name": "Морской бой",
                        "slug": "morskoi-boi",
                        "language": "rus",
                        "games_count": 193,
                        "image_background": "https://media.rawg.io/media/screenshots/abd/abdb064c53a55096ce6a970f7f4a1802.jpg"
                    },
                    {
                        "id": 90369,
                        "name": "Compat. contrôleurs complète",
                        "slug": "compat-controleurs-complete",
                        "language": "eng",
                        "games_count": 2,
                        "image_background": "https://media.rawg.io/media/screenshots/6b2/6b2713c99b12df4394a695a06306537e.jpg"
                    },
                    {
                        "id": 40911,
                        "name": "Cartes à échanger Steam",
                        "slug": "cartes-a-echanger-steam",
                        "language": "eng",
                        "games_count": 2,
                        "image_background": "https://media.rawg.io/media/screenshots/ca7/ca7b282870202c389f037ecf1ace1b86.jpg"
                    },
                    {
                        "id": 92074,
                        "name": "Partage familial",
                        "slug": "partage-familial",
                        "language": "eng",
                        "games_count": 1,
                        "image_background": "https://media.rawg.io/media/screenshots/6b2/6b2713c99b12df4394a695a06306537e.jpg"
                    }
                ],
                "esrb_rating": {
                    "id": 5,
                    "name": "Adults Only",
                    "slug": "adults-only",
                    "name_en": "Adults Only",
                    "name_ru": "Только для взрослых"
                },
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/23e/23e3803318123533db02a2fceb3d3e54.jpg"
                    },
                    {
                        "id": 4164204,
                        "image": "https://media.rawg.io/media/screenshots/093/093e5d47c1f044b969bb805553232419.jpg"
                    },
                    {
                        "id": 4164205,
                        "image": "https://media.rawg.io/media/screenshots/ffd/ffdab629259a2fc7e584c5b2a82c6bf5.jpg"
                    },
                    {
                        "id": 4164206,
                        "image": "https://media.rawg.io/media/screenshots/7c2/7c206a717bacd549861f66099787073e.jpg"
                    },
                    {
                        "id": 4164207,
                        "image": "https://media.rawg.io/media/screenshots/b7b/b7b510a8492eaf889f2ac1ac906e983f.jpg"
                    },
                    {
                        "id": 4164208,
                        "image": "https://media.rawg.io/media/screenshots/cc4/cc477296c984e53d06e96cbcd37e6db2.jpg"
                    },
                    {
                        "id": 4164209,
                        "image": "https://media.rawg.io/media/screenshots/8ee/8ee585b3fe4a431f1db3993b0ab7a19f.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 2,
                            "name": "PlayStation",
                            "slug": "playstation"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "lost-records-bloom-rage",
                "name": "Lost Records: Bloom & Rage",
                "playtime": 1,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 187,
                            "name": "PlayStation 5",
                            "slug": "playstation5"
                        }
                    },
                    {
                        "platform": {
                            "id": 186,
                            "name": "Xbox Series S/X",
                            "slug": "xbox-series-x"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 50,
                "added_by_status": {
                    "yet": 5,
                    "owned": 4,
                    "beaten": 1,
                    "toplay": 36,
                    "playing": 4
                },
                "metacritic": null,
                "suggestions_count": 40,
                "updated": "2025-02-21T08:06:47",
                "id": 973376,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235424,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42830,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43562,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20578,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20972,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 36021,
                        "image_background": "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14913,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24049,
                        "image_background": "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg"
                    },
                    {
                        "id": 42441,
                        "name": "От третьего лица",
                        "slug": "ot-tretego-litsa",
                        "language": "rus",
                        "games_count": 8418,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 149,
                        "name": "Third Person",
                        "slug": "third-person",
                        "language": "eng",
                        "games_count": 12893,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 189,
                        "name": "Female Protagonist",
                        "slug": "female-protagonist",
                        "language": "eng",
                        "games_count": 13777,
                        "image_background": "https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6877,
                        "image_background": "https://media.rawg.io/media/games/07a/07a74470a2618fd71945db0619602baf.jpg"
                    },
                    {
                        "id": 42556,
                        "name": "Тайна",
                        "slug": "taina",
                        "language": "rus",
                        "games_count": 6655,
                        "image_background": "https://media.rawg.io/media/games/baf/baf9905270314e07e6850cffdb51df41.jpg"
                    },
                    {
                        "id": 117,
                        "name": "Mystery",
                        "slug": "mystery",
                        "language": "eng",
                        "games_count": 14778,
                        "image_background": "https://media.rawg.io/media/games/948/948fe7f00b6cba8472f5ecd07a455077.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6665,
                        "image_background": "https://media.rawg.io/media/games/2e1/2e187b31e5cee21c110bd16798d75fab.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87927,
                        "image_background": "https://media.rawg.io/media/games/d97/d97f663b752a6484df105993f17abb49.jpg"
                    },
                    {
                        "id": 110,
                        "name": "Cinematic",
                        "slug": "cinematic",
                        "language": "eng",
                        "games_count": 2705,
                        "image_background": "https://media.rawg.io/media/games/a28/a289e23b4d4d84f26ab59125e3be4483.jpg"
                    },
                    {
                        "id": 218,
                        "name": "Multiple Endings",
                        "slug": "multiple-endings",
                        "language": "eng",
                        "games_count": 9969,
                        "image_background": "https://media.rawg.io/media/games/dc0/dc0926d3f84ffbcc00968fe8a6f0aed3.jpg"
                    },
                    {
                        "id": 42484,
                        "name": "90-е",
                        "slug": "90-e",
                        "language": "rus",
                        "games_count": 3315,
                        "image_background": "https://media.rawg.io/media/games/2a5/2a5072e5b28e1653a10e4f931f1991af.jpg"
                    },
                    {
                        "id": 42623,
                        "name": "Кинематографичная",
                        "slug": "kinematografichnaia",
                        "language": "rus",
                        "games_count": 2612,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 42606,
                        "name": "Стилизация",
                        "slug": "stilizatsiia",
                        "language": "rus",
                        "games_count": 8001,
                        "image_background": "https://media.rawg.io/media/screenshots/4a0/4a067c93dd1f331ac7a2e77bb3fc46e0.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11719,
                        "image_background": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg"
                    },
                    {
                        "id": 42672,
                        "name": "Сюрреалистичная",
                        "slug": "siurrealistichnaia",
                        "language": "rus",
                        "games_count": 2989,
                        "image_background": "https://media.rawg.io/media/screenshots/76f/76ff4289a2a3ad7659cae129b859d67e.jpg"
                    },
                    {
                        "id": 46,
                        "name": "Surreal",
                        "slug": "surreal",
                        "language": "eng",
                        "games_count": 5888,
                        "image_background": "https://media.rawg.io/media/screenshots/b0a/b0a14be9cf5547d82f079a5e988d0733.jpg"
                    },
                    {
                        "id": 243,
                        "name": "1990's",
                        "slug": "1990s",
                        "language": "eng",
                        "games_count": 3220,
                        "image_background": "https://media.rawg.io/media/games/9e5/9e5b91a6d02e66b8d450a977a59ae123.jpg"
                    },
                    {
                        "id": 166,
                        "name": "Stylized",
                        "slug": "stylized",
                        "language": "eng",
                        "games_count": 8019,
                        "image_background": "https://media.rawg.io/media/screenshots/e49/e497cca0e21625b8e36614399f0b970e.jpg"
                    },
                    {
                        "id": 217,
                        "name": "Romance",
                        "slug": "romance",
                        "language": "eng",
                        "games_count": 8773,
                        "image_background": "https://media.rawg.io/media/games/fae/faebf3c8cbf30db3f46bfbecf6ada3d6.jpg"
                    },
                    {
                        "id": 288,
                        "name": "Interactive Fiction",
                        "slug": "interactive-fiction",
                        "language": "eng",
                        "games_count": 3928,
                        "image_background": "https://media.rawg.io/media/games/177/1775aacedb915b0e0880476530dc87b4.jpg"
                    },
                    {
                        "id": 42655,
                        "name": "Психологическая",
                        "slug": "psikhologicheskaia",
                        "language": "rus",
                        "games_count": 2024,
                        "image_background": "https://media.rawg.io/media/screenshots/8f0/8f0b94922ad5e59968852649697b2643.jpg"
                    },
                    {
                        "id": 59643,
                        "name": "Протагонистка",
                        "slug": "protagonistka",
                        "language": "eng",
                        "games_count": 6260,
                        "image_background": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg"
                    },
                    {
                        "id": 285,
                        "name": "Psychological",
                        "slug": "psychological",
                        "language": "eng",
                        "games_count": 2124,
                        "image_background": "https://media.rawg.io/media/screenshots/f77/f77b685304e3c05087aed1d18a7b667f.jpg"
                    },
                    {
                        "id": 774,
                        "name": "nature",
                        "slug": "nature",
                        "language": "eng",
                        "games_count": 6493,
                        "image_background": "https://media.rawg.io/media/screenshots/b02/b02c8f7cc53dfa98a35552916c02fe6e.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2225,
                        "image_background": "https://media.rawg.io/media/games/246/246367eab7ccfaaad14ad4507deee067.jpeg"
                    },
                    {
                        "id": 64060,
                        "name": "Несколько концовок",
                        "slug": "neskolko-kontsovok",
                        "language": "rus",
                        "games_count": 5116,
                        "image_background": "https://media.rawg.io/media/games/9ac/9acdbcf11b7aa2c9d629ee38f8fa8c71.jpg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/d1c/d1cd8a226cb224357c1f59605577cbf2.jpg"
                    },
                    {
                        "id": 309,
                        "name": "Dynamic Narration",
                        "slug": "dynamic-narration",
                        "language": "eng",
                        "games_count": 531,
                        "image_background": "https://media.rawg.io/media/screenshots/425/4258ed0ffc18009a4eb7a42bbf03c6c7.jpg"
                    },
                    {
                        "id": 66535,
                        "name": "Интерактивная литература",
                        "slug": "interaktivnaia-literatura",
                        "language": "rus",
                        "games_count": 3227,
                        "image_background": "https://media.rawg.io/media/screenshots/fcc/fccf1a1d0c1615d4132bc779b4de7bb6.jpg"
                    },
                    {
                        "id": 42646,
                        "name": "Беседы",
                        "slug": "besedy",
                        "language": "rus",
                        "games_count": 2144,
                        "image_background": "https://media.rawg.io/media/games/ceb/ceb68aef14fbe54f0610acd8de480f64.jpg"
                    },
                    {
                        "id": 342,
                        "name": "Conversation",
                        "slug": "conversation",
                        "language": "eng",
                        "games_count": 2484,
                        "image_background": "https://media.rawg.io/media/games/74a/74a324529a14915adfc887d257f16f86.jpg"
                    },
                    {
                        "id": 58124,
                        "name": "Природа",
                        "slug": "priroda",
                        "language": "rus",
                        "games_count": 3113,
                        "image_background": "https://media.rawg.io/media/screenshots/691/6912cbe2a9e0aaab616688b554792e20.jpg"
                    },
                    {
                        "id": 66536,
                        "name": "Романтика",
                        "slug": "romantika",
                        "language": "eng",
                        "games_count": 3435,
                        "image_background": "https://media.rawg.io/media/games/154/1540d92a4768230fe46bfd05954b8ab4.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1877,
                        "image_background": "https://media.rawg.io/media/screenshots/fdb/fdbe2b3f4b670900c342c86f07427b8d.jpg"
                    },
                    {
                        "id": 74998,
                        "name": "Динамическое повествование",
                        "slug": "dinamicheskoe-povestvovanie",
                        "language": "rus",
                        "games_count": 385,
                        "image_background": "https://media.rawg.io/media/screenshots/61a/61a8c414a377202e89d2081ee58aaa50.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg"
                    },
                    {
                        "id": 3981477,
                        "image": "https://media.rawg.io/media/screenshots/06e/06e5a141a1bba80876b231d27dcae437.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    },
                    {
                        "platform": {
                            "id": 2,
                            "name": "PlayStation",
                            "slug": "playstation"
                        }
                    },
                    {
                        "platform": {
                            "id": 3,
                            "name": "Xbox",
                            "slug": "xbox"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 51,
                        "name": "Indie",
                        "slug": "indie"
                    },
                    {
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    }
                ]
            },
            {
                "slug": "tribe-nine",
                "name": "TRIBE NINE",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-18",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/95c/95c29e8b5574c46b8ea83d3b9ac5a552.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [],
                "ratings_count": 0,
                "reviews_text_count": 0,
                "added": 5,
                "added_by_status": {
                    "owned": 5
                },
                "metacritic": null,
                "suggestions_count": 28,
                "updated": "2025-02-21T08:57:37",
                "id": 998008,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235469,
                        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58277,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44598,
                        "image_background": "https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20589,
                        "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14922,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23510,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19915,
                        "image_background": "https://media.rawg.io/media/games/849/849414b978db37d4563ff9e4b0d3a787.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24058,
                        "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
                    },
                    {
                        "id": 45,
                        "name": "2D",
                        "slug": "2d",
                        "language": "eng",
                        "games_count": 200746,
                        "image_background": "https://media.rawg.io/media/games/226/2262cea0b385db6cf399f4be831603b0.jpg"
                    },
                    {
                        "id": 42420,
                        "name": "Сложная",
                        "slug": "slozhnaia",
                        "language": "rus",
                        "games_count": 5739,
                        "image_background": "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg"
                    },
                    {
                        "id": 42480,
                        "name": "Фэнтези",
                        "slug": "fentezi",
                        "language": "rus",
                        "games_count": 13837,
                        "image_background": "https://media.rawg.io/media/screenshots/c97/c97b943741f5fbc936fe054d9d58851d.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30083,
                        "image_background": "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg"
                    },
                    {
                        "id": 49,
                        "name": "Difficult",
                        "slug": "difficult",
                        "language": "eng",
                        "games_count": 13711,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 79,
                        "name": "Free to Play",
                        "slug": "free-to-play",
                        "language": "eng",
                        "games_count": 8194,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42538,
                        "name": "Бесплатная игра",
                        "slug": "besplatnaia-igra",
                        "language": "rus",
                        "games_count": 8181,
                        "image_background": "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
                    },
                    {
                        "id": 42415,
                        "name": "Пиксельная графика",
                        "slug": "pikselnaia-grafika",
                        "language": "rus",
                        "games_count": 14903,
                        "image_background": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg"
                    },
                    {
                        "id": 122,
                        "name": "Pixel Graphics",
                        "slug": "pixel-graphics",
                        "language": "eng",
                        "games_count": 95987,
                        "image_background": "https://media.rawg.io/media/games/926/926928beb8a9f9b31cf202965aa4cbbc.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7772,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4763,
                        "image_background": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg"
                    },
                    {
                        "id": 42477,
                        "name": "Мрачная",
                        "slug": "mrachnaia",
                        "language": "rus",
                        "games_count": 6523,
                        "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
                    },
                    {
                        "id": 41,
                        "name": "Dark",
                        "slug": "dark",
                        "language": "eng",
                        "games_count": 17052,
                        "image_background": "https://media.rawg.io/media/games/b54/b54598d1d5cc31899f4f0a7e3122a7b0.jpg"
                    },
                    {
                        "id": 42407,
                        "name": "Аниме",
                        "slug": "anime-2",
                        "language": "rus",
                        "games_count": 10849,
                        "image_background": "https://media.rawg.io/media/games/416/4164ca654a339af5be8e63cc9c480c70.jpg"
                    },
                    {
                        "id": 134,
                        "name": "Anime",
                        "slug": "anime",
                        "language": "eng",
                        "games_count": 14960,
                        "image_background": "https://media.rawg.io/media/screenshots/12e/12ee2600684863837596c0dbb1923fca.jpg"
                    },
                    {
                        "id": 40837,
                        "name": "In-App Purchases",
                        "slug": "in-app-purchases",
                        "language": "eng",
                        "games_count": 3001,
                        "image_background": "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87946,
                        "image_background": "https://media.rawg.io/media/games/9a1/9a18c226cf379272c698f26d2b79b3da.jpg"
                    },
                    {
                        "id": 42470,
                        "name": "Киберпанк",
                        "slug": "kiberpank",
                        "language": "rus",
                        "games_count": 2150,
                        "image_background": "https://media.rawg.io/media/screenshots/7f8/7f8b58994fc420fefaa5fb9992335a11.jpg"
                    },
                    {
                        "id": 226,
                        "name": "Cyberpunk",
                        "slug": "cyberpunk",
                        "language": "eng",
                        "games_count": 4868,
                        "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
                    },
                    {
                        "id": 233,
                        "name": "JRPG",
                        "slug": "jrpg",
                        "language": "eng",
                        "games_count": 4703,
                        "image_background": "https://media.rawg.io/media/screenshots/515/515e8cda2f9e3ea1ca2785e99c1a1893.jpg"
                    },
                    {
                        "id": 42502,
                        "name": "Чёрный юмор",
                        "slug": "chiornyi-iumor",
                        "language": "rus",
                        "games_count": 2016,
                        "image_background": "https://media.rawg.io/media/games/ab8/ab8217a1fe2ced388a388722734e6d16.jpg"
                    },
                    {
                        "id": 42514,
                        "name": "Японская ролевая игра",
                        "slug": "iaponskaia-rolevaia-igra",
                        "language": "rus",
                        "games_count": 3044,
                        "image_background": "https://media.rawg.io/media/games/158/15880530ce424311f264671e4b0611ee.jpg"
                    },
                    {
                        "id": 148,
                        "name": "Dark Humor",
                        "slug": "dark-humor",
                        "language": "eng",
                        "games_count": 3305,
                        "image_background": "https://media.rawg.io/media/games/907/90757eaa9dc7c5cf7c47bf4960843999.jpg"
                    },
                    {
                        "id": 171,
                        "name": "PvE",
                        "slug": "pve",
                        "language": "eng",
                        "games_count": 6258,
                        "image_background": "https://media.rawg.io/media/screenshots/06f/06fa9a33188522273623ef314ec4fc3b.jpg"
                    },
                    {
                        "id": 42592,
                        "name": "Похожа на Dark Souls",
                        "slug": "pokhozha-na-dark-souls",
                        "language": "rus",
                        "games_count": 1185,
                        "image_background": "https://media.rawg.io/media/games/16a/16a81cc458b0acb6ed2bcfd2a10f1527.jpg"
                    },
                    {
                        "id": 580,
                        "name": "Souls-like",
                        "slug": "souls-like",
                        "language": "eng",
                        "games_count": 1588,
                        "image_background": "https://media.rawg.io/media/games/16a/16a81cc458b0acb6ed2bcfd2a10f1527.jpg"
                    },
                    {
                        "id": 87088,
                        "name": "Игрок против ИИ",
                        "slug": "igrok-protiv-ii",
                        "language": "rus",
                        "games_count": 3741,
                        "image_background": "https://media.rawg.io/media/screenshots/57c/57c95db99124157a85962eb879733185.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 0,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/95c/95c29e8b5574c46b8ea83d3b9ac5a552.jpg"
                    },
                    {
                        "id": 4163403,
                        "image": "https://media.rawg.io/media/screenshots/1c3/1c30a43b66e8734aa79710efb5d10496.jpg"
                    },
                    {
                        "id": 4163404,
                        "image": "https://media.rawg.io/media/screenshots/ac1/ac19e9700dd7b53ee0aea1738e97fca2.jpg"
                    },
                    {
                        "id": 4163405,
                        "image": "https://media.rawg.io/media/screenshots/0a2/0a2f80ca2c67200516fcc2d4e8045b19.jpg"
                    },
                    {
                        "id": 4163406,
                        "image": "https://media.rawg.io/media/screenshots/c20/c20e231fbdeaa958e4daad9fbee526a4.jpg"
                    },
                    {
                        "id": 4163407,
                        "image": "https://media.rawg.io/media/screenshots/459/4590c69878491b0965f157cef46a6992.jpg"
                    },
                    {
                        "id": 4163408,
                        "image": "https://media.rawg.io/media/screenshots/258/2581ba83242868c48b98c52ce481ec2f.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            },
            {
                "slug": "yin-yang-shi-hui-juan",
                "name": "陰陽師絵巻",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 4,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "stores": [
                    {
                        "store": {
                            "id": 1,
                            "name": "Steam",
                            "slug": "steam"
                        }
                    }
                ],
                "released": "2025-02-20",
                "tba": false,
                "background_image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [],
                "ratings_count": 0,
                "reviews_text_count": 0,
                "added": 3,
                "added_by_status": {
                    "owned": 3
                },
                "metacritic": null,
                "suggestions_count": 119,
                "updated": "2025-02-21T10:57:26",
                "id": 998097,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235565,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58353,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44633,
                        "image_background": "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                    },
                    {
                        "id": 42398,
                        "name": "Инди",
                        "slug": "indi-2",
                        "language": "rus",
                        "games_count": 60771,
                        "image_background": "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23530,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19935,
                        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg"
                    },
                    {
                        "id": 42399,
                        "name": "Казуальная игра",
                        "slug": "kazualnaia-igra",
                        "language": "rus",
                        "games_count": 46964,
                        "image_background": "https://media.rawg.io/media/games/25c/25c4776ab5723d5d735d8bf617ca12d9.jpg"
                    },
                    {
                        "id": 79,
                        "name": "Free to Play",
                        "slug": "free-to-play",
                        "language": "eng",
                        "games_count": 8203,
                        "image_background": "https://media.rawg.io/media/games/742/7424c1f7d0a8da9ae29cd866f985698b.jpg"
                    },
                    {
                        "id": 42538,
                        "name": "Бесплатная игра",
                        "slug": "besplatnaia-igra",
                        "language": "rus",
                        "games_count": 8190,
                        "image_background": "https://media.rawg.io/media/games/11f/11fd681c312c14644ab360888dba3486.jpg"
                    },
                    {
                        "id": 97,
                        "name": "Action RPG",
                        "slug": "action-rpg",
                        "language": "eng",
                        "games_count": 7775,
                        "image_background": "https://media.rawg.io/media/games/a6c/a6ccd34125c594abf1a9c9821b9a715d.jpg"
                    },
                    {
                        "id": 42489,
                        "name": "Ролевой экшен",
                        "slug": "rolevoi-ekshen",
                        "language": "rus",
                        "games_count": 4766,
                        "image_background": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 0,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg"
                    },
                    {
                        "id": 4164186,
                        "image": "https://media.rawg.io/media/screenshots/224/2241cbb1e8c169180b49c638910f6583.jpg"
                    },
                    {
                        "id": 4164187,
                        "image": "https://media.rawg.io/media/screenshots/b65/b654c7cc4d230642b786d881a0642784.jpg"
                    },
                    {
                        "id": 4164188,
                        "image": "https://media.rawg.io/media/screenshots/ea3/ea3c9e93b4059bd4bf555faa4217ff01.jpg"
                    },
                    {
                        "id": 4164189,
                        "image": "https://media.rawg.io/media/screenshots/a1c/a1c1435f0b1f7b89c30d37903b47cfe8.jpg"
                    },
                    {
                        "id": 4164190,
                        "image": "https://media.rawg.io/media/screenshots/b24/b243a165ef2ddccd676d3a1b6ae4fc44.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 1,
                            "name": "PC",
                            "slug": "pc"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 40,
                        "name": "Casual",
                        "slug": "casual"
                    },
                    {
                        "id": 51,
                        "name": "Indie",
                        "slug": "indie"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    },
                    {
                        "id": 5,
                        "name": "RPG",
                        "slug": "role-playing-games-rpg"
                    }
                ]
            }
        ],
        "user_platforms": false
    };

    

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