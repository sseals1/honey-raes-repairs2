import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeList.css"
import { useHistory } from "react-router-dom";


export const EmployeeList = () => {
    const [employee, updateEmployee] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((employeeData) => {
                    updateEmployee(employeeData)
                }

                )
        },
        []
    )
    return (
        <>
            <div>
                <div onClick={() => history.push("/employee/create")}> </div>
            </div>
            {

                employee.map(
                    (employeeObj) => {
                        return <p key={`employee--${employeeObj.id}`}>
                            <div className={employeeObj.emergency ? "emergency" : "ticket"}>
                                <div>{employeeObj.emergency ? "🚑" : ""}
                                    <Link to={`/employee/${employeeObj.id}`}>{employeeObj.name}</Link>
                                </div>
                                <div>{employeeObj.name} {employeeObj.specialty}</div>
                            </div>

                        </p>
                    }
                )
            }
        </>
    )

}