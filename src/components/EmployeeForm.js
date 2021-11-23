import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import "./EmployeeForm.css"

export const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        //ticket is a variable that will hold state. updateTicket is the setter function that will modify state. useState is the hook that provides a place to house state.
        //useState provides a place where state will be held. The ticket variable will have the values and the update function will set those values.
        name: "", //2 keys that will be populated in state.
        specialty: ""
    });
    const history = useHistory()


    const saveEmployee = (event) => { //this is the object that is created that we want to sent to the API for permanent storage.
        event.preventDefault() 
        const newEmployee = { //declaration of the object that will hold the values of the ticket that we want to save to the API
            name: employee.name, //this is the description key that is declared on line 7. description is the key on serviceTickets in the API that
            //this is being set to ticket.description. ticket holds the value of the array that is created in transient state.
            specialty: employee.specialty, //this is the emergency key from the API serviceTickets array. It is set to the value of the ticket.emergency value in state(what the user picked this is a boolean).
             // we get the customerId from localStorage.(check the application tab in Dev tools)

        }

        const fetchOption = { //This is the POST request Object that needs to be passed in as a second argument to the fetch call
            method: "POST", //Get requests are the only fetch requests that do not require a second argument.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOption) //generating a new employee object in the employees resource of the API
            .then(() => {
                history.push("/employees") //the history method is used to rerender the tickets to the DOM
                //creating the change in views using the history mechanism.
            })

    }



    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={
                            (event) => {
                                //event is the varialbe placeholder that will capture the onChange events value
                                const copyOfEmployee = { ...employee }
                                //copyOfTicket variable will hold a copy of the values from state
                                copyOfEmployee.name = event.target.value
                                //modify copyOfTicket description from a blank string to whatever is currently typed in. look at Line 6.
                                setEmployee(copyOfEmployee)
                                //take the copyOfTicket variable and pass it in as an argument to the updateTicket setter function to set new state.
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name..."
                    />
                </div>



                <div className="form-group">
                    <label htmlFor="specialty">Repair Specialty:</label>
                    <input
                        onChange={
                            (event) => {
                                //event is the varialbe placeholder that will capture the onChange events value
                                const copyOfSpecialty = { ...employee }
                                //copyOfTicket variable will hold a copy of the values from state
                                copyOfSpecialty.specialty = event.target.value
                                //modify copyOfTicket description from a blank string to whatever is currently typed in. look at Line 6.
                                setEmployee(copyOfSpecialty)
                                //take the copyOfTicket variable and pass it in as an argument to the updateTicket setter function to set new state.
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a specialty..."
                    />
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={saveEmployee}>
                Finish Hiring
            </button>
        </form>
    )
}
