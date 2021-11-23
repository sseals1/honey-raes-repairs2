import React, { useState } from "react"
import { useHistory } from "react-router-dom";

export const TicketForm = () => {
    const [ticket, updateTicket] = useState({
        //ticket is a variable that will hold state. updateTicket is the setter function that will modify state. useState is the hook that provides a place to house state.
        //useState provides a place where state will be held. The ticket variable will have the values and the update function will set those values.
        description: "", //2 keys that will be populated in state.
        emergency: false
    });
    const history = useHistory()


    const saveTicket = (event) => { //this is the object that is created that we want to sent to the API for permanent storage.
        event.preventDefault()
        const newTicket = { //declaration of the object that will hold the values of the ticket that we want to save to the API
            description: ticket.description, //this is the description key that is declared on line 7. description is the key on serviceTickets in the API that
            //this is being set to ticket.description. ticket holds the value of the array that is created in transient state.
            emergency: ticket.emergency, //this is the emergency key from the API serviceTickets array. It is set to the value of the ticket.emergency value in state(what the user picked this is a boolean).
            customerId: parseInt(localStorage.getItem("honey_customer")), // we get the customerId from localStorage.(check the application tab in Dev tools)
            employeeId: 1, //this id is hard coded so that json does not delete the entire object because it has not found this employeeId key.
            dateCompleted: "" //the initial value is set to an empty string.
        }
        
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }

        return fetch("http://localhost:8088/serviceTickets", fetchOption) //fetching the serviceTickets from the API
        .then(() => {
            history.push("/tickets") //the history method is used to rerender the tickets to the DOM
                                    //creating the change in views using the history mechanism.
        })
        
    }



    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                    onChange={
                        (event) => {
                        //event is the varialbe placeholder that will capture the onChange events value
                            const copyOfTicket = {...ticket}
                            //copyOfTicket variable will hold a copy of the values from state
                            copyOfTicket.description = event.target.value
                            //modify copyOfTicket description from a blank string to whatever is currently typed in. look at Line 6.
                            updateTicket(copyOfTicket)
                            //take the copyOfTicket variable and pass it in as an argument to the updateTicket setter function to set new state.
                        }
                    }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        />
                </div>
            </fieldset>

            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copyOfTicket = {...ticket}
                                copyOfTicket.emergency = event.target.checked
                                updateTicket(copyOfTicket)

                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveTicket}>
                Submit Ticket
            </button>
        </form>
    )
}
