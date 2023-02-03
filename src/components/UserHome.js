import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function UserHome (){
    const {logout, currentUser} = useAuth()
    const signOut = async (event)=>{
        event.preventDefault()
        await logout()
    }
    return(

        <div>
            Welcome {currentUser.displayName}
            <div>
                <button type='submit'
                onClick={(event)=>signOut(event)}>
                    logout
                </button>
            </div>
        </div>
    )
}