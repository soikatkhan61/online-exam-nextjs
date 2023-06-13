"use client"
import React, { useEffect, useState } from 'react'
import { getQuestionByExamId } from './questionController'
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addQuestion,clearQuestion, setLoading } from '../../../redux/features/question/addQuestionSlice'
import { useSearchParams } from 'next/navigation'

interface Question {
    id: number;
    question_text: string;
    opt1: string;
    opt2: string;
    opt3: string;
    opt4: string;
    ans: string;
    examId: number;
}

const QuestionList: React.FC = () => {
    const { questions, loading } = useAppSelector((state) => state.questions) as { questions: Question[], loading: boolean };
    const searchParams = useSearchParams()
    const examId = Number(searchParams.get('exam_id'))
    const dispatch = useAppDispatch()
    useEffect(() => {
        const FetchQusById = async () => {
            dispatch(setLoading(true))
            const res: { status: string; res: Question[] | null; }  = await getQuestionByExamId(examId)
            dispatch(clearQuestion())
            dispatch(addQuestion(res.res))
            dispatch(setLoading(false))
        }
        FetchQusById()
    }, [dispatch,examId])

    if (loading) {
        return <p>Loading...</p>
    }
    if (questions.length == 0) {
        return <p>No questions add yet</p>
    }
    return (
        <div className='mt-5'>
            {questions
                .slice() // Create a shallow copy of the questions array
                .sort((a, b) => b.id - a.id)
                .map((question) => (
                    <div key={question.id} className='border my-2 p-2 bg-white-100 rounded border-slate-400 border-2'>
                        <div className='grid grid-cols-8 gap-1 bg-slate-200 p-1 rounded'>
                            <h1 className='md:text-lg col-span-5 md:col-span-6' dangerouslySetInnerHTML={{ __html: question.question_text }} />
                            <div className='col-span-2 flex justify-between items-center'>
                                <p className='border border-slate-500  rounded-full mx-1 bg-white p-1'>{question.id}</p>
                                <p className='text-blue-600 ml-1'>Edit</p>
                                <p className='text-red-600 ml-1'>Delete</p>
                            </div>
                        </div>
                        <hr />
                        <ul className='my-2 rounded'>
                            <li className={`border p-2 ${question.ans == '1' && 'bg-green-200'} `} dangerouslySetInnerHTML={{ __html: question.opt1 }} />
                            <li className={`border p-2 ${question.ans == '2' && 'bg-green-200'} `} dangerouslySetInnerHTML={{ __html: question.opt2 }} />
                            <li className={`border p-2 ${question.ans == '3' && 'bg-green-200'} `} dangerouslySetInnerHTML={{ __html: question.opt3 }} />
                            <li className={`border p-2 ${question.ans == '4' && 'bg-green-200'} `} dangerouslySetInnerHTML={{ __html: question.opt4 }} />
                        </ul>
                    </div>
                ))}
        </div>
    )
}

export default QuestionList