const express = require('express');
const router = express.Router();
const { Zanr } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Zanr
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
        const zanr = await Zanr.create({ naziv });
        return res.status(201).json(zanr);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Zanr entries
router.get("/", async (req, res) => {
    try {
        const zanrovi = await Zanr.findAll();
        return res.json(zanrovi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Zanr by ID
router.get("/:id", async (req, res) => {
    try {
        const zanr = await Zanr.findByPk(req.params.id);
        if (!zanr) {
            return res.status(404).json({ error: "Zanr not found" });
        }
        return res.json(zanr);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Zanr by ID
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
        const [updated] = await Zanr.update(
            { naziv },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedZanr = await Zanr.findByPk(req.params.id);
            return res.json(updatedZanr);
        }
        return res.status(404).json({ error: "Zanr not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Zanr by ID
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
        const deleted = await Zanr.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Zanr not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
