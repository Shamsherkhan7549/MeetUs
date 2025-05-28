import axios from 'axios'
import { Children, createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';



export const AuthContext = createContext({});

const client = axios.create({
    baseURL:"http://localhost:4000/user"
});

export const AuthProvider = ({children}) => {
    const authcontext = useContext(AuthContext);

    const [userData, setUserData] = useState(authcontext);

     const router = useNavigate();

    const handleRegister = async(username, email, password) => {        
        try {
            let request = await client.post("/register", {username:username, email:email, password:password});
            if(request.status===httpStatus.CREATED){
                return request.data.message;
            }
        } catch (error) {

            throw error;
            
        }
    };

    const handleLogin = async(username, password) => {
        try {
            let request = await client.post('/login',{username:username, password:password});

            if(request.status === httpStatus.OK){
                localStorage.setItem("token", request.data.token); 
                return request.data.message;  
            }

            
            
        } catch (error) {
           throw error
        }
    }



   

    const data = {
        userData, setUserData, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}