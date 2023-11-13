# Bootcamp

El folder "Docker-Compose-Intro" contiene todos los archivos a evaular.

## 1) Instalar IDE: 
Trabajé en VS Code haciendo pruebas en Postman.
## 2) Perfil de GitHub: ceciidom/
## 3) Desplegar base de datos de MongoDB en un container Docker 
Utilicé el método Docker Compose up.
## 4) API sencilla
 "server.js" 
  ### a) Se conecta a un Mongo. 
  En server.js importé un módulo local (/modules/connectDB.js) donde establecí conexión con mi cluster de mongoDB. Exporté las funciones initDB(), que conecta al puerto una vez que se haya establecido la conexión con el mongo, y getDB() que conecta con mi cluster 0 donde está la db "mock-collection" y la colección "users". </br> 
NOTA: Aunque el contenedor Docker sí genera un Bridge entre mi app y una base de datos de mango, no uso los datos de esa base. Los datos vienen de mi Cluster en MongoDB, no del mongo dockerizado (creo). Lo que pasa es que primero conecté mi app a mi mongo y lo hice funcionar y después me peleé con Docker compose. Logré dockerizar la app y el mongo sample, pero este último solo está de adorno. 
### b) GET/all
### c) GET/user: 
Se puede usar cualquier parámetro para seleccionar a un usuario. Muestra el documento y un mensaje (user found/ user not found).
#### GET/email: selecciona a un usuario unicamente considerando el Email.
### d) PATCH/email: 
Edita cualquier valor de un usuario cuando se especifica el correo.
#### PUT/email: 
Edita al usuario o crea uno nuevo. Utiliza el email para seleccionar. Mensajes posibles: "Nuevo usuario registrado" o "usuario actualizado". 
### e) DELETE/email: 
Elimina a un usuario cuando se especifica su email. Mensajes disponibes "usuario eliminado" y "no se encontró al usuario".
## 5) Dockerizar la API 
Mediante docker-compose.
## 6) Subir a GitHub
Trabajé en local sobre la rama Actividad. Hice push a origin. Hice pull de origin main para incluir el Readme file y despues hice rebase con activity para juntar ambos y push otra vez.
</br>
</br>


