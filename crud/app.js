const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: [
    'http://localhost:8080', 
    'http://127.0.0.1:8080',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
};

app.use(cors(corsOptions));
   
const Joi = require('joi');
app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});
const autorRoutes = require("./routes/autor.js");
app.use("/autor", autorRoutes);
const opremaRoutes = require("./routes/dodatnaoprema.js");
app.use("/oprema", opremaRoutes);
const izdavacRoutes = require("./routes/izdavac.js");
app.use("/izdavac", izdavacRoutes);
const knjigaRoutes = require("./routes/knjiga.js");
app.use("/knjiga", knjigaRoutes);
const korisnikRoutes = require("./routes/korisnik.js");
app.use("/korisnik", korisnikRoutes);
const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);
const vrstaKnjigeRoutes = require("./routes/vrstaknjige.js");
app.use("/vrsta_knjige", vrstaKnjigeRoutes);
const zanrRoutes = require("./routes/zanr.js");
app.use("/zanr", zanrRoutes);
app.listen(9000);
