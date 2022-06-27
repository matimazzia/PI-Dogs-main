const {Router} = require("express");
const dogsController = require("../controllers/dogs.controllers");
const router = Router();

router.route("/").get(dogsController.getDogs);
router.route("/:code").get(dogsController.getDogsRaza);
router.route("/").post(dogsController.postDogs);
module.exports = router;
