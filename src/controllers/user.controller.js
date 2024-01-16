import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async(req,res) =>{
    // console.log(123456)
    const { username, fullname, email, password} = req.body;
    // console.log(123456)
    try {
        const user_email = await User.findOne({ email });
        const user_name = await User.findOne({username});
        if (user_email) {
            return res.send({message: "Email already exists" });
        }
        if(user_name){
            return res.send({message: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        const saved_user = await User.findOne({ email: email });
        const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.EXPIRY_TIME }
        );
        return res.status(201).send({
            "message": "Registration Success",
            "token": token, 
        });
    }
    catch(err){
        return res.status(400).send(err)
    }
}

const userLogin = async(req,res) =>{
    const { email, password,username } = req.body;
    // console.log(email) 
    // console.log(password)
    try{
        const user = email ? await User.findOne({email}) : await User.findOne({username})
        // console.log(user)
        if(!user) return res.status(400).send({ message:"No account"})
        const isMatch=await  bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRY_TIME })
            return res.status(201).send({
                "message": "Login Success",
                "token": token })
        }
        if(username ) return res.status(400).json({
            "message": "username or Password is Incorrect"
        })
        return res.status(400).send({
            "message": "email or Password is Incorrect"
        })
    }
    catch(err){
        return res.status(400).send({ "message" : "invalid credential" })
    }
}

const getAllProduct = async(req,res) =>{
    const { userID } = req.authData
    // console.log(title)
    // console.log(userID)
    try {
        const product = await Product.find({})
        return res.status(201).send({ "products" : product})
    } catch (err) {
        return res.status(400).send("Unable to retrieve products")
    }
}

const cartItems = async(req,res) =>{
    const { userID } = req.authData
    try{ 
        const cartItems = await Note.find({createdBy: userID}).sort({date:1})
        return res.status(201).send({ "cartItems" : cartItems })
    }
    catch(err){
        return res.status(400).send({ "error" : "cannot retrive cartItems" })
    }
}
const AddProduct = async(req,res) =>{
    const { userID } = req.authData
    const {title ,price,description, discountPercentage} = req.body
    try{
        // console.log(req.file)
        const image = await uploadOnCloudinary(req.file?.path)
        const thumbnail = image.url
        const new_item = new Product({
            title,
            price,
            thumbnail,
            description,
            discountPercentage
        })
        await new_item.save();
        return res.status(201).send({ "message" : " Product Added succesfully" })
    }
    catch(err){
        return res.status(400).send({"error" : err});
    }
}

const addToCart = async(req,res) =>{
    const { userID } = req.authData
    const {name, price, thumbnail} = req.body
    try{
        const new_item = new Cart({
            name,
            price,
            thumbnail,
            addedBy: userID
        })
        await new_item.save();
        return res.status(201).send({ "message" : " added to cart" })
    }
    catch(err){
        return res.status(400).send({"error" : err});
    }
}

const deleteFromCart = async(req,res) =>{
    const { itemId } = req.params
    try{
        const deletedItem = await Note.findByIdAndDelete(itemId);
        return res.status(201).send({
            "message" : "Note deleted successfully",
        })
    }
    catch(err){
        return res.status(400).send({
            "error" : "Failed to Delete the note"
        });
    }
}

export {
    registerUser,
    userLogin,
    getAllProduct,
    cartItems,
    AddProduct,
    addToCart,
    deleteFromCart,
}