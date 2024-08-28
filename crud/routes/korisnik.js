const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Korisnik } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwtSecret = 'a3c16e3b29a7e8c3d2f8b1c6f5d5c2a3e4a6d3b7e3b5c9f3b1e8c4f5a3b6d9f1';

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Create a new Korisnik
router.post("/", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const { ime, email, password, uloga } = req.body;
        if(ime.length<3 || !isValidEmail(email) || password.length<3 || uloga==null) {
            res.status(500).json({ error: "Greska", data: err });

        }
        const korisnik1 = await Korisnik.findOne({ where: { email } });
        console.log(korisnik1);
        if (korisnik1 !== null) {
            return res.status(404).json({ error: "Zauzet mejl" });
        }
        const korisnik = await Korisnik.create({ ime, email, password, uloga });
        return res.status(201).json(korisnik);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Provjera da li korisnik postoji u bazi
        const korisnik = await Korisnik.findOne({ where: { email } });
        if (!korisnik) {
            return res.status(404).json({ error: "Korisnik not found" });
        }
        
        // Provjera ispravnosti lozinke
        const isPasswordValid = (password === korisnik.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        
        // Generisanje JWT tokena
        const token = jwt.sign({ id: korisnik.id, uloga: korisnik.uloga }, jwtSecret, {
            expiresIn: '1h' // Token važi 1 sat
        });
      
        return res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
// Get all Korisnik entries
router.get("/", async (req, res) => {
    try {
        const korisnici = await Korisnik.findAll();
        return res.json(korisnici);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Korisnik by ID
router.get("/:id", async (req, res) => {
    try {
        const korisnik = await Korisnik.findByPk(req.params.id);
        if (!korisnik) {
            return res.status(404).json({ error: "Korisnik not found" });
        }
        return res.json(korisnik);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Korisnik by ID
router.put("/:id", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const { ime, email, password, uloga } = req.body;
        if(ime.length<3 || !isValidEmail(email) || password.length<3 || uloga==null) {
            res.status(500).json({ error: "Greska", data: err });

        }
        const [updated] = await Korisnik.update(
            { ime, email, password, uloga },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedKorisnik = await Korisnik.findByPk(req.params.id);
            return res.json(updatedKorisnik);
        }
        return res.status(404).json({ error: "Korisnik not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Korisnik by ID
router.delete("/:id", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const deleted = await Korisnik.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Korisnik not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
