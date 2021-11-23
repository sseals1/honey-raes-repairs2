import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./EmployeeList.css"
import { Link } from "react-router-dom"





export const EmployeeList = () => {
    //export function
    const [employees, changeEmployee] = useState([])
    //declaring a variable employee that will hold state. changeEmployee is like a setter function that will set state. useState sais what type of data state will be.
    const [employeeSpecialty, setSpecialties] = useState("")

    const history = useHistory()


    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((employeeData) => {
                    changeEmployee(employeeData)
                })
        }, [])

    useEffect(
        () => {
            const specialty = employees.map(
                //specialty's value will be a string of objects that will be the specialty key from the API
                (employeeSpecialtyObj) => {
                    return `${employeeSpecialtyObj.specialty}`
                }
            )

            /*
                1. Use .map() to get the specialty of each employee
                2. Then update a state variable to be a comma-separated string
                    (e.g. "iPhone, Printers, ...")
            */
            setSpecialties(specialty.join(", "))
            //setter function that will take the specialty variable as an argument because it holds the key values of specialty from the API.
            //the .join() method creates one long string from all the specialty keys and adds a comma seperator between them.

        }, [employees])
    //employee is the variable upon who we want to listen for state change. Syntax is the same as the useEffect hook on line 18.

    return (
        //render a Specialties heading with employeeSpecialty interpolated to render them to the DOM.
        <>
            <div>
                <button className="btn btn-primary" onClick={() => history.push("/employee/create")}>
                    <div>
                        Hire Employee
                    </div>
                </button>
                <h4>Specialties:</h4>{employeeSpecialty}
            </div>
            <h4>Employees:</h4>

            {
                // employees.map(
                //     (employeeObj) => {
                //         return <div className="employee"> <Link to={`/employees/${employeeObj.id}`}>{employeeObj.name}</Link></div>
                //         //<div className={employeeObj.employeeId ? "employeeObj" : "employeeObj"}></div>
                //         // <div className={ticketsObj.emergency ? "emergency" : "ticket"}></div>
                //         //In jsx the key ${employee.id} is used like an ID to find the id.
                //     }
                // )
                employees.map(
                    (employeeObj) => {
                        return <p key={`employee--${employeeObj.id}`}>

                            <div>
                                <Link to={`/employees/${employeeObj.id}`}>{employeeObj.name}</Link>
                                {/* /employees/:employeeId */}
                            </div>



                        </p>
                    }
                )
            }
        </>


    )
}
