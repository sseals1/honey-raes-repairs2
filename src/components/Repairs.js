import React from "react"
import { CustomerList } from "./Customers/CustomerList"
import { EmployeeList } from "./EmployeeList"
import { TicketList } from "./serviceTickets/TicketList"

export const Repairs = () => {


    return (
        <>
            <h1>Honey Rae's Repair Shop</h1>
            <h4>Customer List</h4>
            <CustomerList />
            <h4>Employee List</h4>
            <EmployeeList />
            <h4>Service Tickets</h4>
            <TicketList />
        </>
    )
}

