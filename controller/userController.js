const User = require("../model/userModel");
const bcrypt = require('bcrypt')
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const userschema = require("../middleware/joiValidation");

const login = async function (req, res) {
    try {
    let { email, password } = req.body;
    const signIn = await User.findOne({
            where: {
                email: email
            }, raw: true

        })
        if (signIn) {
            let comparePassword = await bcrypt.compare(password, signIn.password)
            if (comparePassword) {

                let encrptData = {
                    id: signIn.id,
                    name: signIn.username,
                    role:signIn.role
                    
                }

                console.log("co",encrptData,signIn)

                let responseToken = jwt.sign(encrptData, process.env.JWT_SECRET, { expiresIn: "1d" })

                res.status(200).json({ status: 200, message: 'Login Sucess', data: signIn, responseToken });
            }
            else {
                res.status(400).json({ status: 400, message: 'invalid credentials', data: {} });
            }
        }
        else {
            res.status(500).json({ status: 400, message: 'Data is not found', data: {} });
        }
    } catch (error) {
        console.error('Data not found:', error);
        res.status(500).json({ error: 'Data not found' });
    }
}

const signUp = async function (req, res) {
    try {
        console.log("ewfwef")
       let params = req.body;
       let joiValidation = userschema.validate(params)
        createdAt = new Date()
        const checkEmail = await User.findOne({
            where: {
                email:req.body.email
                
            }, raw: true
        })
        if (checkEmail) {
           return res.status(200).json({ message:"email already exist" });
        }
       
        hashedpassword = await bcrypt.hashSync(req.body.password, 10) //encryption
        params.password = hashedpassword

        const createUser = await User.create(params).catch((E) => console.log("err", E));
        res.status(201).json(createUser);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ status: 500, message: 'Could not create user', error: error });
    }
}
const getAllUsers = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await User.findAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit)
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };

module.exports = {login,signUp,getAllUsers}