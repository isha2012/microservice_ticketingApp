"use client";
import { useState } from "react";


export default () => {

    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');


    //to check the type of event here.
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Here you would send the data to the server to sign up the user
        console.log('Signing up with email:', email, 'and password:', password);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={e=> setEmail(e.target.value)} type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input value={password} onChange={e=> setPassword(e.target.value)} type="password" id="password" name="password" required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}