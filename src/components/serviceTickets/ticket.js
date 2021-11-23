import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Ticket = () => {
    const [ticket, setTicket] = useState({})  // State variable for current ticket object
    const { ticketId } = useParams()    // Variable storing the route parameter which is ticketId and is an integer. example: http://localhost:8088/serviceTickets/5
                                        //5 is the ticketId route parameter

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`) //expanded query selection. syntax is: "?_expand="
                .then(res => res.json())
                .then(setTicket)
        },
        [ ticketId ]  // Above Hook runs when the value of ticketId changes
    )

    return (
        <>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">Assigned to {ticket.employee?.name}</div>
            </section>
        </>
    )
}





