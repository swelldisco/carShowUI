import {useState} from 'react'

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}

const Info = () => {
    
    const [user, setUser] = useState<User>({} as User)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]:event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

  return (
    <div>Info
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" onChange={handleChange} name='name' value={user.name}/>
            <label>Email Address:</label>
            <input type="text" onChange={handleChange} name='email' value={user.email}/>
            <label>Password:</label>
            <input type="text" onChange={handleChange} name='password' value={user.password}/>
            <button type='submit'>Submit</button>
        </form>
        <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
        </ul>
    </div>
  )
}

export default Info