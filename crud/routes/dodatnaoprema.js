const express = require('express');
const router = express.Router();
const { Dodatna_oprema } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Dodatna_oprema
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
        const dodatna_oprema = await Dodatna_oprema.create({ naziv });
        return res.status(201).json(dodatna_oprema);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Dodatna_oprema entries
router.get("/", async (req, res) => {
    try {
        const dodatna_oprema = await Dodatna_oprema.findAll();
        return res.json(dodatna_oprema);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Dodatna_oprema by ID
router.get("/:id", async (req, res) => {
    try {
        const dodatna_oprema = await Dodatna_oprema.findByPk(req.params.id);
        if (!dodatna_oprema) {
            return res.status(404).json({ error: "Dodatna oprema not found" });
        }
        return res.json(dodatna_oprema);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Dodatna_oprema by ID
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
        const [updated] = await Dodatna_oprema.update({ naziv }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDodatna_oprema = await Dodatna_oprema.findByPk(req.params.id);
            return res.json(updatedDodatna_oprema);
        }
        return res.status(404).json({ error: "Dodatna oprema not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Dodatna_oprema by ID
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
        const deleted = await Dodatna_oprema.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Dodatna oprema not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
