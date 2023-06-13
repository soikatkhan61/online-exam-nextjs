"use server"
import prisma from "@/lib/prisma"
import { Prisma, PrismaClient } from '@prisma/client';

interface ExamData {
  name: string;
  topic: string;
  marks: number;
  duration: number;
  startTime: Date;
  endTime: Date;
}



export default async function createExam(examData: ExamData) {
  try {
    const res = await prisma.exam.create({
      data: {
        name: examData.name,
        topic: examData.topic,
        marks: examData.marks,
        duration: examData.duration,
        startTime: examData.startTime,
        endTime: examData.endTime,
        ans_published: false,
      },
    });

    return { status: 'success', message: 'Exam created successfully',exam:res };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { status: 'error', message: 'Duplicate key error. Exam already exists.',exam:null };
      } else if (error.code === 'P2025') {
        return { status: 'error', message: 'Invalid input provided for creating the exam.',exam:null };
      }
    }
    return { status: 'error', message: 'An error occurred while creating the exam.',exam:null };
  }
}

export async function getAllExams() {
  let res = await prisma.exam.findMany({
    orderBy:{
      id:'desc'
    }
  })
  return res
}

const currentDate = new Date();
const todayStart = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  0,
  0,
  0
);

const todayEnd = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  23,
  59,
  59
);

export async function getTodaysExams() {
  let res = await prisma.exam.findMany({
    where:{
      createdAt: {
        gte: todayStart,
        lt: todayEnd,
      }
    }
  })
  return res
}

export async function getTodaysExamQuestions() {
  let res = await prisma.question.findMany({
      where:{
        examId:1
      }
  })
  return res
}