import React, { useEffect, useState } from "react";


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
                        return <p key={`ticket--${ticketsObj.id}`}>
                            {ticketsObj.description} 
                            submitted by {ticketsObj.customer.name} 
                            and worked on by {ticketsObj.employee.name}
                            </p>
                    }
                )
            }
        </>
    )

}