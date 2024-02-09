import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Car, CarEntry, CarResponse} from "./Types"
import CarDialogContent from "./CarDialogContent";
import { ChangeEvent, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateCar } from "../carApi";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    carData: CarResponse;
}

const EditCar = ({carData}:FormProps) => {

    const[car, setCar] = useState<Car>({
        carId: 0,
        make: '',
        model: '',
        color: '',
        plateNumber: '',
        year: 0,
        price: 0
    })

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setCar({
            carId: 0,
            make: carData.make,
            model: carData.model,
            color: carData.color,
            plateNumber: carData.plateNumber,
            year: carData.year,
            price: carData.price
        })
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]:event.target.value})
    }

    const queryClient = new QueryClient;

    const {mutate} = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars']);
        }, onError : (err) => {
            console.error(err);
        }
    })

    const handleSave = () => {
       const id = carData.carId;
       const carEntry:CarEntry = {car, id}
       mutate(carEntry);
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
            <Button onClick={handleOpen}><EditIcon /></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button color="success" variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar