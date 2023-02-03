import React, {useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import UserHome from "./UserHome";


export default function Login (){

    const auth = getAuth();
    const {signinWithGoogle, currentUser, checkCurrentUser} = useAuth()
    const signIn = async (event)=> {
        event.preventDefault()
        await signinWithGoogle(auth)
    }
    useEffect(()=>{
        checkCurrentUser()
    },[])

    return(
        <div>
            {currentUser ? <UserHome/> :
            <div>
                <h1>
                    Welcome to Mentor Match
                </h1>
                <h4>
                    Connecting Mentors and Mentees
                </h4>
                <button 
                type="submit"
                onClick={(event)=>signIn(event)}>
                Please log in!
                </button>
            </div>}
        </div>
    )
}
