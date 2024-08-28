const express = require('express');
const router = express.Router();
const { Izdavac } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Izdavac
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
        const izdavac = await Izdavac.create({ naziv });
        return res.status(201).json(izdavac);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Izdavac entries
router.get("/", async (req, res) => {
    try {
        const izdavci = await Izdavac.findAll();
        return res.json(izdavci);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Izdavac by ID
router.get("/:id", async (req, res) => {
    try {
        const izdavac = await Izdavac.findByPk(req.params.id);
        if (!izdavac) {
            return res.status(404).json({ error: "Izdavac not found" });
        }
        return res.json(izdavac);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update an Izdavac by ID
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
        const [updated] = await Izdavac.update({ naziv }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedIzdavac = await Izdavac.findByPk(req.params.id);
            return res.json(updatedIzdavac);
        }
        return res.status(404).json({ error: "Izdavac not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete an Izdavac by ID
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
        const deleted = await Izdavac.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Izdavac not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
