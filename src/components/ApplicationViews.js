import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./Customers/CustomerList"
import { EmployeeList } from "./EmployeeList"
import { TicketList } from "./serviceTickets/TicketList"
import { TicketForm } from "./serviceTickets/TicketForm"
import { EmployeeForm } from "./EmployeeForm"

export const ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/tickets">
                <TicketList />
            </Route>
            <Route path="/tickets/create">
                <TicketForm />
            </Route>
            <Route exact path="/">
                <TicketForm />
            </Route>
            <Route path="/employee/create">
                <EmployeeForm />
            </Route>
        </>
    )
}
