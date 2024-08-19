const Todomodels = require("../models/Todomodels");

module.exports.getToDos = async (req, res) => {
    try {
        const toDos = await Todomodels.find();
        res.status(200).json(toDos);  // Use .json() for sending JSON responses
    } catch (err) {
        console.error("Error fetching To-Dos:", err);
        res.status(500).json({ message: "Error fetching To-Dos" });  // Use .json() for JSON responses
    }
};

module.exports.saveToDo = async (req, res) => {
    const { toDo } = req.body;
    try {
        const data = await Todomodels.create({ toDo });
        console.log("Saved successfully...");
        res.status(201).json(data);  // Use .json() for sending JSON responses
    } catch (err) {
        console.error("Error saving To-Do:", err);
        res.status(500).json({ message: "Error saving To-Do" });  // Use .json() for JSON responses
    }}




    //Delete

    module.exports.deleteToDo = async (req, res) => {
        const { id } = req.params;  // Get ID from request parameters
        try {
            const result = await Todomodels.findByIdAndDelete(id);  // Attempt to delete the to-do item by ID
            if (!result) {
                return res.status(404).json({ message: "To-Do not found" });  // If no item found, respond with 404
            }
            res.status(200).json({ message: "To-Do deleted successfully" });  // Success response
        } catch (err) {
            console.error("Error deleting To-Do:", err);
            res.status(500).json({ message: "Error deleting To-Do" });  // Error response
        }
    };

    
    module.exports.updateToDo = async (req, res) => {
        const { id } = req.params;  // Get ID from request parameters
        const { toDo } = req.body;  // Get updated data from request body
    
        try {
            const updatedToDo = await Todomodels.findByIdAndUpdate(
                id, 
                { $set: { toDo } }, 
                { new: true }  // Return the updated document
            );
    
            if (!updatedToDo) {
                return res.status(404).json({ message: "To-Do not found" });  // If no item found, respond with 404
            }
            res.status(200).json(updatedToDo);  // Success response with updated document
        } catch (err) {
            console.error("Error updating To-Do:", err);
            res.status(500).json({ message: "Error updating To-Do" });  // Error response
        }
    };
    