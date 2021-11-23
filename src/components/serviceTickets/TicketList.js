import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tickets.css"
import { useHistory } from "react-router-dom";


export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

    const getTicketss = () => {
        fetch("http://localhost:8088/serviceTickets?_expand=tickets&_expand=customer&_expand=employee")
            .then(res => res.json())
            .then((ticketsData) => {
                updateTickets(ticketsData)
            })
    }

    useEffect(
        () => {
            getTicketss()
        },
        []
    )



    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
        .then(getTicketss)
    }



    return (
        <>
            <div>
                <button className="create_ticket" onClick={() => history.push("/tickets/create")}>Create Ticket</button>
            </div>
            {

                tickets.map(
                    (ticketsObj) => {
                        return <section className="tickets_css" key={`ticket--${ticketsObj.id}`}>


                            <div className={ticketsObj.emergency ? "emergency" : "ticket"}>
                                <div>{ticketsObj.emergency ? "🚑" : ""}
                                    <Link to={`/tickets/${ticketsObj.id}`}>{ticketsObj.description}</Link>
                                </div>
                                <div>Submitted by <b>{ticketsObj.customer?.name}</b> and worked on by <b>{ticketsObj.employee?.name}</b></div>

                            </div>
                            <button onClick={() => {
                                deleteTicket(ticketsObj.id)
                            }}>Delete</button>

                        </section>
                    }
                )
            }
        </>
    )

}