import React from "react";
import {useAuth} from '../contexts/AuthContext'

export default function NewUserType (){
    const {currentUser, setUserType} = useAuth()
    
    const handleUserType = async (event)=>{
        await setUserType(currentUser, event.target.value)
    }

    return(
        <div>
            <div>
            Mentor Match connects mentors with mentees and coaches with skill seakers
            </div>
            <div>
                This platform is completely free to all users. Coaches and mentors should never charge people they work with on this platform. It is specically geared towards people in the technology field.
            </div>
            <div>
                A Mentor:
                <ul>
                    <li>is someone who has worked in the tech field for 3+ years</li>
                    <li>offers high level information about a career in technology</li>
                    <li>advices the mentee on their career progression</li>
                    <li>provides feebback on a mentees projects and helps them build their marketable skills in general</li>
                </ul>
            </div>
            <button type='submit'
            value={'Mentor'}
            onClick={(event)=>handleUserType(event)}>
                I am a Mentor
            </button>
            <div>
                a Mentee:
                <ul>
                    <li>seeks mentorship and advice</li>
                    <li>is new to the Techology field</li>
                    <li>wants help building their career</li>
                    <li>seeks general knowledge about marketable tech skills</li>
                </ul>
                <button type='submit'
                value='Mentee'
                onClick={(event)=>handleUserType(event)}>
                    I am a Mentee
                </button>
            </div>
            <div>
                a Coach:
                <ul>
                    <li>has particular skill sets that they want to coach a Skill Seeker on</li>
                    <li>Offers coaching in a specific tech skill i.e. Javascript, Python, deployments on AWS, ect</li>
                    <li>A Coach answers the Skill Seekers specific questions and helps them to develop specific skills</li>
                    <li>Connects a Skill Seeker with resources in their particular area of expertice</li>
                </ul>
                <button type='submit'
                value='Coach'
                onClick={(event)=>handleUserType(event)}>
                    I am a Coach
                </button>
            </div>
            <div>
                a Skill Seeker:
                <ul>
                    <li>Wants coaching on a specific tech skill i.e. Node.js, C#, git and github</li>
                </ul>
                <button type='submit'
                value='Skill Seeker'
                onClick={(event)=>handleUserType(event)}>
                    I am a Skill Seeker
                </button>
            </div>
        </div>
    )
}