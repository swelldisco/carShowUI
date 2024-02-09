
import { ChangeEvent } from "react";

export type CarResponse = {
    make: string;
    model: string;
    color: string;
    plateNumber: string;
    year: number;
    price: number;
}

export type DialogFormProps = {
    car: CarResponse;
    handleChange: (event:ChangeEvent<HTMLInputElement>) => void
}

export type Car = {
    carId: number;
    make: string;
    model: string;
    color: string;
    plateNumber: string;
    year: number;
    price: number;
}

export type CarEntry = {
    car: Car;
    id: number;
}

export type User = {
    userName: string;
    password: string;
}
