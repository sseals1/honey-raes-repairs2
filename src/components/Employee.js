import { render } from "@testing-library/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Employee = () => {
    const [employee, setEmployee] = useState({})  // State variable for current employee object
    const { employeeId } = useParams()    // Variable storing the route parameter which is employeeId and is an integer. example: http://localhost:8088/serviceEmployees/5
                                        //5 is the employeeId route parameter

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employeeId}`) //expanded query selection. syntax is: "?_expand="
                .then(res => res.json())
                .then(setEmployee)
        },
        [ employeeId ]  //Above Hook runs when the value of employeeId changes
    )
    render()
    return (
        
        <>
            <section className="employee">
                <h3 className="employee__description">{employee.name}</h3>
                <div className="employee__customer">{employee.specialty}</div>
            </section>
        </>
    )

}




