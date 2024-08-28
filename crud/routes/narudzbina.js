const express = require('express');
const router = express.Router();
const { Narudzbina, Korisnik, Knjiga, Dodatna_oprema } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Narudzbina
router.post("/", async (req, res) => {
    const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        var token = JSON.parse(atob(authHeader.split('.')[1]));
        if(token.uloga !=="Admin" && token.uloga !=="Moderator" && token.uloga!=="Korisnik"
        ) {
            return res.status(401).json({ error: "Unauthorized" });

        }
    try {
        const { korisnik_id, knjiga_id, dodatna_oprema_id } = req.body;
        const narudzbina = await Narudzbina.create({ korisnik_id, knjiga_id, dodatna_oprema_id });
        return res.status(201).json(narudzbina);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Narudzbina entries
router.get("/", async (req, res) => {
    try {
        const narudzbine = await Narudzbina.findAll({
            include: [Korisnik, Knjiga, Dodatna_oprema]
        });
        return res.json(narudzbine);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Narudzbina by ID
router.get("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id, {
            include: [Korisnik, Knjiga, Dodatna_oprema]
        });
        if (!narudzbina) {
            return res.status(404).json({ error: "Narudzbina not found" });
        }
        return res.json(narudzbina);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Narudzbina by ID
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
        const { korisnik_id, knjiga_id, dodatna_oprema_id } = req.body;
        const [updated] = await Narudzbina.update(
            { korisnik_id, knjiga_id, dodatna_oprema_id },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedNarudzbina = await Narudzbina.findByPk(req.params.id, {
                include: [Korisnik, Knjiga, Dodatna_oprema]
            });
            return res.json(updatedNarudzbina);
        }
        return res.status(404).json({ error: "Narudzbina not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Narudzbina by ID
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
        const deleted = await Narudzbina.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Narudzbina not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
