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

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');


    console.log(year, +month + 1);

    // const results = await fetch(`https://api.rawg.io/api/games?dates=${year}-${month}-01,${year}-${String(+month+1).padStart(2, '0')}-31&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    // const data = await results.json();

    const data = {
        "count": 914,
        "next": "https://api.rawg.io/api/games?dates=2025-02-01%2C2025-03-31&key=8&ordering=-added&page=2&page_size=5",
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
                "slug": "assassins-creed-shadows",
                "name": "Assassin's Creed Shadows",
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
                    },
                    {
                        "platform": {
                            "id": 5,
                            "name": "macOS",
                            "slug": "macos"
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
                    },
                    {
                        "store": {
                            "id": 4,
                            "name": "App Store",
                            "slug": "apple-appstore"
                        }
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-03-20",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/526/526881e0f5f8c1550e51df3801f96ea3.jpg",
                "rating": 3.0,
                "rating_top": 3,
                "ratings": [
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 3,
                        "percent": 37.5
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 2,
                        "percent": 25.0
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 2,
                        "percent": 25.0
                    },
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 1,
                        "percent": 12.5
                    }
                ],
                "ratings_count": 8,
                "reviews_text_count": 0,
                "added": 248,
                "added_by_status": {
                    "yet": 42,
                    "owned": 34,
                    "toplay": 169,
                    "playing": 3
                },
                "metacritic": null,
                "suggestions_count": 296,
                "updated": "2025-01-31T09:08:02",
                "id": 981791,
                "score": null,
                "clip": null,
                "tags": [],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 8,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/526/526881e0f5f8c1550e51df3801f96ea3.jpg"
                    },
                    {
                        "id": 4041913,
                        "image": "https://media.rawg.io/media/screenshots/b9c/b9c6546ce1488f918e6373073d800fa7.jpg"
                    },
                    {
                        "id": 4041914,
                        "image": "https://media.rawg.io/media/screenshots/801/801c5b2489abedcddf4acd94da35daaf.jpg"
                    },
                    {
                        "id": 4041915,
                        "image": "https://media.rawg.io/media/screenshots/b9c/b9ce924c7bfdbdc45793554a56932f36.jpg"
                    },
                    {
                        "id": 4053747,
                        "image": "https://media.rawg.io/media/screenshots/0f7/0f7bb8958b46684d773c75d26008d800.jpg"
                    },
                    {
                        "id": 4053748,
                        "image": "https://media.rawg.io/media/screenshots/aeb/aeb5d332cea63b7037543bd30d6da14e.jpg"
                    },
                    {
                        "id": 4053749,
                        "image": "https://media.rawg.io/media/screenshots/80d/80d237e149c2c7cc96da096adb78292f.jpg"
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
                    },
                    {
                        "platform": {
                            "id": 5,
                            "name": "Apple Macintosh",
                            "slug": "mac"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    }
                ]
            },
            {
                "slug": "kingdom-come-deliverance-ii",
                "name": "Kingdom Come: Deliverance II",
                "playtime": 3,
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
                    },
                    {
                        "store": {
                            "id": 5,
                            "name": "GOG",
                            "slug": "gog"
                        }
                    }
                ],
                "released": "2025-02-04",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/d84/d842fec4ae7bbd782d330f678c980f7f.jpg",
                "rating": 4.0,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 8,
                        "percent": 50.0
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 4,
                        "percent": 25.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 2,
                        "percent": 12.5
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 2,
                        "percent": 12.5
                    }
                ],
                "ratings_count": 15,
                "reviews_text_count": 0,
                "added": 237,
                "added_by_status": {
                    "yet": 37,
                    "owned": 46,
                    "beaten": 5,
                    "toplay": 130,
                    "dropped": 1,
                    "playing": 18
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2025-02-19T12:17:58",
                "id": 980502,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235265,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58120,
                        "image_background": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44522,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42768,
                        "image_background": "https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43475,
                        "image_background": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20541,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20917,
                        "image_background": "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 35983,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23466,
                        "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19871,
                        "image_background": "https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24015,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 42442,
                        "name": "Открытый мир",
                        "slug": "otkrytyi-mir",
                        "language": "rus",
                        "games_count": 6476,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 36,
                        "name": "Open World",
                        "slug": "open-world",
                        "language": "eng",
                        "games_count": 8290,
                        "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
                    },
                    {
                        "id": 42429,
                        "name": "От первого лица",
                        "slug": "ot-pervogo-litsa",
                        "language": "rus",
                        "games_count": 13147,
                        "image_background": "https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg"
                    },
                    {
                        "id": 8,
                        "name": "First-Person",
                        "slug": "first-person",
                        "language": "eng",
                        "games_count": 34068,
                        "image_background": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
                    },
                    {
                        "id": 69,
                        "name": "Action-Adventure",
                        "slug": "action-adventure",
                        "language": "eng",
                        "games_count": 18496,
                        "image_background": "https://media.rawg.io/media/games/af7/af7a831001c5c32c46e950cc883b8cb7.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6860,
                        "image_background": "https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg"
                    },
                    {
                        "id": 42490,
                        "name": "Приключенческий экшен",
                        "slug": "prikliuchencheskii-ekshen",
                        "language": "rus",
                        "games_count": 10889,
                        "image_background": "https://media.rawg.io/media/games/341/3413d7275fb1e919f00a925df8288b77.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6648,
                        "image_background": "https://media.rawg.io/media/games/6e0/6e0c19bb111bd4fa20cf0eb72a049519.jpg"
                    },
                    {
                        "id": 42460,
                        "name": "Реализм",
                        "slug": "realizm",
                        "language": "rus",
                        "games_count": 7247,
                        "image_background": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87867,
                        "image_background": "https://media.rawg.io/media/games/74c/74c68a8de3d4983ff932dd456ac2dc66.jpg"
                    },
                    {
                        "id": 77,
                        "name": "Realistic",
                        "slug": "realistic",
                        "language": "eng",
                        "games_count": 7268,
                        "image_background": "https://media.rawg.io/media/games/b34/b3419c2706f8f8dbe40d08e23642ad06.jpg"
                    },
                    {
                        "id": 89,
                        "name": "Historical",
                        "slug": "historical",
                        "language": "eng",
                        "games_count": 3545,
                        "image_background": "https://media.rawg.io/media/games/39a/39a8aa7798b685f9625e857bc394259d.jpg"
                    },
                    {
                        "id": 1465,
                        "name": "combat",
                        "slug": "combat",
                        "language": "eng",
                        "games_count": 13957,
                        "image_background": "https://media.rawg.io/media/games/615/61503312a95d451198d80d9bae275f79.jpg"
                    },
                    {
                        "id": 42391,
                        "name": "Средневековье",
                        "slug": "srednevekove",
                        "language": "rus",
                        "games_count": 4071,
                        "image_background": "https://media.rawg.io/media/games/59a/59a3ebcba3d08c51532c6ca877aff256.jpg"
                    },
                    {
                        "id": 66,
                        "name": "Medieval",
                        "slug": "medieval",
                        "language": "eng",
                        "games_count": 7131,
                        "image_background": "https://media.rawg.io/media/games/330/330952c1726bbb56fc3b9f8a8c83ab1d.jpg"
                    },
                    {
                        "id": 40937,
                        "name": "Steam Trading Cards",
                        "slug": "steam-trading-cards-2",
                        "language": "eng",
                        "games_count": 721,
                        "image_background": "https://media.rawg.io/media/games/e44/e445335e611b4ccf03af71fffcbd30a4.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11681,
                        "image_background": "https://media.rawg.io/media/games/ea6/ea6a1382b15d749e15fdfbf0aece7689.jpg"
                    },
                    {
                        "id": 58127,
                        "name": "Бой",
                        "slug": "boi-2",
                        "language": "rus",
                        "games_count": 8807,
                        "image_background": "https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg"
                    },
                    {
                        "id": 42566,
                        "name": "Альтернативная история",
                        "slug": "alternativnaia-istoriia",
                        "language": "rus",
                        "games_count": 1254,
                        "image_background": "https://media.rawg.io/media/games/9eb/9ebae11c9f394b12c24901c9afb867ce.jpg"
                    },
                    {
                        "id": 208,
                        "name": "Alternate History",
                        "slug": "alternate-history",
                        "language": "eng",
                        "games_count": 1953,
                        "image_background": "https://media.rawg.io/media/games/776/776e601c2c37f50bb11f9054f54c60da.jpg"
                    },
                    {
                        "id": 42507,
                        "name": "Сражения на мечах",
                        "slug": "srazheniia-na-mechakh",
                        "language": "rus",
                        "games_count": 851,
                        "image_background": "https://media.rawg.io/media/games/7d5/7d5bfa5864abe9ff41bf9e068ce6d51f.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2215,
                        "image_background": "https://media.rawg.io/media/games/313/3137f0b7fb36b53e34abcde6e7607909.jpg"
                    },
                    {
                        "id": 287,
                        "name": "Political",
                        "slug": "political",
                        "language": "eng",
                        "games_count": 677,
                        "image_background": "https://media.rawg.io/media/games/312/3121ba5c3d5fbe8b747475099f3e63b8.jpg"
                    },
                    {
                        "id": 42559,
                        "name": "Политическая",
                        "slug": "politicheskaia",
                        "language": "rus",
                        "games_count": 529,
                        "image_background": "https://media.rawg.io/media/screenshots/f69/f690eafb7cbb29778d129aac3772d433.jpeg"
                    },
                    {
                        "id": 185,
                        "name": "Swordplay",
                        "slug": "swordplay",
                        "language": "eng",
                        "games_count": 822,
                        "image_background": "https://media.rawg.io/media/screenshots/d3e/d3ed3ab5f11f8f6294dd561c16dccdf8.jpg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14739,
                        "image_background": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg"
                    },
                    {
                        "id": 66539,
                        "name": "Историческая",
                        "slug": "istoricheskaia",
                        "language": "rus",
                        "games_count": 1806,
                        "image_background": "https://media.rawg.io/media/games/9e2/9e27325d5144e9f6861fc6b6b8356665.jpg"
                    },
                    {
                        "id": 1500,
                        "name": "immersive",
                        "slug": "immersive",
                        "language": "eng",
                        "games_count": 1010,
                        "image_background": "https://media.rawg.io/media/games/8cb/8cbf9a1735ae48b70b9aba5f82ab56da.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1867,
                        "image_background": "https://media.rawg.io/media/screenshots/b97/b979891cc35388daee3baacee0e96324.jpg"
                    },
                    {
                        "id": 58140,
                        "name": "Иммерсивная игра",
                        "slug": "immersivnaia-igra",
                        "language": "rus",
                        "games_count": 337,
                        "image_background": "https://media.rawg.io/media/screenshots/9bf/9bfd312d33c00287db183cb199ce69d0.jpg"
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
                "reviews_count": 16,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/d84/d842fec4ae7bbd782d330f678c980f7f.jpg"
                    },
                    {
                        "id": 4152948,
                        "image": "https://media.rawg.io/media/screenshots/9a8/9a8ecc33989862e3be29132189c3f7f6.jpg"
                    },
                    {
                        "id": 4152949,
                        "image": "https://media.rawg.io/media/screenshots/741/741f7625ce8adfe138b43608f1e8e01c.jpg"
                    },
                    {
                        "id": 4152950,
                        "image": "https://media.rawg.io/media/screenshots/616/616c2a598520d24c1a56d8b1aa90217b.jpg"
                    },
                    {
                        "id": 4152951,
                        "image": "https://media.rawg.io/media/screenshots/cc5/cc5951ae93265c9a3ccd550ce58fbfa8.jpg"
                    },
                    {
                        "id": 4152952,
                        "image": "https://media.rawg.io/media/screenshots/0ce/0ce56603d0deb0f66f969ccdee51284b.jpg"
                    },
                    {
                        "id": 4152953,
                        "image": "https://media.rawg.io/media/screenshots/ab2/ab2e1086144e9722aba95d012aadcc66.jpg"
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
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
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
            },
            {
                "slug": "split-fiction",
                "name": "Split Fiction",
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
                    },
                    {
                        "store": {
                            "id": 3,
                            "name": "PlayStation Store",
                            "slug": "playstation-store"
                        }
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-03-06",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/02a/02ac22b3b90717dabaa535640c38534c.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 2,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 2,
                "reviews_text_count": 0,
                "added": 110,
                "added_by_status": {
                    "yet": 16,
                    "owned": 15,
                    "toplay": 79
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2024-12-20T11:01:45",
                "id": 994603,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 18,
                        "name": "Co-op",
                        "slug": "co-op",
                        "language": "eng",
                        "games_count": 12823,
                        "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
                    },
                    {
                        "id": 198,
                        "name": "Split Screen",
                        "slug": "split-screen",
                        "language": "eng",
                        "games_count": 7287,
                        "image_background": "https://media.rawg.io/media/games/12e/12ea6b35b65df38258e25885a0a392a6.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 2,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/02a/02ac22b3b90717dabaa535640c38534c.jpg"
                    },
                    {
                        "id": 4137937,
                        "image": "https://media.rawg.io/media/screenshots/dc1/dc10dd68a2e7472b7ed40feda3a16c54.jpg"
                    },
                    {
                        "id": 4137938,
                        "image": "https://media.rawg.io/media/screenshots/ea9/ea9e37dc1b36db3401a6b308d766198b.jpg"
                    },
                    {
                        "id": 4137939,
                        "image": "https://media.rawg.io/media/screenshots/e4b/e4bee3c261abe04f869b6f429852a00d.jpg"
                    },
                    {
                        "id": 4137940,
                        "image": "https://media.rawg.io/media/screenshots/395/395fdacce19c05718a7df69a227c8580.jpg"
                    },
                    {
                        "id": 4137941,
                        "image": "https://media.rawg.io/media/screenshots/640/640ae66a49a93b16ba5d2537e78b75c1.jpg"
                    },
                    {
                        "id": 4137942,
                        "image": "https://media.rawg.io/media/screenshots/f5a/f5a69af83f67e75cb404b2dd334e2197.jpg"
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
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    }
                ]
            },
            {
                "slug": "monster-hunter-wilds",
                "name": "Monster Hunter Wilds",
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
                "stores": null,
                "released": "2025-02-28",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/91b/91b4edd8fecf88b2b5ca0752321382ee.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 77,
                "added_by_status": {
                    "yet": 7,
                    "owned": 13,
                    "beaten": 1,
                    "toplay": 53,
                    "dropped": 2,
                    "playing": 1
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2024-12-16T18:37:16",
                "id": 973391,
                "score": null,
                "clip": null,
                "tags": [],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/91b/91b4edd8fecf88b2b5ca0752321382ee.jpg"
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

        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
    
    
        console.log(year, +month + 1);

    // const results = await fetch(`https://api.rawg.io/api/games?dates=${year}-${month}-01,${year}-${String(+month+1).padStart(2, '0')}-31&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    // const data = await results.json();

    const data = {
        "count": 914,
        "next": "https://api.rawg.io/api/games?dates=2025-02-01%2C2025-03-31&key=8&ordering=-added&page=2&page_size=5",
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
                "slug": "assassins-creed-shadows",
                "name": "Assassin's Creed Shadows",
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
                    },
                    {
                        "platform": {
                            "id": 5,
                            "name": "macOS",
                            "slug": "macos"
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
                    },
                    {
                        "store": {
                            "id": 4,
                            "name": "App Store",
                            "slug": "apple-appstore"
                        }
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-03-20",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/526/526881e0f5f8c1550e51df3801f96ea3.jpg",
                "rating": 3.0,
                "rating_top": 3,
                "ratings": [
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 3,
                        "percent": 37.5
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 2,
                        "percent": 25.0
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 2,
                        "percent": 25.0
                    },
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 1,
                        "percent": 12.5
                    }
                ],
                "ratings_count": 8,
                "reviews_text_count": 0,
                "added": 248,
                "added_by_status": {
                    "yet": 42,
                    "owned": 34,
                    "toplay": 169,
                    "playing": 3
                },
                "metacritic": null,
                "suggestions_count": 296,
                "updated": "2025-01-31T09:08:02",
                "id": 981791,
                "score": null,
                "clip": null,
                "tags": [],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 8,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/526/526881e0f5f8c1550e51df3801f96ea3.jpg"
                    },
                    {
                        "id": 4041913,
                        "image": "https://media.rawg.io/media/screenshots/b9c/b9c6546ce1488f918e6373073d800fa7.jpg"
                    },
                    {
                        "id": 4041914,
                        "image": "https://media.rawg.io/media/screenshots/801/801c5b2489abedcddf4acd94da35daaf.jpg"
                    },
                    {
                        "id": 4041915,
                        "image": "https://media.rawg.io/media/screenshots/b9c/b9ce924c7bfdbdc45793554a56932f36.jpg"
                    },
                    {
                        "id": 4053747,
                        "image": "https://media.rawg.io/media/screenshots/0f7/0f7bb8958b46684d773c75d26008d800.jpg"
                    },
                    {
                        "id": 4053748,
                        "image": "https://media.rawg.io/media/screenshots/aeb/aeb5d332cea63b7037543bd30d6da14e.jpg"
                    },
                    {
                        "id": 4053749,
                        "image": "https://media.rawg.io/media/screenshots/80d/80d237e149c2c7cc96da096adb78292f.jpg"
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
                    },
                    {
                        "platform": {
                            "id": 5,
                            "name": "Apple Macintosh",
                            "slug": "mac"
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    }
                ]
            },
            {
                "slug": "kingdom-come-deliverance-ii",
                "name": "Kingdom Come: Deliverance II",
                "playtime": 3,
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
                    },
                    {
                        "store": {
                            "id": 5,
                            "name": "GOG",
                            "slug": "gog"
                        }
                    }
                ],
                "released": "2025-02-04",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/d84/d842fec4ae7bbd782d330f678c980f7f.jpg",
                "rating": 4.0,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 8,
                        "percent": 50.0
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 4,
                        "percent": 25.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 2,
                        "percent": 12.5
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 2,
                        "percent": 12.5
                    }
                ],
                "ratings_count": 15,
                "reviews_text_count": 0,
                "added": 237,
                "added_by_status": {
                    "yet": 37,
                    "owned": 46,
                    "beaten": 5,
                    "toplay": 130,
                    "dropped": 1,
                    "playing": 18
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2025-02-19T12:17:58",
                "id": 980502,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 31,
                        "name": "Singleplayer",
                        "slug": "singleplayer",
                        "language": "eng",
                        "games_count": 235265,
                        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
                    },
                    {
                        "id": 42396,
                        "name": "Для одного игрока",
                        "slug": "dlia-odnogo-igroka",
                        "language": "rus",
                        "games_count": 58120,
                        "image_background": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"
                    },
                    {
                        "id": 42417,
                        "name": "Экшен",
                        "slug": "ekshen",
                        "language": "rus",
                        "games_count": 44522,
                        "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                    },
                    {
                        "id": 42392,
                        "name": "Приключение",
                        "slug": "prikliuchenie",
                        "language": "rus",
                        "games_count": 42768,
                        "image_background": "https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg"
                    },
                    {
                        "id": 40847,
                        "name": "Steam Achievements",
                        "slug": "steam-achievements",
                        "language": "eng",
                        "games_count": 43475,
                        "image_background": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
                    },
                    {
                        "id": 40836,
                        "name": "Full controller support",
                        "slug": "full-controller-support",
                        "language": "eng",
                        "games_count": 20541,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 40849,
                        "name": "Steam Cloud",
                        "slug": "steam-cloud",
                        "language": "eng",
                        "games_count": 20917,
                        "image_background": "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg"
                    },
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 35983,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 42394,
                        "name": "Глубокий сюжет",
                        "slug": "glubokii-siuzhet",
                        "language": "rus",
                        "games_count": 14879,
                        "image_background": "https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg"
                    },
                    {
                        "id": 24,
                        "name": "RPG",
                        "slug": "rpg",
                        "language": "eng",
                        "games_count": 23466,
                        "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
                    },
                    {
                        "id": 42412,
                        "name": "Ролевая игра",
                        "slug": "rolevaia-igra",
                        "language": "rus",
                        "games_count": 19871,
                        "image_background": "https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg"
                    },
                    {
                        "id": 118,
                        "name": "Story Rich",
                        "slug": "story-rich",
                        "language": "eng",
                        "games_count": 24015,
                        "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
                    },
                    {
                        "id": 42442,
                        "name": "Открытый мир",
                        "slug": "otkrytyi-mir",
                        "language": "rus",
                        "games_count": 6476,
                        "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
                    },
                    {
                        "id": 36,
                        "name": "Open World",
                        "slug": "open-world",
                        "language": "eng",
                        "games_count": 8290,
                        "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
                    },
                    {
                        "id": 42429,
                        "name": "От первого лица",
                        "slug": "ot-pervogo-litsa",
                        "language": "rus",
                        "games_count": 13147,
                        "image_background": "https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg"
                    },
                    {
                        "id": 8,
                        "name": "First-Person",
                        "slug": "first-person",
                        "language": "eng",
                        "games_count": 34068,
                        "image_background": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
                    },
                    {
                        "id": 69,
                        "name": "Action-Adventure",
                        "slug": "action-adventure",
                        "language": "eng",
                        "games_count": 18496,
                        "image_background": "https://media.rawg.io/media/games/af7/af7a831001c5c32c46e950cc883b8cb7.jpg"
                    },
                    {
                        "id": 42390,
                        "name": "Решения с последствиями",
                        "slug": "resheniia-s-posledstviiami",
                        "language": "rus",
                        "games_count": 6860,
                        "image_background": "https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg"
                    },
                    {
                        "id": 42490,
                        "name": "Приключенческий экшен",
                        "slug": "prikliuchencheskii-ekshen",
                        "language": "rus",
                        "games_count": 10889,
                        "image_background": "https://media.rawg.io/media/games/341/3413d7275fb1e919f00a925df8288b77.jpg"
                    },
                    {
                        "id": 145,
                        "name": "Choices Matter",
                        "slug": "choices-matter",
                        "language": "eng",
                        "games_count": 6648,
                        "image_background": "https://media.rawg.io/media/games/6e0/6e0c19bb111bd4fa20cf0eb72a049519.jpg"
                    },
                    {
                        "id": 42460,
                        "name": "Реализм",
                        "slug": "realizm",
                        "language": "rus",
                        "games_count": 7247,
                        "image_background": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
                    },
                    {
                        "id": 571,
                        "name": "3D",
                        "slug": "3d",
                        "language": "eng",
                        "games_count": 87867,
                        "image_background": "https://media.rawg.io/media/games/74c/74c68a8de3d4983ff932dd456ac2dc66.jpg"
                    },
                    {
                        "id": 77,
                        "name": "Realistic",
                        "slug": "realistic",
                        "language": "eng",
                        "games_count": 7268,
                        "image_background": "https://media.rawg.io/media/games/b34/b3419c2706f8f8dbe40d08e23642ad06.jpg"
                    },
                    {
                        "id": 89,
                        "name": "Historical",
                        "slug": "historical",
                        "language": "eng",
                        "games_count": 3545,
                        "image_background": "https://media.rawg.io/media/games/39a/39a8aa7798b685f9625e857bc394259d.jpg"
                    },
                    {
                        "id": 1465,
                        "name": "combat",
                        "slug": "combat",
                        "language": "eng",
                        "games_count": 13957,
                        "image_background": "https://media.rawg.io/media/games/615/61503312a95d451198d80d9bae275f79.jpg"
                    },
                    {
                        "id": 42391,
                        "name": "Средневековье",
                        "slug": "srednevekove",
                        "language": "rus",
                        "games_count": 4071,
                        "image_background": "https://media.rawg.io/media/games/59a/59a3ebcba3d08c51532c6ca877aff256.jpg"
                    },
                    {
                        "id": 66,
                        "name": "Medieval",
                        "slug": "medieval",
                        "language": "eng",
                        "games_count": 7131,
                        "image_background": "https://media.rawg.io/media/games/330/330952c1726bbb56fc3b9f8a8c83ab1d.jpg"
                    },
                    {
                        "id": 40937,
                        "name": "Steam Trading Cards",
                        "slug": "steam-trading-cards-2",
                        "language": "eng",
                        "games_count": 721,
                        "image_background": "https://media.rawg.io/media/games/e44/e445335e611b4ccf03af71fffcbd30a4.jpg"
                    },
                    {
                        "id": 58132,
                        "name": "Атмосферная",
                        "slug": "atmosfernaia",
                        "language": "rus",
                        "games_count": 11681,
                        "image_background": "https://media.rawg.io/media/games/ea6/ea6a1382b15d749e15fdfbf0aece7689.jpg"
                    },
                    {
                        "id": 58127,
                        "name": "Бой",
                        "slug": "boi-2",
                        "language": "rus",
                        "games_count": 8807,
                        "image_background": "https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg"
                    },
                    {
                        "id": 42566,
                        "name": "Альтернативная история",
                        "slug": "alternativnaia-istoriia",
                        "language": "rus",
                        "games_count": 1254,
                        "image_background": "https://media.rawg.io/media/games/9eb/9ebae11c9f394b12c24901c9afb867ce.jpg"
                    },
                    {
                        "id": 208,
                        "name": "Alternate History",
                        "slug": "alternate-history",
                        "language": "eng",
                        "games_count": 1953,
                        "image_background": "https://media.rawg.io/media/games/776/776e601c2c37f50bb11f9054f54c60da.jpg"
                    },
                    {
                        "id": 42507,
                        "name": "Сражения на мечах",
                        "slug": "srazheniia-na-mechakh",
                        "language": "rus",
                        "games_count": 851,
                        "image_background": "https://media.rawg.io/media/games/7d5/7d5bfa5864abe9ff41bf9e068ce6d51f.jpg"
                    },
                    {
                        "id": 42410,
                        "name": "LGBTQ+",
                        "slug": "lgbtq-2",
                        "language": "eng",
                        "games_count": 2215,
                        "image_background": "https://media.rawg.io/media/games/313/3137f0b7fb36b53e34abcde6e7607909.jpg"
                    },
                    {
                        "id": 287,
                        "name": "Political",
                        "slug": "political",
                        "language": "eng",
                        "games_count": 677,
                        "image_background": "https://media.rawg.io/media/games/312/3121ba5c3d5fbe8b747475099f3e63b8.jpg"
                    },
                    {
                        "id": 42559,
                        "name": "Политическая",
                        "slug": "politicheskaia",
                        "language": "rus",
                        "games_count": 529,
                        "image_background": "https://media.rawg.io/media/screenshots/f69/f690eafb7cbb29778d129aac3772d433.jpeg"
                    },
                    {
                        "id": 185,
                        "name": "Swordplay",
                        "slug": "swordplay",
                        "language": "eng",
                        "games_count": 822,
                        "image_background": "https://media.rawg.io/media/screenshots/d3e/d3ed3ab5f11f8f6294dd561c16dccdf8.jpg"
                    },
                    {
                        "id": 91686,
                        "name": "Family Sharing",
                        "slug": "family-sharing",
                        "language": "eng",
                        "games_count": 14739,
                        "image_background": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg"
                    },
                    {
                        "id": 66539,
                        "name": "Историческая",
                        "slug": "istoricheskaia",
                        "language": "rus",
                        "games_count": 1806,
                        "image_background": "https://media.rawg.io/media/games/9e2/9e27325d5144e9f6861fc6b6b8356665.jpg"
                    },
                    {
                        "id": 1500,
                        "name": "immersive",
                        "slug": "immersive",
                        "language": "eng",
                        "games_count": 1010,
                        "image_background": "https://media.rawg.io/media/games/8cb/8cbf9a1735ae48b70b9aba5f82ab56da.jpg"
                    },
                    {
                        "id": 59756,
                        "name": "ЛГБТК+",
                        "slug": "lgbtk",
                        "language": "rus",
                        "games_count": 1867,
                        "image_background": "https://media.rawg.io/media/screenshots/b97/b979891cc35388daee3baacee0e96324.jpg"
                    },
                    {
                        "id": 58140,
                        "name": "Иммерсивная игра",
                        "slug": "immersivnaia-igra",
                        "language": "rus",
                        "games_count": 337,
                        "image_background": "https://media.rawg.io/media/screenshots/9bf/9bfd312d33c00287db183cb199ce69d0.jpg"
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
                "reviews_count": 16,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/d84/d842fec4ae7bbd782d330f678c980f7f.jpg"
                    },
                    {
                        "id": 4152948,
                        "image": "https://media.rawg.io/media/screenshots/9a8/9a8ecc33989862e3be29132189c3f7f6.jpg"
                    },
                    {
                        "id": 4152949,
                        "image": "https://media.rawg.io/media/screenshots/741/741f7625ce8adfe138b43608f1e8e01c.jpg"
                    },
                    {
                        "id": 4152950,
                        "image": "https://media.rawg.io/media/screenshots/616/616c2a598520d24c1a56d8b1aa90217b.jpg"
                    },
                    {
                        "id": 4152951,
                        "image": "https://media.rawg.io/media/screenshots/cc5/cc5951ae93265c9a3ccd550ce58fbfa8.jpg"
                    },
                    {
                        "id": 4152952,
                        "image": "https://media.rawg.io/media/screenshots/0ce/0ce56603d0deb0f66f969ccdee51284b.jpg"
                    },
                    {
                        "id": 4152953,
                        "image": "https://media.rawg.io/media/screenshots/ab2/ab2e1086144e9722aba95d012aadcc66.jpg"
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
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
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
            },
            {
                "slug": "split-fiction",
                "name": "Split Fiction",
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
                    },
                    {
                        "store": {
                            "id": 3,
                            "name": "PlayStation Store",
                            "slug": "playstation-store"
                        }
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-03-06",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/02a/02ac22b3b90717dabaa535640c38534c.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 2,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 2,
                "reviews_text_count": 0,
                "added": 110,
                "added_by_status": {
                    "yet": 16,
                    "owned": 15,
                    "toplay": 79
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2024-12-20T11:01:45",
                "id": 994603,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 18,
                        "name": "Co-op",
                        "slug": "co-op",
                        "language": "eng",
                        "games_count": 12823,
                        "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
                    },
                    {
                        "id": 198,
                        "name": "Split Screen",
                        "slug": "split-screen",
                        "language": "eng",
                        "games_count": 7287,
                        "image_background": "https://media.rawg.io/media/games/12e/12ea6b35b65df38258e25885a0a392a6.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 2,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/02a/02ac22b3b90717dabaa535640c38534c.jpg"
                    },
                    {
                        "id": 4137937,
                        "image": "https://media.rawg.io/media/screenshots/dc1/dc10dd68a2e7472b7ed40feda3a16c54.jpg"
                    },
                    {
                        "id": 4137938,
                        "image": "https://media.rawg.io/media/screenshots/ea9/ea9e37dc1b36db3401a6b308d766198b.jpg"
                    },
                    {
                        "id": 4137939,
                        "image": "https://media.rawg.io/media/screenshots/e4b/e4bee3c261abe04f869b6f429852a00d.jpg"
                    },
                    {
                        "id": 4137940,
                        "image": "https://media.rawg.io/media/screenshots/395/395fdacce19c05718a7df69a227c8580.jpg"
                    },
                    {
                        "id": 4137941,
                        "image": "https://media.rawg.io/media/screenshots/640/640ae66a49a93b16ba5d2537e78b75c1.jpg"
                    },
                    {
                        "id": 4137942,
                        "image": "https://media.rawg.io/media/screenshots/f5a/f5a69af83f67e75cb404b2dd334e2197.jpg"
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
                        "id": 3,
                        "name": "Adventure",
                        "slug": "adventure"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    }
                ]
            },
            {
                "slug": "monster-hunter-wilds",
                "name": "Monster Hunter Wilds",
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
                "stores": null,
                "released": "2025-02-28",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/91b/91b4edd8fecf88b2b5ca0752321382ee.jpg",
                "rating": 0.0,
                "rating_top": 0,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 1,
                        "percent": 100.0
                    }
                ],
                "ratings_count": 1,
                "reviews_text_count": 0,
                "added": 77,
                "added_by_status": {
                    "yet": 7,
                    "owned": 13,
                    "beaten": 1,
                    "toplay": 53,
                    "dropped": 2,
                    "playing": 1
                },
                "metacritic": null,
                "suggestions_count": 0,
                "updated": "2024-12-16T18:37:16",
                "id": 973391,
                "score": null,
                "clip": null,
                "tags": [],
                "esrb_rating": {
                    "id": 6,
                    "name": "Rating Pending",
                    "slug": "rating-pending",
                    "name_en": "Rating Pending",
                    "name_ru": "Рейтинг обсуждается"
                },
                "user_game": null,
                "reviews_count": 1,
                "community_rating": 0,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/91b/91b4edd8fecf88b2b5ca0752321382ee.jpg"
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