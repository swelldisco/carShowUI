import { DialogContent, TextField } from "@mui/material"
import { DialogFormProps } from "./Types"

const CarDialogContent = ({car, handleChange}:DialogFormProps) => {
  return (
    <DialogContent>
        <TextField variant="filled" placeholder="Make" value={car.make} name="make" onChange={handleChange}/><br />
        <TextField variant="filled" placeholder="Model" value={car.model} name="model" onChange={handleChange}/><br />
        <TextField variant="filled" placeholder="Color" value={car.color} name="color" onChange={handleChange}/><br />
        <TextField variant="filled" placeholder="Plate Number" value={car.plateNumber} name="plateNumber" onChange={handleChange}/>
        <TextField variant="filled" placeholder="Year" value={car.year} name="year" onChange={handleChange} type="number"/><br />
        <TextField variant="filled" placeholder="Price" value={car.price} name="price" onChange={handleChange} type="number"/><br />
    </DialogContent>
  )
}

export default CarDialogContent