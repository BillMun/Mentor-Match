import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


export default function Login (){

    const auth = getAuth();
    const {signinWithGoogle} = useAuth()
    const signIn = async (event)=> {
        event.preventDefault()
        await signinWithGoogle(auth)
    }

    return(
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
        </div>
    )
}
