const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoute= require('./dogs')
const temperametRoute= require("./temperament")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs",dogsRoute)
router.use("/temperaments", temperametRoute)
module.exports = router;
