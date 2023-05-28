"use client"
import TopBarProgress from "react-topbar-progress-indicator";
import Router from "next/router"
import React, { useState,useEffect,Suspense  } from 'react'



const page = () => {
  const [progress, setProgress] = useState(false)
  TopBarProgress.config({
    barColors:{
      "0": "#f11946",
    },
    shadowBlur: 0,
  });
   Router.events.on("routeChangeStart", () => {
      setProgress(true);
   })

   Router.events.on("routeChangeComplete", () => {
      setProgress(false) 
   })

  return (
  <div>
     {<TopBarProgress />}
  </div>
  )
}

export default page