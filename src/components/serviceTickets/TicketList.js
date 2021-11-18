import React, { useEffect, useState } from "react";
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((ticketData) => {
                    updateTickets(ticketData)
                }

                )
        },
        []
    )
    return (
        <>
            {
                tickets.map(
                    (ticketsObj) => {
                        return <div key={`ticket--${ticketsObj.id}`}>
                            <p className={ticketsObj.emergency ? "emergency" : "ticket"}>
                                {ticketsObj.emergency ? "🚑" : ""} {ticketsObj.description} submitted by {ticketsObj.customer.name} and worked on by {ticketsObj.employee.name}
                            </p>

                        </div>
                    }
                )
            }
        </>
    )

}