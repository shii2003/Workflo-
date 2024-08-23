import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();
        req.session.userId = user._id;
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server errror ${err.message}`)
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'email is not registered' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'wrong password' });
        }

        req.session.userId = user._id;
        res.status(200).json({ msg: 'Logged in successfully' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send(`Server error ${err.message}`)
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Unable to logout' });
        }
        res.cleanCookie('connect.sid');
        res.status(200).json({ msg: 'Logged out successfully' })
    })
}