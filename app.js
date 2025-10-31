// Austin Berndlmaier's Intro-To-Mongoose Lab
// _______________________________________________________________________
// In the spirit of the customer database we'll be interacting with below,
// I have elected to replace the term 'user' with 'manager'.
// _______________________________________________________________________

const dotenv = require("dotenv")
    // requires dotenv package

dotenv.config()
    // loads environment variables from .env file

const mongoose = require("mongoose")
    // imports mongoose library

const Customer = require("./models/customer.js")
    // imports the customer model to this file

const prompt = require('prompt-sync')();
    // prompting the manager

// ___________________________________________________________________

mongoose.connect(process.env.MONGODB_URI)
    // connects to the database using secret string from .env file

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
    // logs connection status to terminal on start; an event listener

// ____________________________________________________________________

console.log(`Welcome to the CRM, Database Manager!`)
    // Initially greets the manager

const displayActions = async () => {
    while (true) {
        console.log(`Please select an action from below (1-5)`)
        console.log(``)
        console.log(`1. Create a customer`)
        console.log(`2. View all customers`)
        console.log(`3. Update a customer`)
        console.log(`4. Delete a customer`)
        console.log(`5. Quit the app`)
        console.log(``)
        const action = prompt(`Which action (#) shall we complete today?`)

            // A while-true loop will allow continuous execution of this program
            // until the manager decides to select 'quit'.


        switch (action) {

            case `1`:

                const customerData = {
                    name: prompt(`Customer's name: `),
                    age: prompt(`Customer's age: `),
                }

                const customer = await Customer.create(customerData)
                console.log(`New customer: `, customer)

                break

            // Case 1 allows the manager to create new customer profiles in the database.
            // ** note that customer IDs are generated automatically **


            case `2`:

                const allCustomers = await Customer.find({})
                console.log(`Here are all your customers: `)
                console.log(``)
                console.log(allCustomers)
                break 

            // Case 2 is a simple option to list all customers currently stored in the database.


            case `3`:

                const updateID = prompt(`Enter your customer's ID to update: `)
                const updatedCustomer = await Customer.findByIdAndUpdate(
                    updateID,
                    {
                        name: prompt(`Update customer name here: `),
                        age: prompt(`Update customer age here: `)
                    },
                    {new: true}
                )
                console.log(`This customer, ${updatedCustomer}, has been updated.`)
                break

            // Case 3 allows the manager to update customer profiles via ID.


            case `4`: 

                const deleteID = prompt(`To delete a customer, enter their ID here: `)
                const deletedCustomer = await Customer.findByIdAndDelete(deleteID)

                if (deletedCustomer) {
                    console.log(`This customer, ${deletedCustomer}, has been deleted.`)

                } else {
                    console.log(`This ID does not match an existing customer.`)
                }
                break

            // Case 4 allows the manager to delete customers from the database via ID.


            case `5`: 

                await mongoose.disconnect()
                console.log(`You are now exiting the customer database.`)
                return

            // Case 5 quits the app using a GA-provided method to cleanly break out of the terminal. 


            default: 

                console.log(`This database only recognizes actions 1-5.`)
                console.log(`Please enter a valid number: 1-5.`)
            
            // // The catch-all option which informs the manager 
            // // that an invalid action number has been selected.


        }
    }
}

displayActions()

// Alas, we must not forget to call our massive function at the end of all this rambling!