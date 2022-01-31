const router = require("express").Router();
const movieController = require("../controller/movieController");
router.route("/getall").get(movieController.getall);
router.route("/getMovieById").post(movieController.getMovieById);
router.route("/getMovieByQuery").post(movieController.getMovieByQuery);
router.route("/upVoteMovie").post(movieController.upVoteMovie);
router.route("/downVoteMovie").post(movieController.downVoteMovie);
router.route("/getTopmovies").get(movieController.getTopmovies);
module.exports = router;