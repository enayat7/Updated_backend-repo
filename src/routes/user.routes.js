import { Router } from "express"
import registrationValidate from "../middlewares/registerErrHandle.middleware.js";
import { AddProduct, registerUser } from "../controllers/user.controller.js";
import loginValidate from "../middlewares/loginErrHandle.middleware.js";
import { userLogin } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middlware.js";
import { getAllProduct } from "../controllers/user.controller.js";
import { cartItems } from "../controllers/user.controller.js";
import { addToCart } from "../controllers/user.controller.js";
import { deleteFromCart } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registrationValidate,registerUser)
router.route("/login").post(loginValidate,userLogin)
router.route("/allproduct").get(verifyToken,getAllProduct)
router.route("/addproduct").post(verifyToken,upload.single('thumbnail'),AddProduct)
router.route("/cartitems").get(verifyToken,cartItems)
router.route("/addtocart").post(verifyToken,addToCart)
router.route("/deleteitem/:itemId").delete(verifyToken,deleteFromCart)

export default router

