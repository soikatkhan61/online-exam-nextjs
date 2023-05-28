"use client"
import TopBarProgress from "react-topbar-progress-indicator";
import React, { useState,useEffect,Suspense  } from 'react'
import NextProgress from "next-progress";


const TopLoading = () => {
  return <NextProgress delay={300} options={{ showSpinner: false }} />
}

export default TopLoading