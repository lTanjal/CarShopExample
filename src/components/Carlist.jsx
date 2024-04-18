import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import Button from "@mui/material/Button";// if {Button}, then there is no need to "/Button" in the end of the line
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { getCars } from "../carapi";

function Carlist() {
    const [cars, setCars] = useState([]);

    const [colDefs] = useState([
        { field: "brand", fiter: true },
        { field: "model", fiter: true },
        { field: "color", fiter: true },
        { field: "fuel", fiter: true, width: 100 },
        { field: "modelYear", fiter: true, width: 100 },
        { field: "price", fiter: true },
        {
            cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} />
            , width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCar(params.data._links.car.href)}>Delete</Button>
            , width: 500
        }

    ]);


    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        getCars()
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }


    const deleteCar = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json();
                })
                .then(() => fetchCars())
                .catch(err => console.error(err))
        }
    }

    const addCar = (newCar) => {
        fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCar)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error when adding a car')
                return response.json()
            })
            .then(() => fetchCars())
            .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedCar)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error when updating car')
                return response.json()
            })
            .then(() => fetchCars())
            .catch(err => console.error(err))

    }

    return (
        <>
        <div style={{ height: 40}}></div>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                />
            </div>
        </>
    )
}
export default Carlist;