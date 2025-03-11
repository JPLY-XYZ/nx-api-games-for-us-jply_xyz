# API de Autenticación y Juegos

Esta API es utilizada por una web cliente desarrollada en **React con Vite**. La API está construida con **Next.js** y proporciona diversos endpoints para la autenticación de usuarios, gestión de juegos y almacenamiento en caché mediante **MongoDB**.

## Tecnologías Utilizadas

- **Next.js** - Framework para la creación de aplicaciones en Node.js
- **MongoDB** - Base de datos NoSQL utilizada para almacenamiento y caché
- **bcrypt** - Para el hashing de contraseñas
- **crypto** - Librería de Node.js para cifrado personalizado



---

## Endpoints Disponibles

### Autenticación (`/api/auth`)

- **POST /register**: Registra un nuevo usuario y genera un token de autenticación.
- **POST /login**: Inicia sesión y genera un token de autenticación.
- **POST /config/fullName**: Permite modificacion del nombre completo del usuario.
- **POST /config/mail:** Permite modificacion delcorreo del usuario.
- **POST /config/nickName**: Permite modificacion del apodo del usuario.
- **POST /config/passwd**:  Permite modificacion de la contraseña del usuario.
- **POST /**: Verifica el token de sesion.

### Juegos (`/api/games`)

- **POST /favorites**: Obtiene la lista de juegos favoritos del usuario.
- **POST  /moreInfo**: Es usado para la sincronizacion de juegos de un usuario y su steamId64.
- **POST /saved**: Obtiene los juegos guardados por el usuario.
- **GET /search**: Busca juegos en la base de datos.
- **POST /search**: Busca juegos en la base de datos de un usuario.
- **GET /top5/anio**: Obtiene el top 5 de juegos del año.
- **POST /top5/anio**: Guarda el top 5 de juegos del año del usuario.
- **GET /top5/mes**: Obtiene el top 5 de juegos del mes.
- **POST /top5/mes**: Guarda el top 5 de juegos del mes del usuario.
- **GET /top5/semana**: Obtiene el top 5 de juegos de la semana.
- **POST /top5/semana**: Guarda el top 5 de juegos de la semana del usuario.

---

## Seguridad y Cifrado

La API implementa diversas funciones de seguridad:

- **Hashing de contraseñas con bcrypt**: Para almacenar de forma segura las contraseñas.
- **Cifrado de datos sensibles**: Mediante la librería `crypto` de Node.js.
- **Funciones de cifrado personalizadas**: Para mejorar la protección de la información enviada entre cliente y la api.

### Ejemplo de Cifrado

```js
const encryptedData = encryptJSON({ key: "value" });
const decryptedData = decryptJSON(encryptedData.encryptedData, encryptedData.iv, key);
```

---

## Caché en MongoDB

Se utilizan funciones para almacenar y recuperar datos en caché desde MongoDB, mejorando el rendimiento de la API.

- **`setCache(data)`**: Almacena juegos en caché si no existen previamente.
- **`findCache(name, limit)`**: Busca juegos en caché utilizando expresiones regulares.

### Ejemplo de Uso

```js
await setCache([{ id: 1, name: "Juego 1" }]);
const results = await findCache("Juego", 5);
console.log(results);
```

---

## Instalación y Ejecución en Local

Para clonar el repositorio, instalar dependencias y ejecutar la API en local, sigue estos pasos:

```bash
# Clonar el repositorio
git clone https://github.com/JPLY-XYZ/nx-api-games-for-us-jply_xyz

# Acceder al directorio del proyecto
cd tu-repo

# Instalar dependencias
npm install

# Crear un archivo .env con las variables necesarias
cp .env.example .env

# Ejecutar el servidor en desarrollo
npm run dev
```


### Licencia

Este código está sujeto a la licencia **Atribución/Reconocimiento-NoComercial 4.0 Internacional**. Si copias o utilizas parte del código, debes dar crédito al autor original y no puedes usarlo con fines comerciales.


