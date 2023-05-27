"use client";
import React from 'react'
import Image from 'next/image'
import { signIn,SignInResponse,useSession  } from 'next-auth/react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateUser,setName } from '../../../redux/features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
  phone: string;
  password: string;
}
interface SignInHandlerResponse {
  error: string | null;
  data: SignInResponse | null;
}


interface IProps {
  searchParams?: { [key: string]: string | undefined | string[] };
}

const Login = ({ searchParams }: IProps) => {
  const router = useRouter()
  const schema: ZodType<FormData> = z.object({
    phone: z.string().min(5).max(15),
    password: z.string().min(6).max(20),
  })
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const dispatch = useDispatch();


  const submitData = async (data: FormData) => {
    console.log("data initable");
    const result = await signIn("credentials",{
      phone: data.phone,
      password: data.password,
      redirect:false,
      callbackUrl:"/"
    })
    
    console.log(session);

    if(result?.ok  && result?.error == null ){
      toast.success("Authorized",{
        autoClose: 1000,
      })
      if(session?.user){
        const payload = {
          name: session.user.name,
          phone: session.user.phone,
          role:session.user.role,
        };
        dispatch(updateUser(payload));
      }
      setTimeout(() =>{
        router.push(`/`)
      },1500)
      
    }else{
      toast.error("Invalid Credentials")
    }
  }

return (
  <div className="flex flex-col  min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
    <button className='btn ' onClick={()=>dispatch(setName("soikat"))}>set</button>
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 leading-9">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-center text-gray-600 leading-5 max-w">
        Or
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
          create a new account
        </a>
      </p>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 mb-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        {searchParams?.message && <p className='rounded bg-red-500 text-white text-center py-2'>
          {searchParams?.message}
        </p>}
        <div className='flex justify-center mb-4'>
          <Image src='/logo.svg' alt='logo' width='150' height='80' />
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 leading-5">
              Phone
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input {...register('phone')} id="Phone" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
            </div>
            {errors.phone && <span className='text-red-400'>{errors.phone.message}</span>}
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 leading-5">
              Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input {...register('password')} id="password" type="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " />
            </div>
            {errors.password && <span className='text-red-400'>{errors.password.message}</span>}
          </div>

          <div className="text-sm text-end mt-2 leading-5">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Forgot your password?
            </a>
          </div>
          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button type='submit' className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
  </div>
)
}

export default Login