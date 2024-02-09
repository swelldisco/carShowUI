import { Button, Stack, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { User } from "./Types"
import axios from "axios"
import CarList from "./CarList"


const Login = () => {

    const [user, setUser] = useState<User>({
        userName: '',
        password: ''
    })

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]:event.target.value})
    }

    const handleLogin = () => {
        axios.post(`http://127.0.0.1:8085/login`, user, {
            headers : {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : 'http://127.0.0.1:5173'
            }
        })
        .then (response => {
            const jwToken = response.headers.authorization;

            if (jwToken !== null) {
                sessionStorage.setItem('jwt', jwToken);
                setAuth(true);
            }
        })
        .catch(err => console.error(err));
    }

    if (isAuthenticated) {
        return <CarList />
    } else return (
        <Stack spacing={2} alignItems="center" marginTop={2}>
            <TextField name="userName" label="Username" onChange={handleChange}/>
            <TextField type="password" name="password" label="Password" onChange={handleChange}/>
            <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
        </Stack>
    )

}

export default Login