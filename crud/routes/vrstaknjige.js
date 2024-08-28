const express = require('express');
const router = express.Router();
const { Vrsta_knjige } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Vrsta_knjige
router.post("/", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin" && token.uloga !=="Moderator"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const { naziv } = req.body;
        if(naziv.length < 3) {
            return res.status(500).json({ error: "Greska", data: err });
        }
        const vrstaKnjige = await Vrsta_knjige.create({ naziv });
        return res.status(201).json(vrstaKnjige);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Vrsta_knjige entries
router.get("/", async (req, res) => {
    try {
        const vrsteKnjige = await Vrsta_knjige.findAll();
        return res.json(vrsteKnjige);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Vrsta_knjige by ID
router.get("/:id", async (req, res) => {
    try {
        const vrstaKnjige = await Vrsta_knjige.findByPk(req.params.id);
        if (!vrstaKnjige) {
            return res.status(404).json({ error: "Vrsta_knjige not found" });
        }
        return res.json(vrstaKnjige);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Vrsta_knjige by ID
router.put("/:id", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin" && token.uloga !=="Moderator"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const { naziv } = req.body;
        if(naziv.length < 3) {
            return res.status(500).json({ error: "Greska", data: err });
        }
        const [updated] = await Vrsta_knjige.update(
            { naziv },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedVrstaKnjige = await Vrsta_knjige.findByPk(req.params.id);
            return res.json(updatedVrstaKnjige);
        }
        return res.status(404).json({ error: "Vrsta_knjige not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Vrsta_knjige by ID
router.delete("/:id", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin" && token.uloga !=="Moderator"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const deleted = await Vrsta_knjige.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Vrsta_knjige not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
