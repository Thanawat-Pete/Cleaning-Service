const bcrypt = require('bcrypt');
const UserModel = require('../Models/user.js');
const Type = require('../Models/type.js');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
const secret = process.env.SECRET;

exports.registerUser = async (req, res) => {
    try {
        const { username, password, name, telephone, email, address } = req.body;
        if(!username || !password || !name || !telephone || !email || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const existingName = await UserModel.findOne({ name });
        if (existingName) {
            return res.status(409).json({ message: 'Name already exists' });
        }
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const existingTelephone = await UserModel.findOne({ telephone });
        if (existingTelephone) {
            return res.status(409).json({ message: 'Telephone already exists' });
        }
        const userRole = await Type.findOne({ name: 'user' });
        if (!userRole) {
            return res.status(500).json({ message: 'User role not found' });
        }
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await UserModel.create({ username, password: hashedPassword, name, telephone, email, address, type: userRole._id });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username or email and password are required' });
    }
    try {
        const userDoc = await UserModel.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        }).populate('type');
        if (!userDoc) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const isPasswordMatch = bcrypt.compareSync(
            password,
            userDoc.password
        );
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password!' });
        }
        jwt.sign(
            { username: userDoc.username, id: userDoc._id },
            secret,
            {},
            (err, token) => {
                if (err) { return res.status(500).json({ message: 'Internal server error: Authentication failed!' });}
                res.json({
                    message: 'Login successful',
                    id: userDoc._id,
                    user: userDoc.username,
                    type: userDoc.type.name,
                    accessToken: token
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Error processing request'
        });
    }
};
