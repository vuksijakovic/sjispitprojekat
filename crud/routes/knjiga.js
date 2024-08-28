const express = require('express');
const router = express.Router();
const { Knjiga, Autor, Zanr, Izdavac, Vrsta_knjige } = require('../models'); // Adjust the path if necessary
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Create a new Knjiga
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
        const { naziv, cijena, autor_id, zanr_id, izdavac_id, vrsta_knjige_id } = req.body;
        const knjiga = await Knjiga.create({ naziv, cijena, autor_id, zanr_id, izdavac_id, vrsta_knjige_id });
        return res.status(201).json(knjiga);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get all Knjiga entries
router.get("/", async (req, res) => {
    try {
        const knjige = await Knjiga.findAll({
            include: [Autor, Zanr, Izdavac, Vrsta_knjige]
        });
        return res.json(knjige);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Get a single Knjiga by ID
router.get("/:id", async (req, res) => {
    try {
        const knjiga = await Knjiga.findByPk(req.params.id, {
            include: [Autor, Zanr, Izdavac, Vrsta_knjige]
        });
        if (!knjiga) {
            return res.status(404).json({ error: "Knjiga not found" });
        }
        return res.json(knjiga);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Update a Knjiga by ID
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
        const { naziv, cijena, autor_id, zanr_id, izdavac_id, vrsta_knjige_id } = req.body;
        const [updated] = await Knjiga.update(
            { naziv, cijena, autor_id, zanr_id, izdavac_id, vrsta_knjige_id },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedKnjiga = await Knjiga.findByPk(req.params.id, {
                include: [Autor, Zanr, Izdavac, Vrsta_knjige]
            });
            return res.json(updatedKnjiga);
        }
        return res.status(404).json({ error: "Knjiga not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// Delete a Knjiga by ID
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
        const deleted = await Knjiga.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).json(); // No content to return
        }
        return res.status(404).json({ error: "Knjiga not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = router;
