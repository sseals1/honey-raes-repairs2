import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    const [customers, assignCustomers] = useState([])
    //useState hook. customers is the variable that will have the value of the transient state. 
    //assignCustomers is the function that is the second argument of usestate that will set the transient state of the customers variable.
    //useState Hook holds transient state.
    const [displayTotalCustomerMessage, updateMessage] = useState("")

    useEffect( //this useEffect is the Hook get permanent state and stores it in the customersArray variable which is then passed in to the useEffect
        //assignCustomers function that sets the transient state for the customers variable.
        () => {
            console.log("initial useEffect")//console.log to show the initial useEffect
            fetch("http://localhost:8088/customers")//the URL used to fetch the customers array from the API server
                .then(res => res.json()) 
                .then(
                    (customersArray) => { 
                    assignCustomers(customersArray)
                })
        },
        []
    )


        useEffect(
            () => {
                console.log("Cusomers state changed", customers)
                if (customers.length === 1) {
                    updateMessage("You have 1 customer")
                } else {
                    updateMessage(`You have ${customers.length} customers`)
                }
            },
            [customers]
        )




    return (
        <>
         
            <div>{displayTotalCustomerMessage}</div>
        { 
            customers.slice(0, 5).map(
            //itterating the customers array and using .slice() to only display the first 5 customers.
                (customerObj) => { 
                    return <h2 key={`customer--${customerObj.id}`}> {customerObj.name}</h2>
                }
            )
        }
        </>
    )
}