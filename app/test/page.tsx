"use client"
import TopBarProgress from "react-topbar-progress-indicator";
import Router from "next/router"
import React, { useState,useEffect,Suspense  } from 'react'
import {toast,ToastContainer} from 'react-toastify'


const Page = () => {
  toast.success("hii")
  return (
  <div>
    <ToastContainer/>
  </div>
  )
}

export default Page