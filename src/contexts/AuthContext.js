import React, {useContext, useEffect, useState} from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {collection, doc, setDoc, getDocs, updateDoc, where, query, Timestamp} from 'firebase/firestore'
import { auth, db } from '../firebase';


const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();
console.log(db)

export const useAuth = () => {
    return useContext(AuthContext);
  };

export const AuthProvider = ({ children }) => {
    const signinWithGoogle = async ()=>{
      await signInWithPopup(auth, provider)
      .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      console.log(credential)
      console.log(token)
      const user = result.user
      console.log(user)
      const usersRef = collection(db, 'users')
      console.log(usersRef)
      const q = query(usersRef, where('userid', '==', user.uid))
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      querySnapshot.forEach((doc)=>{
        if(doc.data() === null){
          setDoc(doc(db, 'users/', user.uid),{
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            uid: user.uid,
            userCreatedAt: Timestamp.fromDate(new Date())}
        )}
          else return user
        })
        }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error)
    })}

    const value = {
        signinWithGoogle,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}