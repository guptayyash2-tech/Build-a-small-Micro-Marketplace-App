const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usermongo = require("../mongodb/Usermongo");


const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET not defined in .env");
    throw new Error("Server misconfiguration");
  }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = async (req,res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message:"All fields are required"});
    }

    const userExists = await Usermongo.findOne({ email });
    if (userExists) {
        return res.status(400).json({message:"User already exists"});
    }
        
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Usermongo.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({message:"Invalid user data"});
    }
};

const login = async (req,res) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message:"All fields are required"});
    }

    const user = await Usermongo.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({message:"Invalid email or password"});
    }   
};

const getProfile = async (req,res) => {
    const user = await Usermongo.findById(req.user.id);
    if (user) { 
        res.json({
           
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404).json({message:"User not found"});
    }  
}; 

module.exports = { register, login, getProfile};