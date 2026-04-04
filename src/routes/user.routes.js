import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router  = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avtar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 3
        }
    ]),
    registerUser
)
console.log("User routes loaded");

export default router;