import express from "express";
import bodyParser from "body-parser";
import {ObjectId} from "mongodb";
import {getDb, initDb} from "./modules/connectDB.js";

// Constants
const hostname = '0.0.0.0';
const port = 8080;

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// GET method route
app.get("/", function (req, res) {
  res.send("GET request to the homepage AJA ");
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

// GET method route
app.get("/secret", function (req, res, next) {
  res.send("Never be cruel, never be cowardly. And never eat pears!");
  console.log("This is a console.log message.");
});

// // Connected to mongodb server: via import db.js


// GET method route
// Retrieve all documents in collection

app.get("/all", async (req, res) => {
    
  try {
    const usersCollection = getDb().db("mock-collection").collection("users");
    const allUsers = await usersCollection.find({}).toArray();
    res.send(allUsers);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.send("could not find all users");
  }
});

// GET method route
//SELECCIONAR POR Query 
app.get ("/user", async (req, res) => {
    try {
        var query = req.query;

        const usersCollection = getDb().db("mock-collection").collection("users");
        const byQuery = await usersCollection.findOne(query);

        res.send(byQuery);
        console.log(query)   
    } catch (error) {
        console.error("No se pudo seleccionar: ", error.message);
    }
    
})
//Seleccionr por email
app.get("/email", async function (req, res) {
  
    var userEmail = req.query.email;

    const usersCollection = getDb().db("mock-collection").collection("users");
    await usersCollection.findOne(
        {email: userEmail},
        (err, data) => {
            if (data) {
                res.status(200).json({
                    text: "user found",
                    data: data
                });
            } else {
                res.status(404).json({
                    text: "user not found",
                    error: err
                });
            }
        });
    })


//Patch method
//Editar los parámetros de un usuario segun su ID (determinar el ID como Parámetro -> Path Variables -> id )(Definir nuevos valores en Body)

app.patch("/email", async (req, res) => {
  var newObject = req.body;
  const filter = { email: req.query.email };

  const usersCollection = getDb().db("mock-collection").collection("users");
  await usersCollection.updateOne(filter, { $set: newObject });

  await usersCollection.findOne(filter, (err, data) => {
    if (data) {
      res.status(200).json({
        text: "user UPDATED",
        data: data,
      });
    } else {
      res.status(404).json({
        text: "user not found",
        error: err,
      });
    }
  });
});


//PUT method
//utiliza email para editar un usuario o crear uno nuevo

app.put("/email", async (req, res) => {
  try {
    //identifica al usuario. Actualiza los campos, crea nuevos o crea un usuario nuevo
    const usersCollection = getDb().db("mock-collection").collection("users");
    const filter = {email: req.query.email};
    const options = { upsert: true };
    const updateDoc = { $set: req.body };

    const result = await usersCollection.updateOne(filter, updateDoc, options);
    console.log(filter);

    //Usuario nuevo:
    if (result.matchedCount === 0) {
      const nuevoID = result.upsertedId;
      const byID = await usersCollection.findOne({
        _id: ObjectId(nuevoID),
      });
      res.status(201).json({
        message: `Nuevo usuario registrado ${nuevoID}`,
        byID,
      });
    } else {
      //Usuario actualizado
      const byFilter = await usersCollection.findOne(filter);
      res.status(200).json({ message: "Usuario actualizado", byFilter });
    }
  } catch (error) {
    console.error("Falla en la matrix ", error.message);
  }
});

//AYUDA! PUT opción 2 : Si crea o actualiza los usuarios pero no carga else {} cuando un nuevo usuario es creado. Porque en ese punto el doc ya tiene datos. ¿Como arreglo?
app.put("/email2", async (req, res) => {
  try {
    //identifica al usuario. Actualiza los campos, crea nuevos o crea un usuario nuevo
    const usersCollection = getDb().db("mock-collection").collection("users");
    const filter = { email: req.query.email };
    const options = { upsert: true };
    const updateDoc = { $set: req.body };

   await usersCollection.updateOne(
        filter, updateDoc, options,
        (err, data) => {
            if (data.upsertedId === null) {
                 res.status(200).json({
                   text: "user updated",
                   data: data,
                 });
               //¿Qué otro método podría usar?
            } else  {
                res.status(204).json({
                  text: "new user created",
                  data: data,
                });    
            }
        })
        } catch (error) {
    console.error("Falla en la matrix ", error.message);
  }
});
    

   /* //Usuario nuevo:
    if (result.matchedCount === 0) {
      const nuevoID = result.upsertedId;
      const byID = await usersCollection.findOne({
        _id: ObjectId(nuevoID),
      });
      res.status(201).json({
        message: `Nuevo usuario registrado ${nuevoID}`,
        byID,
      });
    } else {
      //Usuario actualizado
      const byFilter = await usersCollection.findOne(filter);
      res.status(200).json({ message: "Usuario actualizado", byFilter });
    }
  } catch (error) {
    console.error("Falla en la matrix ", error.message);
  }
});


/* DELETE method. Modifying the message based on certain field(s).
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
app.delete("/email", async (req, res) => {

    const filter = { email: req.query.email };
    const usersCollection = getDb().db("mock-collection").collection("users");

  await usersCollection.findOne(filter, (err, data) => {
    if (data) {
            usersCollection.deleteOne(filter).then((data) => {
            res.status(200).json({
            text: "user DELETED successfully",
            data: data
        })
        });
    } else {
      res.status(404).json({
        text: "user not found",
        error: err,
      });
    }
  });
});


initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
    app.listen(port, hostname);
    console.log(`Running on http://${hostname}:${port}`);
    }
})


