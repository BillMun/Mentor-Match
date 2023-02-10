import React, {useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import NewUserType from './NewUserType'

export default function UserHome (){
    const {logout, currentUser, checkUserProfile, userProfile} = useAuth()
    const signOut = async (event)=>{
        event.preventDefault()
        await logout()
    }
    useEffect(()=>{
        checkUserProfile()
        console.log(userProfile)
    },[])

    return(

        <div>
            Welcome {currentUser.displayName}
            <div>
            </div>
            <div>
                {userProfile ? userProfile.userType ? '' : <NewUserType/> :''}
                {userProfile ? userProfile.userType ? <div>You are a {userProfile.userType}</div>:'':''}
                <button type='submit'
                onClick={(event)=>signOut(event)}>
                    logout
                </button>
            </div>
        </div>
    )
}