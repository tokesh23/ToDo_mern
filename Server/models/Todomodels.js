const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    toDo: {
        type: String,
        required: true,  // Corrected `require` to `required`
    },
});

module.exports = mongoose.model("ToDo", toDoSchema);
