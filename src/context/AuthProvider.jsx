import axiosClient from "@/config/axios";
import { useRouter } from "next/router";

import { createContext, useEffect, useState} from "react" ;

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [authUser,setAuthUser] = useState(false)
    const [authToken,setAuthToken] = useState('')
    const [userInfo,setUserInfo] = useState({})
    const router = useRouter()

    useEffect(()=>{
        const _authToken = localStorage.getItem('token') || ''
        setAuthToken(_authToken)
        if(_authToken){
            setAuthUser(true)
        }else{
            setAuthUser(false)
        }
    },[authToken])

    const validateUser = async (email)=>{
        try {
            const {data} = await axiosClient('/users')
            if(data.some(user => user?.email === email)){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signIn = async(user)=>{
        const {data} = await axiosClient.post('/auth/local',user)
        console.log(data)
        localStorage.setItem('token',data.jwt)
        setAuthUser(true)
        setUserInfo(data.user)
        localStorage.setItem('userInfo',JSON.stringify(data.user))
        router.push('/')
    }   

    const createUser = async (user) => {
        
        try {
            
            axiosClient.post('/auth/local/register',user)
            .then(response =>{
                localStorage.setItem('token',response.data.jwt)
                setAuthUser(true)
                setUserInfo(response.data.user)
            })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <AuthContext.Provider
            value={{
                setAuthUser,
                authUser,
                validateUser,
                signIn,
                createUser,
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {
    AuthProvider
}