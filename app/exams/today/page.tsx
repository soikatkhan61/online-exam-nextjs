'use client'
import React, { useEffect, useState } from 'react'
import { } from '@/lib/types/exam'
import { getTodaysExamQuestions } from '@/app/admin/exam/examController'
interface Questions {
    id:number,
    question_text: string,
    opt1: string,
    opt2: string,
    opt3: string,
    opt4: string,
}
const Page = () => {
    const [examData, setExamData] = useState<Questions[] | null>(null)
    const [minutes, setMinutes] = useState(20);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const fetchExamData = async () => {
            let res = await getTodaysExamQuestions()
            setExamData(res)
        }
        fetchExamData()
    }, [])

    useEffect(() => {
        let timer = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else {
            if (minutes === 0) {
              clearInterval(timer);
              // Timer has reached zero
              // Perform any necessary actions here
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [minutes, seconds]);
    return (
        <div className='container py-2 relative'>
            <div className='flex justify-between p-2 border rounded bg-primary-200 sticky top-0 left-0 right-0'>
                <div className='flex '>
                    <p>Exam: Hello</p>
                    <p className='mx-2'>Topic: Hello</p>
                </div>
                <p>Time Left: {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
            </div>
            {examData?.map((question) => (
                <div key={question.id} className='border my-2 p-2 bg-white-100 rounded border-slate-400 border-2'>
                    <div className='flex justify-between bg-slate-200 p-1 rounded'>
                        <div className='md:text-lg col-span-7 md:col-span-6 px-2' dangerouslySetInnerHTML={{ __html: question.question_text }} />
                        <div className='text-center'>
                            <p className='border border-slate-500  rounded-full mx-1 bg-white p-1'>{question.id}</p>
                        </div>
                    </div>
                    <hr />
                    <ul className='my-2 rounded'>
                        <li className={`border p-2  `} dangerouslySetInnerHTML={{ __html: question.opt1 }} />
                        <li className={`border p-2 `} dangerouslySetInnerHTML={{ __html: question.opt2 }} />
                        <li className={`border p-2  `} dangerouslySetInnerHTML={{ __html: question.opt3 }} />
                        <li className={`border p-2  `} dangerouslySetInnerHTML={{ __html: question.opt4 }} />
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Page