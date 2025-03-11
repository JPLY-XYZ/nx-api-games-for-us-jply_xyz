import { decryptJSON } from "@/lib/cryptoUtils";
import { images } from "../../../../../../next.config";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { setCache } from "@/lib/cacheUtils";

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

    // const results = await fetch(`https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
    // const data = await results.json();

    const data = {
        "count": 2316,
        "next": "https://api.rawg.io/api/games?dates=2025-01-01%2C2025-12-31&key=2c48&ordering=-added&page=2&page_size=5",
        "previous": null,
        "results": [
            {
                "slug": "vampire-the-masquerade-bloodlines-2",
                "name": "Vampire: The Masquerade - Bloodlines 2",
                "playtime": 329,
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
                            "id": 1,
                            "name": "Xbox One",
                            "slug": "xbox-one"
                        }
                    },
                    {
                        "platform": {
                            "id": 18,
                            "name": "PlayStation 4",
                            "slug": "playstation4"
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
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-06-30",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/fb5/fb5e0fdb1f6bb0e8b5da5d08bb83a5fc.jpg",
                "rating": 3.9,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 128,
                        "percent": 45.71
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 81,
                        "percent": 28.93
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 43,
                        "percent": 15.36
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 28,
                        "percent": 10.0
                    }
                ],
                "ratings_count": 271,
                "reviews_text_count": 8,
                "added": 2233,
                "added_by_status": {
                    "yet": 258,
                    "owned": 617,
                    "beaten": 11,
                    "toplay": 1313,
                    "dropped": 7,
                    "playing": 27
                },
                "metacritic": null,
                "suggestions_count": 552,
                "updated": "2025-02-20T13:26:12",
                "id": 303576,
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
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 35983,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 42400,
                        "name": "Атмосфера",
                        "slug": "atmosfera",
                        "language": "rus",
                        "games_count": 6083,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42401,
                        "name": "Отличный саундтрек",
                        "slug": "otlichnyi-saundtrek",
                        "language": "rus",
                        "games_count": 4644,
                        "image_background": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg"
                    },
                    {
                        "id": 42,
                        "name": "Great Soundtrack",
                        "slug": "great-soundtrack",
                        "language": "eng",
                        "games_count": 3420,
                        "image_background": "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg"
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
                        "id": 16,
                        "name": "Horror",
                        "slug": "horror",
                        "language": "eng",
                        "games_count": 46492,
                        "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
                    },
                    {
                        "id": 42491,
                        "name": "Мясо",
                        "slug": "miaso",
                        "language": "rus",
                        "games_count": 4962,
                        "image_background": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
                    },
                    {
                        "id": 26,
                        "name": "Gore",
                        "slug": "gore",
                        "language": "eng",
                        "games_count": 6103,
                        "image_background": "https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg"
                    },
                    {
                        "id": 42404,
                        "name": "Женщина-протагонист",
                        "slug": "zhenshchina-protagonist",
                        "language": "rus",
                        "games_count": 2413,
                        "image_background": "https://media.rawg.io/media/games/651/651ae84f2d5e36206aad90976a453329.jpg"
                    },
                    {
                        "id": 42402,
                        "name": "Насилие",
                        "slug": "nasilie",
                        "language": "rus",
                        "games_count": 6105,
                        "image_background": "https://media.rawg.io/media/games/5fa/5fae5fec3c943179e09da67a4427d68f.jpg"
                    },
                    {
                        "id": 34,
                        "name": "Violent",
                        "slug": "violent",
                        "language": "eng",
                        "games_count": 7143,
                        "image_background": "https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg"
                    },
                    {
                        "id": 42439,
                        "name": "Стелс",
                        "slug": "stels",
                        "language": "rus",
                        "games_count": 2493,
                        "image_background": "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg"
                    },
                    {
                        "id": 42477,
                        "name": "Мрачная",
                        "slug": "mrachnaia",
                        "language": "rus",
                        "games_count": 6498,
                        "image_background": "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg"
                    },
                    {
                        "id": 42406,
                        "name": "Нагота",
                        "slug": "nagota",
                        "language": "rus",
                        "games_count": 7039,
                        "image_background": "https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg"
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
                        "id": 42506,
                        "name": "Тёмное фэнтези",
                        "slug": "tiomnoe-fentezi",
                        "language": "rus",
                        "games_count": 3535,
                        "image_background": "https://media.rawg.io/media/games/dc0/dc0926d3f84ffbcc00968fe8a6f0aed3.jpg"
                    },
                    {
                        "id": 42577,
                        "name": "Кровь",
                        "slug": "krov",
                        "language": "rus",
                        "games_count": 490,
                        "image_background": "https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg"
                    },
                    {
                        "id": 300,
                        "name": "Vampire",
                        "slug": "vampire",
                        "language": "eng",
                        "games_count": 1677,
                        "image_background": "https://media.rawg.io/media/games/7bc/7bc71a03ca2351d7872ad37d29613718.jpg"
                    },
                    {
                        "id": 42676,
                        "name": "Вампиры",
                        "slug": "vampiry",
                        "language": "rus",
                        "games_count": 507,
                        "image_background": "https://media.rawg.io/media/games/818/8183a2e3f4d82cfb317acea22e865307.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 280,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/fb5/fb5e0fdb1f6bb0e8b5da5d08bb83a5fc.jpg"
                    },
                    {
                        "id": 1886815,
                        "image": "https://media.rawg.io/media/screenshots/831/8314575622c6ac8de538e890ec6a2aab.jpg"
                    },
                    {
                        "id": 1886816,
                        "image": "https://media.rawg.io/media/screenshots/eb7/eb7d75e25be2c76d6e1bd454f2071aad.jpg"
                    },
                    {
                        "id": 1886818,
                        "image": "https://media.rawg.io/media/screenshots/b71/b71ee1cd39f5e8685900b47980d715a1_I3dtqc6.jpg"
                    },
                    {
                        "id": 1886819,
                        "image": "https://media.rawg.io/media/screenshots/291/29185669bd2fdf8c0ec10fcf10da3063.jpg"
                    },
                    {
                        "id": 1886821,
                        "image": "https://media.rawg.io/media/screenshots/7ba/7ba2d1b2998ae2c76c3ef3509ea8e104.jpg"
                    },
                    {
                        "id": 1886823,
                        "image": "https://media.rawg.io/media/screenshots/234/234c1ba4292f69ffc3c988dab739fa91.jpg"
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
                "slug": "little-devil-inside",
                "name": "Little Devil Inside",
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
                "released": "2025-12-31",
                "tba": true,
                "background_image": "https://media.rawg.io/media/games/d70/d7068fe0a1ba9abb8532da30588e98eb.jpeg",
                "rating": 3.85,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 10,
                        "percent": 50.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 4,
                        "percent": 20.0
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 3,
                        "percent": 15.0
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 3,
                        "percent": 15.0
                    }
                ],
                "ratings_count": 20,
                "reviews_text_count": 0,
                "added": 610,
                "added_by_status": {
                    "yet": 77,
                    "owned": 84,
                    "beaten": 2,
                    "toplay": 444,
                    "dropped": 1,
                    "playing": 2
                },
                "metacritic": null,
                "suggestions_count": 365,
                "updated": "2025-02-13T09:41:52",
                "id": 43253,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 1,
                        "name": "Survival",
                        "slug": "survival",
                        "language": "eng",
                        "games_count": 9645,
                        "image_background": "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg"
                    },
                    {
                        "id": 37796,
                        "name": "exclusive",
                        "slug": "exclusive",
                        "language": "eng",
                        "games_count": 4491,
                        "image_background": "https://media.rawg.io/media/games/f24/f2493ea338fe7bd3c7d73750a85a0959.jpeg"
                    },
                    {
                        "id": 1863,
                        "name": "challenge",
                        "slug": "challenge",
                        "language": "eng",
                        "games_count": 12758,
                        "image_background": "https://media.rawg.io/media/games/eb1/eb1ff1ffdab179ff7f0987d0266d4fe5.jpg"
                    }
                ],
                "esrb_rating": {
                    "id": 1,
                    "name": "Everyone",
                    "slug": "everyone",
                    "name_en": "Everyone",
                    "name_ru": "Для всех"
                },
                "user_game": null,
                "reviews_count": 20,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/d70/d7068fe0a1ba9abb8532da30588e98eb.jpeg"
                    },
                    {
                        "id": 624546,
                        "image": "https://media.rawg.io/media/screenshots/e47/e4790abb668c975452af5e57f3d1ab9b_pVbQS2F.jpg"
                    },
                    {
                        "id": 624547,
                        "image": "https://media.rawg.io/media/screenshots/ade/ade68b627d5c80ff3c2d2ffee0c59879.jpg"
                    },
                    {
                        "id": 624548,
                        "image": "https://media.rawg.io/media/screenshots/7c1/7c1b3870b401cbac0463eccf171c306a_3sDsiWP.jpg"
                    },
                    {
                        "id": 624549,
                        "image": "https://media.rawg.io/media/screenshots/a95/a958849125bdb7d7aa04d1098e37cac3.jpg"
                    },
                    {
                        "id": 624550,
                        "image": "https://media.rawg.io/media/screenshots/10c/10c58cd83d36ec6c9e343643bcfa1850.jpg"
                    },
                    {
                        "id": 624551,
                        "image": "https://media.rawg.io/media/screenshots/2b0/2b075400a899f07000145f3e3005be94_yX0buKv.jpg"
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
                "slug": "replaced",
                "name": "Replaced",
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
                            "id": 1,
                            "name": "Xbox One",
                            "slug": "xbox-one"
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
                    },
                    {
                        "store": {
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-12-31",
                "tba": false,
                "background_image": "https://media.rawg.io/media/games/041/041e04184322bc859d617b790d8bfab9.jpg",
                "rating": 3.33,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 3,
                        "percent": 33.33
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 3,
                        "percent": 33.33
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 3,
                        "percent": 33.33
                    }
                ],
                "ratings_count": 9,
                "reviews_text_count": 0,
                "added": 509,
                "added_by_status": {
                    "yet": 72,
                    "owned": 63,
                    "toplay": 373,
                    "playing": 1
                },
                "metacritic": null,
                "suggestions_count": 226,
                "updated": "2025-01-27T17:52:48",
                "id": 616693,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 32,
                        "name": "Sci-fi",
                        "slug": "sci-fi",
                        "language": "eng",
                        "games_count": 20425,
                        "image_background": "https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f2.jpg"
                    },
                    {
                        "id": 122,
                        "name": "Pixel Graphics",
                        "slug": "pixel-graphics",
                        "language": "eng",
                        "games_count": 95946,
                        "image_background": "https://media.rawg.io/media/games/fae/faebf3c8cbf30db3f46bfbecf6ada3d6.jpg"
                    },
                    {
                        "id": 224,
                        "name": "1980s",
                        "slug": "1980s",
                        "language": "eng",
                        "games_count": 2890,
                        "image_background": "https://media.rawg.io/media/screenshots/230/230ce214ed287b628b5b5a59d5bd37b7.jpg"
                    },
                    {
                        "id": 11102,
                        "name": "retro-futuristic",
                        "slug": "retro-futuristic",
                        "language": "eng",
                        "games_count": 3,
                        "image_background": "https://media.rawg.io/media/screenshots/ca7/ca7c49fc5e7699d870058015f61ae4ee.jpg"
                    },
                    {
                        "id": 3521,
                        "name": "action-platformer",
                        "slug": "action-platformer",
                        "language": "eng",
                        "games_count": 56,
                        "image_background": "https://media.rawg.io/media/screenshots/f9f/f9fb7d027c9d3a30ef17f81564ba5599.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 9,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/041/041e04184322bc859d617b790d8bfab9.jpg"
                    },
                    {
                        "id": 2882413,
                        "image": "https://media.rawg.io/media/screenshots/6a6/6a6a3d193fac79cfc8093441f9ab28dd.jpg"
                    },
                    {
                        "id": 2882414,
                        "image": "https://media.rawg.io/media/screenshots/d9c/d9c3839d3992d0370ac4860a1a3da816.jpg"
                    },
                    {
                        "id": 2882415,
                        "image": "https://media.rawg.io/media/screenshots/806/806f480327cbda64fd668a22299450ea.jpg"
                    },
                    {
                        "id": 2882416,
                        "image": "https://media.rawg.io/media/screenshots/c0e/c0e109d1bf9d7f235ebdba3b65935834.jpg"
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
                        "id": 83,
                        "name": "Platformer",
                        "slug": "platformer"
                    },
                    {
                        "id": 4,
                        "name": "Action",
                        "slug": "action"
                    }
                ]
            },
            {
                "slug": "wolf-among-us-2",
                "name": "The Wolf Among Us 2",
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
                            "id": 1,
                            "name": "Xbox One",
                            "slug": "xbox-one"
                        }
                    },
                    {
                        "platform": {
                            "id": 18,
                            "name": "PlayStation 4",
                            "slug": "playstation4"
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
                            "id": 11,
                            "name": "Epic Games",
                            "slug": "epic-games"
                        }
                    }
                ],
                "released": "2025-12-31",
                "tba": true,
                "background_image": "https://media.rawg.io/media/games/845/84539f8f33fea2c753cca0ce3a6d168f.jpg",
                "rating": 3.91,
                "rating_top": 4,
                "ratings": [
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 8,
                        "percent": 72.73
                    },
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 2,
                        "percent": 18.18
                    },
                    {
                        "id": 1,
                        "title": "skip",
                        "count": 1,
                        "percent": 9.09
                    }
                ],
                "ratings_count": 11,
                "reviews_text_count": 0,
                "added": 485,
                "added_by_status": {
                    "yet": 65,
                    "owned": 58,
                    "beaten": 6,
                    "toplay": 352,
                    "dropped": 1,
                    "playing": 3
                },
                "metacritic": null,
                "suggestions_count": 355,
                "updated": "2025-01-27T17:54:06",
                "id": 51432,
                "score": null,
                "clip": null,
                "tags": [
                    {
                        "id": 13,
                        "name": "Atmospheric",
                        "slug": "atmospheric",
                        "language": "eng",
                        "games_count": 35983,
                        "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
                    },
                    {
                        "id": 64,
                        "name": "Fantasy",
                        "slug": "fantasy",
                        "language": "eng",
                        "games_count": 30049,
                        "image_background": "https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg"
                    },
                    {
                        "id": 34,
                        "name": "Violent",
                        "slug": "violent",
                        "language": "eng",
                        "games_count": 7143,
                        "image_background": "https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg"
                    },
                    {
                        "id": 41,
                        "name": "Dark",
                        "slug": "dark",
                        "language": "eng",
                        "games_count": 17027,
                        "image_background": "https://media.rawg.io/media/games/be0/be01c3d7d8795a45615da139322ca080.jpg"
                    },
                    {
                        "id": 44,
                        "name": "Nudity",
                        "slug": "nudity",
                        "language": "eng",
                        "games_count": 7432,
                        "image_background": "https://media.rawg.io/media/games/5bf/5bf88a28de96321c86561a65ee48e6c2.jpg"
                    },
                    {
                        "id": 117,
                        "name": "Mystery",
                        "slug": "mystery",
                        "language": "eng",
                        "games_count": 14764,
                        "image_background": "https://media.rawg.io/media/games/baf/baf9905270314e07e6850cffdb51df41.jpg"
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
                        "id": 192,
                        "name": "Mature",
                        "slug": "mature",
                        "language": "eng",
                        "games_count": 3827,
                        "image_background": "https://media.rawg.io/media/games/13a/13a528ac9cf48bbb6be5d35fe029336d.jpg"
                    },
                    {
                        "id": 110,
                        "name": "Cinematic",
                        "slug": "cinematic",
                        "language": "eng",
                        "games_count": 2696,
                        "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
                    },
                    {
                        "id": 406,
                        "name": "Story",
                        "slug": "story",
                        "language": "eng",
                        "games_count": 11480,
                        "image_background": "https://media.rawg.io/media/games/6ac/6ac602e70c837ababdf025e997391d9c.jpg"
                    },
                    {
                        "id": 142,
                        "name": "Detective",
                        "slug": "detective",
                        "language": "eng",
                        "games_count": 3619,
                        "image_background": "https://media.rawg.io/media/games/b2c/b2c9c6115114c8f7d461b5430e8a7d4a.jpg"
                    },
                    {
                        "id": 232,
                        "name": "Episodic",
                        "slug": "episodic",
                        "language": "eng",
                        "games_count": 495,
                        "image_background": "https://media.rawg.io/media/games/6c1/6c1eecf30e3c34e79bbf86698b1e6515.jpg"
                    },
                    {
                        "id": 268,
                        "name": "Comic Book",
                        "slug": "comic-book",
                        "language": "eng",
                        "games_count": 1703,
                        "image_background": "https://media.rawg.io/media/games/39a/39a8aa7798b685f9625e857bc394259d.jpg"
                    },
                    {
                        "id": 222,
                        "name": "Choose Your Own Adventure",
                        "slug": "choose-your-own-adventure",
                        "language": "eng",
                        "games_count": 4152,
                        "image_background": "https://media.rawg.io/media/games/264/2642b17a7885f7abc4fd018e98943242.jpg"
                    },
                    {
                        "id": 269,
                        "name": "Quick-Time Events",
                        "slug": "quick-time-events",
                        "language": "eng",
                        "games_count": 736,
                        "image_background": "https://media.rawg.io/media/screenshots/e0e/e0ef96a0639af3735cb4d26160e82c16.jpg"
                    },
                    {
                        "id": 289,
                        "name": "Noir",
                        "slug": "noir",
                        "language": "eng",
                        "games_count": 1476,
                        "image_background": "https://media.rawg.io/media/screenshots/a1e/a1e4ac4a6250cd633e760a10de4bde19.jpg"
                    },
                    {
                        "id": 2118,
                        "name": "snow",
                        "slug": "snow",
                        "language": "eng",
                        "games_count": 1250,
                        "image_background": "https://media.rawg.io/media/screenshots/e9f/e9fec9933b304cfd718c4c5b391b2b12.jpg"
                    },
                    {
                        "id": 944,
                        "name": "wolf",
                        "slug": "wolf",
                        "language": "eng",
                        "games_count": 799,
                        "image_background": "https://media.rawg.io/media/screenshots/834/83445fdb945919263ebd2108501a16d9.jpg"
                    }
                ],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 11,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/845/84539f8f33fea2c753cca0ce3a6d168f.jpg"
                    },
                    {
                        "id": 3230873,
                        "image": "https://media.rawg.io/media/screenshots/d9b/d9b0c27189aa9f3a367ab65e024a2aa5.jpg"
                    },
                    {
                        "id": 3230874,
                        "image": "https://media.rawg.io/media/screenshots/f93/f93fddd694303371b91cffe9f5b81a9e.jpg"
                    },
                    {
                        "id": 3230875,
                        "image": "https://media.rawg.io/media/screenshots/fa7/fa7b9921b9ee0b63b2dffbd09800f224_BuVybP8.jpg"
                    },
                    {
                        "id": 3230876,
                        "image": "https://media.rawg.io/media/screenshots/794/7946c24373ec39f1e790a4c5a057dab0.jpg"
                    },
                    {
                        "id": 3236120,
                        "image": "https://media.rawg.io/media/screenshots/e68/e68124234562545bb5c1e374b1f2b3f3.jpg"
                    },
                    {
                        "id": 3236121,
                        "image": "https://media.rawg.io/media/screenshots/147/1470c1a82580cf1176a935ceb6317743.jpg"
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
                    }
                ]
            },
            {
                "slug": "death-stranding-2",
                "name": "Death Stranding 2: On The Beach",
                "playtime": 0,
                "platforms": [
                    {
                        "platform": {
                            "id": 187,
                            "name": "PlayStation 5",
                            "slug": "playstation5"
                        }
                    }
                ],
                "stores": null,
                "released": "2025-12-31",
                "tba": true,
                "background_image": "https://media.rawg.io/media/games/b85/b85bc300d42588af66fb516b7563f74f.jpg",
                "rating": 4.3,
                "rating_top": 5,
                "ratings": [
                    {
                        "id": 5,
                        "title": "exceptional",
                        "count": 6,
                        "percent": 60.0
                    },
                    {
                        "id": 3,
                        "title": "meh",
                        "count": 3,
                        "percent": 30.0
                    },
                    {
                        "id": 4,
                        "title": "recommended",
                        "count": 1,
                        "percent": 10.0
                    }
                ],
                "ratings_count": 9,
                "reviews_text_count": 0,
                "added": 345,
                "added_by_status": {
                    "yet": 50,
                    "owned": 35,
                    "beaten": 1,
                    "toplay": 258,
                    "playing": 1
                },
                "metacritic": null,
                "suggestions_count": 376,
                "updated": "2024-11-04T14:07:09",
                "id": 891532,
                "score": null,
                "clip": null,
                "tags": [],
                "esrb_rating": null,
                "user_game": null,
                "reviews_count": 10,
                "saturated_color": "0f0f0f",
                "dominant_color": "0f0f0f",
                "short_screenshots": [
                    {
                        "id": -1,
                        "image": "https://media.rawg.io/media/games/b85/b85bc300d42588af66fb516b7563f74f.jpg"
                    },
                    {
                        "id": 3683287,
                        "image": "https://media.rawg.io/media/screenshots/7a9/7a97a649fde5f258651ae5e69abf0ed0.jpg"
                    },
                    {
                        "id": 3683289,
                        "image": "https://media.rawg.io/media/screenshots/372/372b0916c1ce240a4406373c120abd8f.jpg"
                    },
                    {
                        "id": 3683292,
                        "image": "https://media.rawg.io/media/screenshots/9c4/9c4d0e73de232433f8b977c39ca65d45.jpg"
                    },
                    {
                        "id": 3683296,
                        "image": "https://media.rawg.io/media/screenshots/a25/a25a14bc153866bd1dc9f776426c7b5b.jpg"
                    },
                    {
                        "id": 3683300,
                        "image": "https://media.rawg.io/media/screenshots/8a8/8a87fa3c9a671416715d9ba29789cd7f.jpg"
                    },
                    {
                        "id": 3683301,
                        "image": "https://media.rawg.io/media/screenshots/901/901efd17e514cede763eeb9837a80614.jpg"
                    }
                ],
                "parent_platforms": [
                    {
                        "platform": {
                            "id": 2,
                            "name": "PlayStation",
                            "slug": "playstation"
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

        const results = await fetch(`https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-added&page_size=5&key=${process.env.RAWG_API_KEY}`);
        const data = await results.json();
    
       
    

   
    
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