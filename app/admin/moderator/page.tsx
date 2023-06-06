"use client"
import React, { useState } from 'react'

const Page = () => {
    const [tests,setTests] = useState(false)
    setTimeout(()=>{
        setTests(true)
        console.log('hii');
    },2000)

  return (
    <div>
        {tests && <p>hiii</p>}
    </div>
  )
}

export default Page