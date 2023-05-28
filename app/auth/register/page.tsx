"use client"
import React from 'react'
import Image from 'next/image';
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {useState,useEffect} from 'react'
import RegistrationState from '@/component/auth/RegistrationState';
import { useRouter } from 'next/navigation';

type FormData = {
  fullName: string;
  zilla: string;
  college: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [stateOfRegistration,setStateOfRegistration] = useState<Number | null>(null);
  const [statusText,setStatusText] = useState<String | null | undefined>(null);
  const router = useRouter()
  
  useEffect(() => {
    const tst = ()=>{
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    }

    tst()
  },[])


  const schema: ZodType<FormData> = z.object({
    fullName: z.string().min(2).max(30),
    zilla: z.string().min(2).max(30),
    college: z.string().min(5).max(100),
    phone: z.string().min(5).max(15),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ["confirmPassword"]
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const submitData = async (data: FormData) => {
    setStateOfRegistration(1)
    setStatusText("Proccessing...")
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        zilla: data.zilla,
        college: data.college,
        phone: data.phone,
        password: data.password,
      }),
    });
    
    if(res.status == 200){
      let userObj = await res.json()
      setStateOfRegistration(200)
      setStatusText("Registration successful")
      setTimeout(() =>{
        setStateOfRegistration(3)
        setStatusText("Redirecting...")  
        router.push(`/auth/otp?phone=${userObj.phone}`)
      },1000)
    }else if(res.status == 500){
      setStateOfRegistration(4)
      setStatusText(res.statusText)
    }
  }

  return (
    <div className="flex flex-col justify-center  py-6 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 leading-9">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 leading-5 max-w">
          Or
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Login
          </a>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        {stateOfRegistration !== null && <RegistrationState code={stateOfRegistration} statusText={statusText} />}
          <div className='flex justify-center'>
            <Image src='/logo.svg' alt='logo' width='150' height='80' />
          </div>
          <form onSubmit={handleSubmit(submitData)}>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 leading-5">
                Full Name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('fullName')} id="fullname" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.fullName && <span className='text-red-400'>{errors.fullName.message}</span>}
            </div>
            <div className="mt-6">
              <label htmlFor="Zilla" className="block text-sm font-medium text-gray-700 leading-5">
                Zilla
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('zilla')} id="Zilla" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.zilla && <span className='text-red-400'>{errors.zilla.message}</span>}
            </div>

            <div className="mt-6">
              <label htmlFor="College" className="block text-sm font-medium text-gray-700 leading-5">
                Department
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('college')} id="College" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.college && <span className='text-red-400'>{errors.college.message}</span>}
            </div>

            <div className="mt-6">
              <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 leading-5">
                Student ID
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('phone')} id="Phone" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.phone && <span className='text-red-400'>{errors.phone.message}</span>}
            </div>

            <div className="mt-6">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700 leading-5">
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('password')} id="Password" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.password && <span className='text-red-400'>{errors.password.message}</span>}
            </div>
            <div className="mt-6">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 leading-5">
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...register('confirmPassword')} id="confirm_password" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
              </div>
              {errors.confirmPassword && <span className='text-red-400'>{errors.confirmPassword.message}</span>}
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Register
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register