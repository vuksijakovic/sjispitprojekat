const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { Autor } = require('../models'); // Adjust the path if necessary
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
         const autor = await Autor.create({ naziv });
         return res.status(201).json(autor);
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
 
 // Get all Autor entries
 router.get("/", async (req, res) => {
     try {
         const autori = await Autor.findAll();
         return res.json(autori);
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
 
 // Get a single Autor by ID
 router.get("/:id", async (req, res) => {
     try {
         const autor = await Autor.findByPk(req.params.id);
         if (!autor) {
             return res.status(404).json({ error: "Autor not found" });
         }
         return res.json(autor);
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
 
 // Update an Autor by ID
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
         const [updated] = await Autor.update({ naziv }, {
             where: { id: req.params.id }
         });
         if (updated) {
             const updatedAutor = await Autor.findByPk(req.params.id);
             return res.json(updatedAutor);
         }
         return res.status(404).json({ error: "Autor not found" });
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
 
 // Delete an Autor by ID
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
         const deleted = await Autor.destroy({
             where: { id: req.params.id }
         });
         if (deleted) {
             return res.status(204).json(); // No content to return
         }
         return res.status(404).json({ error: "Autor not found" });
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
module.exports = router;


 
