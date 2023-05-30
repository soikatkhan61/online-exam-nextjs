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

    console.log(res);

    return { status: 'success', message: 'Exam created successfully' };
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { status: 'error', message: 'Duplicate key error. Exam already exists.' };
      } else if (error.code === 'P2025') {
        return { status: 'error', message: 'Invalid input provided for creating the exam.' };
      }
    }
    return { status: 'error', message: 'An error occurred while creating the exam.' };
  }
}

export async function getAllExams() {
  let res = await prisma.exam.findMany()
  return res
}