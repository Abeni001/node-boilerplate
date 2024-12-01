import express from "express";
import { login, signup } from "../../controllers/authController.js";

const router = express.Router()

router.route('/singup').get(signup);
// router.route('/singup').post(login);

export default router