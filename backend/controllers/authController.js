//import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid Password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user })
}

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await user.save();

        // Générer un token JWT directement après l'inscription
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        res.status(201).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export {login,register, verify}