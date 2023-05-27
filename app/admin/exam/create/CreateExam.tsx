"use client"
import React from 'react'
import {z,ZodType} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

type FormData = {
    name: string,
    topic: string,
    marks: number,
    duration: number,
    startTime: Date,
    endTime: Date
}

const CreateExam: React.FC = () => {
    const schema: ZodType<FormData> = z.object({
        name: z.string().min(3).max(100),
        topic: z.string().min(3).max(100),
        marks: z.number().min(1).max(200),
        duration: z.number().min(1).max(200),
        startTime: z.date(),
        endTime: z.date(),
      });

    const {register,handleSubmit,formState:{errors}}= useForm<FormData>({resolver: zodResolver(schema)});

    const submitData = async (data:FormData) => {
        console.log("hello");
        
        console.log(data);
    }

    return (
        <div className='border p-5 rounded mb-4'>
            <form  onSubmit={handleSubmit(submitData)}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Exam Name
                    </label>
                    <input
                        {...register('name')}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                    />
                    {errors.name && <span className='text-red-400'>{errors.name.message}</span>}
                </div>
                <div className='md:grid grid-cols-3 gap-1'>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Topic
                        </label>
                        <input
                            {...register('topic')}
                            type="text" id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.topic && <span className='text-red-400'>{errors.topic.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Duration
                        </label>
                        <input
                            {...register('duration',{valueAsNumber:true})}
                            type="number" id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.duration && <span className='text-red-400'>{errors.duration.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Marks
                        </label>
                        <input
                            {...register('marks',{valueAsNumber:true})}
                            type="number" id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                        {errors.marks && <span className='text-red-400'>{errors.marks.message}</span>}
                    </div>
                </div>

                <div className='flex'>
                    <div className="mb-6">
                        <label
                            htmlFor="starting"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Starting At
                        </label>
                        <input
                            {...register('startTime',{valueAsDate:true})}
                            type="datetime-local" id="starting"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.startTime && <span className='text-red-400'>{errors.startTime.message}</span>}
                    </div>
                    <div className="mb-6 mx-2">
                        <label
                            htmlFor="ending"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Starting At
                        </label>
                        <input
                            {...register('endTime',{valueAsDate:true})}
                            type="datetime-local" id="ending"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.endTime && <span className='text-red-400'>{errors.endTime.message}</span>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateExam