import axios, { AxiosRequestConfig } from "axios";
import { Car, CarEntry, CarResponse } from "./component/Types";

const getAxiosConfig = ():AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt')?.substring(6);
    return {
        headers: {
            'Content-Type':'application/json',
            'Authorization':  token
        }
    }
}

export const deleteCar = async (id:number) : Promise<CarResponse> => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id} `, getAxiosConfig());
    return response.data;
}

// export const deleteCar = async (link:string) : Promise<CarResponse> => {
//     const response = await axios.delete(link);
//     return response.data;
// }

export const addCar = async(car:Car) : Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/car/create`, car, {
        headers : {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const updateCar = async(carEntry:CarEntry) : Promise<CarResponse> => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/car/${carEntry.id}`, carEntry.car, {
        headers : {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
