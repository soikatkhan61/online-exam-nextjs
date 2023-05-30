"use client"
import React, { useEffect, useState } from 'react'
import { getAllExams } from './examController';
interface ExamData {
  id: number;
  name: string;
  topic: string;
  marks: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  ans_published: boolean;
  questions?: number[]; // Add questions property here
  createdAt: Date;
}
const page: React.FC = () => {
  const [exams, setExams] = useState<ExamData[] | null>([])
  useEffect(() => {
    const fetchExamsData = async () => {
      let res = await getAllExams()
      console.log(res[0]);

      setExams(res)
    }
    fetchExamsData()
  }, [])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-primary-100">
        <thead className="text-xs text-white uppercase bg-primary-600 border-b border-primary-400 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3 bg-primary-800">
              Exam Name
            </th>
            <th scope="col" className="px-6 py-3 bg-primary-900">
              Topic
            </th>
            <th scope="col" className="px-6 py-3 bg-primary-800">
              Marks
            </th>
            <th scope="col" className="px-6 py-3 bg-primary-900">
              Duration
            </th>
            <th scope="col" className="px-6 py-3 bg-primary-800">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            exams?.length == 0 ? <p>No Data</p>
              :
              <>
                {exams?.map((e, i) => {
                  return <tr className="bg-primary-500 border-b border-primary-400 text-black">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium bg-primary-100 whitespace-nowrap"
                    >
                      {e.name}
                    </th>
                    <td className="px-6 py-4 bg-primary-200">{e.topic}</td>
                    <td className="px-6 py-4 bg-primary-100">{e.marks}</td>
                    <td className="px-6 py-4 bg-primary-200" >{e.duration}</td>
                    <td className="px-6 py-4 bg-primary-100">
                      <a href="#" className="font-medium  hover:underline">
                        Edit
                      </a>
                      <a href="#" className="font-medium text-red-500 mx-2  hover:underline">
                        Delete
                      </a>
                    </td>
                  </tr>
                })}
             </>
          }

        </tbody>
      </table>
    </div>
  )
}

export default page