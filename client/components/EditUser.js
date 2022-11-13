import React from 'react'
import { signupForm } from './AuthForm'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { fetchAllProducts } from '../store/allProducts'

const EditUser = () => {
  const state = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  //component did mount, [] = component did update
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  console.log(state)
  return (
    <div>
      {signupForm()}
    </div>
  )
}

export default EditUser