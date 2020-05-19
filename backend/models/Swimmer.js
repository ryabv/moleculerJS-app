const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    }
});

module.exports = model('Swimmer', schema);