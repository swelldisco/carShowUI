
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CarDialogContent from "./CarDialogContent";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { addCar } from "../carApi";
import { Car } from "./Types";
import MinorCrashIcon from '@mui/icons-material/MinorCrash';

const AddCar = () => {
    // empty object to be filled with content:
    const[car, setCar] = useState<Car>({
        carId: 0,
        make: '',
        model: '',
        color: '',
        plateNumber: '',
        year: 0,
        price: 0
    })

    const queryClient = new QueryClient;

    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars']);
        }, onError : (err) => {
            console.error(err);
        }
    })

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]:event.target.value})
    }

    const handleSave = () => {
        mutate(car)
        setCar({
            carId: 0,
            make: '',
            model: '',
            color: '',
            plateNumber: '',
            year: 0,
            price: 0
        })
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button color="success" variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Box 
                display='flex'
                flexDirection="column"
                alignItems='center'
                justifyContent='center'
                padding='20px'>
                    <Button variant="contained" onClick={handleOpen}><MinorCrashIcon/></Button>
            </Box>
            
        </>
    )
}

export default AddCar;