// // require('dotenv').config({path: './env'})
// import dotenv from "dotenv";
// // import mongoose from "mongoose";
// // import {DB_NAME} from "./constants";
// // import express from "express";
// import dbConnection from "./db/index.js";

// dotenv.config({
//   path: "./env",
// });

// dbConnection()
//   .then(() => {
//     (process.env.PORT || 8000,
//       () => {
//         console.log(`Server is running is ${process.env.PORT}`);
//       });
//   })
//   .catch((err) => {
//     console.log(`Mongo db connection failed !!! ${err}`);
//   });

// // const app = express()

// // (async () => {
// //     try {
// //         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

// //         app.on("error", (error) => {
// //             console.log("ERR:", error);
// //             throw error
// //         })

// //         app.listen(process.env.PORT, () => {
// //             console.log(`App is listening on port ${process.env.PORT}`);

// //         })

// //     } catch (error) {
// //         console.log("Error", error);
// //         throw err
// //     }
// // })()


import dotenv from "dotenv";
import { app } from "./app.js"; 
import dbConnection from "./db/index.js";

dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo db connection failed !!! ${err}`);
  });