const {Router} = require("express");
const temperamentController = require("../controllers/temperament.controllers");
const router = Router();

router.route("/").get(temperamentController.getTemperament)
router.route("/delete/:id").delete(temperamentController.deleteTemperament)

module.exports = router;
