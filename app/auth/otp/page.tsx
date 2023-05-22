import prisma from '@/lib/prisma'
import React from 'react'
import Link from 'next/link'

const page = async () => {
    let user = await prisma.user.findUnique({
        where: {
            phone:"asdgasdg"
        }
    })
    console.log(user);
    
  return (
    <div className='container py-4'>
      <h4 className='text-4xl  text-dark-700 my-5' >Require OTP</h4>
      <Link className='border p-2 bg-green-600 mt-4' href='/dashboard' >Submit</Link>
    </div>
  )
}

export default page