import React, {useContext, useEffect, useState} from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import {collection, doc, setDoc, getDocs, updateDoc, where, query, Timestamp, addDoc} from 'firebase/firestore'
import { auth, db } from '../firebase';


const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export const useAuth = () => {
    return useContext(AuthContext);
  };

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const checkCurrentUser =()=>{
      const auth = getAuth()
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setCurrentUser(user)
        }})
    }
    const signinWithGoogle = async ()=>{
      await signInWithPopup(auth, provider)
      .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      window.localStorage.setItem('token',token)
      const user = result.user
      const querySnapshot = await getDocs(query(collection(db,'users'), where('uid','==',user.uid)))
      let doesUserExist = false
      querySnapshot.forEach((doc)=>{
        if(doc.data()!==null) doesUserExist = true
      })
      if(!doesUserExist){
      await setDoc(doc(collection(db,'users')),{
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            uid: user.uid,
            userCreatedAt: Timestamp.fromDate(new Date())
      })}
      setCurrentUser(user)
        }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error)
    })}
    const logout = ()=>{
      const auth = getAuth()
      console.log(auth)
      setCurrentUser(null)
      return signOut(auth)
    }

    const value = {
        signinWithGoogle,
        currentUser,
        checkCurrentUser, 
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}