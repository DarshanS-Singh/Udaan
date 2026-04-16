const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const db = require('../drizzle');
const { users } = require('../models/schema');
const { eq } = require('drizzle-orm');

const auth = express();
require('dotenv').config();

auth.use(express.json());
auth.use(cookieParser());
auth.use(cors({
    origin: "http://localhost:4500", // Frontend origin
    credentials: true 
}));

// POST /register
auth.post('/register', async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "Name, username, and password are required" });
        }

        const existing = await db.select().from(users).where(eq(users.username, username));
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [newUser] = await db.insert(users).values({
            name,
            username,
            password: hashedPassword,
            role: role || 'user'
        }).returning();

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax", // Or None if cross-origin, but given both are local it's fine
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, name: newUser.name, username: newUser.username, role: newUser.role } });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// POST /login
auth.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        const foundUsers = await db.select().from(users).where(eq(users.username, username));
        if (foundUsers.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = foundUsers[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, username: user.username, role: user.role } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// GET / (Check auth status)
auth.get('/', async (req, res) => {
    try {
        const token = req.cookies.jwt; 
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const foundUsers = await db.select().from(users).where(eq(users.id, decoded.id));
        if (foundUsers.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = foundUsers[0];
        // Remove password from response
        const { password, ...safeUser } = user;
        
        res.status(200).json({ user: safeUser });
    } catch (error) {
        console.error("Auth check Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// GET /logout
auth.get('/logout', (req, res) => {
    res.clearCookie('jwt', { sameSite: "Lax", secure: false });
    res.json({ message: "Logged out" });
});

// GET /allUsers
auth.get('/allUsers', async (req, res) => {
    try {
        const allUsers = await db.select().from(users);
        res.status(200).json({ users: allUsers.map(u => { const { password, ...rest } = u; return rest; }) });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = auth;
