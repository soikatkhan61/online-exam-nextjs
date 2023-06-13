"use server"
import prisma from "@/lib/prisma"
import { Prisma, PrismaClient } from '@prisma/client';

interface QusData {
  question_text: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  examId:number;
}

export default async function createQus(data: QusData) {
  try {
    const res = await prisma.question.create({
      data: {
        question_text: data.question_text,
        opt1: data.opt1,
        opt2: data.opt2,
        opt3: data.opt3,
        opt4: data.opt4,
        ans: '1',
        exam:{
          connect:{id:data.examId}
        }
      },
    });

    console.log(res);

    return { status: 'success', message: 'Exam created successfully',result: res};
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { status: 'error', message: 'Duplicate key error. Exam already exists.',result:null };
      } else if (error.code === 'P2025') {
        return { status: 'error', message: 'Invalid input provided for creating the exam.',result:null };
      }
    }
    return { status: 'error', message: 'An error occurred while creating the exam.',result:null };
  }
}

export async function getQuestionByExamId(examId: number) {
  try {
    const res = await prisma.question.findMany({
      where:{
        examId:examId
      }
    });
    return {status: 'error',  res: res};
  } catch (error) {
    return {status: 'error',  res: null};
  }
}

