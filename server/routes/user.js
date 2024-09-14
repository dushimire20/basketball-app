import express from 'express';
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
const router = express.Router();
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";


router.post('/signup', async (req, res) => {
    const { lastName, firstName, phoneNumber, email, password } = req.body;
    const user =  await User.findOne({email})
    if(user) {
        return res.status(400).json({message: "User already exists"})
    }
    
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        lastName,
        firstName,
        phoneNumber,
        email,
        password: hashpassword,
           
    })

    await newUser.save()
    return res.json({status: true, message: "Record registered"})
    
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const  user = await User.findOne({email}) 
    if(!user)  {
        return res.status(400).json({message: "User not found"});
    } 

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return res.status(400).json({message: "Invalid password"})
    }
    
    const token = jwt.sign({email: user.email}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly:true, maxAge:360000})
    return res.json({status: true, message: "Login successful"})
    
    
});

router.post('/forgotPassword', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: "User not found"})
            }
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'youremail@gmail.com',
                  pass: 'yourpassword'
                }
              });
              
              var mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@yahoo.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

        
    } catch (error) {
        console.log(error)        
    }

})

export {router as UserRouter}
