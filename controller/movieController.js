const Movie = require("../models/Movie");

exports.getall = async (req, res) => {
    try {
        await Movie.find().then(data => {

            res.status(200).json({ movies: data });
        }).catch((error) => {
            res.status(400).json({ error: error });
        });;
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.getMovieById = async (req, res) => {
    try {
        await Movie.findById(req.body.id).then(data => {
            res.status(200).json({ movies: data });
        }).catch((error) => {
            res.status(400).json({ error: error });
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error });
    }
}

exports.getMovieByQuery = async (req, res) => {
    try {

        let query = {
            name: { $regex: req.body.name, $options: 'i' },
        }
        if (req.body.genre && req.body.genre !== "") {
            query.genre = req.body.genre
        }
        await Movie.find(query).sort({ releaseDate: 1 }).then(data => {
            res.status(200).json({ movies: data });
        }).catch((error) => {
            res.status(400).json({ error: error });
        });;
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.upVoteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.body.id,
            {
                upvotes: req.body.upvotes + 1
            },
            { new: true, useFindAndModify: false }
        ).then(data => {
            res.status(200).json({ movies: data });
        }).catch(error => {
            res.status(400).json({ error: error });
        })
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.downVoteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.body.id,
            {
                downvotes: req.body.downvotes + 1
            },
            { new: true, useFindAndModify: false }
        ).then(data => {
            res.status(200).json({ movies: data });
        }).catch(error => {
            res.status(400).json({ error: error });
        })
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.getTopmovies = async (req, res) => {
    try {
        await Movie.find().sort({
            upvotes: -1
        }).limit(10).then(data => {
            res.status(200).json({ movies: data });
        }).catch((error) => {
            res.status(400).json({ error: error });
        });
    } catch (error) {

    }
}