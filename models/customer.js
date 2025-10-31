const mongoose = require("mongoose")
    // imports the mongoose library

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true}
})
    // defines the schema for the customer model
    // the value 'true' must be required so the while-loop in app.js can function properly

const Customer = mongoose.model(`Customer`, customerSchema)
    // creates the customer model

module.exports = Customer 
    // exports the customer model to grant access to the rest of this lab


