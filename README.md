# ProyectoSocialMongo

Este proyecto es una aplicación de red social básica construida con Node.js y Express. Incluye funcionalidades como autenticación de usuarios, creación y gestión de posts, así como la posibilidad de agregar comentarios y likes a los posts.

## Características

- Registro e inicio de sesión de usuarios.
- Creación, actualización, eliminación y obtención de posts.
- Agregar y eliminar comentarios en los posts.
- Agregar y quitar 'likes' de los posts.
- Middleware de autenticación con JWT.
- Validación de entradas.

## Tecnologías Utilizadas

[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-latest-blue)](https://mongoosejs.com/)
[![Express](https://img.shields.io/badge/Express-4.17.1-lightgrey)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-14.17.6-brightgreen)](https://nodejs.org/)

- JSON Web Token (JWT) para la autenticación
- bcrypt para el hash de contraseñas

## Configuración del Proyecto

### Requisitos Previos

- Node.js
- npm
- MongoDB

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/danirus6/ProyectoSocialMongo/
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd proyectosocialmongo
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:
   ```
   PORT=3000
   MONGODB_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_clave_secreta_jwt
   ```

### Ejecución

Para iniciar el servidor, ejecuta:

```bash
npm start
```

## Uso

Puedes probar los endpoints utilizando Postman o cualquier otro cliente HTTP.

### Endpoints de Usuario (`userRoutes.js`)

- `POST /users/register`: Registrar un nuevo usuario.
- `POST /users/login`: Iniciar sesión como usuario.
- `GET /users/me`: Obtener información del usuario (requiere autenticación).
- `POST /users/logout`: Cerrar sesión (requiere autenticación).

### Endpoints de Posts (`postRoutes.js`)

- `POST /posts`: Crear un nuevo post (requiere autenticación).
- `PUT /posts/:postId`: Actualizar un post (requiere autenticación).
- `DELETE /posts/:postId`: Eliminar un post (requiere autenticación).
- `GET /posts`: Obtener todos los posts.Soporta paginación con parámetros `page` y `limit`. Por ejemplo: `/posts?page=2&limit=10`.
- `GET /posts/search/:name`: Buscar posts por nombre.
- `GET /posts/:postId`: Obtener un post por ID.
- `POST /posts/like/:postId`: Dar 'like' a un post (requiere autenticación).
- `POST /posts/unlike/:postId`: Quitar 'like' de un post (requiere autenticación).

### Endpoints de Comentarios (`commentRoutes.js`)

- `POST /posts/:postId/comments`: Agregar un comentario a un post (requiere autenticación).
- `PUT /comments/:commentId`: Actualizar un comentario (requiere autenticación).
- `DELETE /comments/:commentId`: Eliminar un comentario (requiere autenticación).
