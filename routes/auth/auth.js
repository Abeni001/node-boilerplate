import express from "express";
import { login, signup,profile,forgetPassword,resetPassword, logout } from "../../controllers/authController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { isValidToken } from "../../middlewares/validToken.js";
import { catchErrorHandler } from "../../middlewares/errorHandler.js";

const router = express.Router()

router.route('/signup').post(catchErrorHandler(signup));
router.route('/login').post(catchErrorHandler(login));
router.route('/logout').post(isValidToken,verifyToken,catchErrorHandler(logout));
router.route('/forget-password').post(catchErrorHandler(forgetPassword));
router.route('/reset-password').post(catchErrorHandler(resetPassword));
router.route('/profile').get(isValidToken,verifyToken,profile);

export default router