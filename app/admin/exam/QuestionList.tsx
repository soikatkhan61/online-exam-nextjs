"use client"
import prisma from '@/lib/prisma'
import React, { useEffect, useState } from 'react'
import { getQuestionByExamId } from './questionController'
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addQuestion, setLoading } from '../../../redux/features/question/addQuestionSlice'
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
interface QuestionListProps {
    questions: Question[] | undefined;
}
const QuestionList: React.FC = () => {
    const { questions, loading } = useAppSelector((state) => state.questions) as { questions: Question[], loading: boolean };
    const dispatch = useAppDispatch()
    console.log(questions);
    useEffect(() => {
        const FetchQusById = async () => {
            dispatch(setLoading(true))
            const res: Question[] | undefined = await getQuestionByExamId('1')
            console.log(res);
            if (questions.length == 0) {
                dispatch(addQuestion(res))
            }
            dispatch(setLoading(false))
        }
        FetchQusById()
    }, [dispatch])
    if (loading) {
        return <p>Loading...</p>
    }
    if (questions.length == 0) {
        return <p>No questions add yet</p>
    }
    console.log(questions);

    return (
        <div>
            
            {questions
            .slice() // Create a shallow copy of the questions array
            .sort((a, b) => b.id - a.id) 
            .map((question) => (
                <div key={question.id}>
                    <h1 className='text-green-500' dangerouslySetInnerHTML={{ __html: question.question_text }} />
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: question.opt1 }} />
                        <li dangerouslySetInnerHTML={{ __html: question.opt2 }} />
                        <li dangerouslySetInnerHTML={{ __html: question.opt3 }} />
                        <li dangerouslySetInnerHTML={{ __html: question.opt4 }} />
                    </ul>
                    <p>Answer: {question.ans}</p>
                </div>
            ))}
        </div>
    )
}

export default QuestionList