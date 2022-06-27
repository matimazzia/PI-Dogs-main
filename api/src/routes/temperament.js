const {Router} = require("express");
const temperamentController = require("../controllers/temperament.controllers");
const router = Router();

router.route("/").get(temperamentController.getTemperament)

module.exports = router;
