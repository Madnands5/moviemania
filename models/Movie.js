const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    genre: {
        type: String,
    },
    details: {
        type: String,
    },
    pic: {
        type: String,
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number
    },
    releaseDate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Movie", MovieSchema);
