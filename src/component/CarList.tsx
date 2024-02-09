
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CarResponse } from "./Types";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { deleteCar } from "../carApi";
import { useState } from 'react'
import Confirmation from "./Confirmation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCar from "./AddCar";
import EditCar from "./EditCar";



// `${import.meta.env.VITE_API_URL}/car/all`

const CarList = () => {

    const queryClient = useQueryClient();

    const getCars = async(): Promise<CarResponse[]> => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/car/all`);
        return response.data;
    }

    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn:getCars
    })

    const columns :GridColDef[] = [
        {field: 'make', headerName: 'Make', width: 75},
        {field: 'model', headerName: 'Model', width: 75},
        {field: 'color', headerName: 'Color', width: 75},
        {field: 'plateNumber', headerName: 'Plate Number', width: 100},
        {field: 'year', headerName: 'Year', width: 75},
        {field: 'price', headerName: 'Price', width: 100},
        { field:'edit', headerName:'', width:90, sortable:false, filterable:false,
            renderCell:(params:GridCellParams)=> 
            <EditCar carData={params.row} />
        },
        {field: 'delete', headerName: '', width: 90, sortable: false, filterable: false, 
        renderCell: (params:GridCellParams) => (
        <>
            <Button color="error"
                onClick={()=>setOpenConfirmation({
                    id:params.row.carId,
                    year:params.row.year,
                    make:params.row.make,
                    model:params.row.model
                }) }
            ><DeleteForeverIcon /></Button>
            <Confirmation 
                open={openConfirmation?.id===params.row.carId} 
                year={openConfirmation?.year}
                make={openConfirmation?.make}
                model={openConfirmation?.model}
                OnClose={()=>setOpenConfirmation(false)}
                onConfirm={()=> {
                    mutate(params.row.carId);
                    setOpenConfirmation(false);}}>
            </Confirmation>
        </>
        )}
    ]


    // in case I need this again: import.meta.env.VITE_API_URL + '/car/' + params.row.carId
    // {field: 'delete', headerName: '', width: 90, sortable: false, filterable: false, renderCell: (params: GridCellParams) => (<Button onClick={() => {
    //     if(window.confirm(`Are you sure you want to delete this ${params.row.year} ${params.row.make} ${params.row.model}?`))
    //      {mutate(params.row.carId), openToast()}
    //     }} color="error">Delete</Button>)}

    const {mutate} = useMutation(deleteCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                { queryKey: ["cars"] }
            );
            openToast();
        },
        onError : (err) => {
            console.error(err);
        }
    })

    const [toastOpen, setToastOpen] = useState(false);
    const openToast = () => {
        setToastOpen(true);
    }

    // const[open,setOpen] =useState(false)
    const[openConfirmation,setOpenConfirmation] = useState(null)

    if (!isSuccess) {
        return <h2>Loading....</h2>
    } else if (error) {
        console.error(error);
        return <h2>Error fetching cars</h2>
    } else {
         return (
            <>
            <AddCar />
            <DataGrid rows={data} columns={columns} getRowId={(row) => row.carId} />
            <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)} message='Car Deleted'anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>
            </>
         )
            
        
    }
}

export default CarList;