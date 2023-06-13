"use client"
import React, { useEffect, useState } from 'react'
import { getAllExams } from './examController';
import Link from 'next/link';
import { ExamData } from '@/lib/types/exam';

const Exam: React.FC = () => {
  const [exams, setExams] = useState<ExamData[] | null>([])
  useEffect(() => {
    const fetchExamsData = async () => {
      let res = await getAllExams()
      setExams(res)
    }
    fetchExamsData()
  }, [])
  return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        {
          exams?.length == 0 ? <p>No Data</p>
            :
            <table className="w-full text-sm text-left text-primary-100">
              <thead className="text-xs text-white uppercase bg-primary-600 border-b border-primary-400 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-primary-900">
                    ID
                  </th>
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
                {exams?.map((e, i) => {
                  return <tr key={i} className="bg-primary-500 border-b border-primary-400 text-black">
                    <td className="px-6 py-4 bg-slate-100">{e.id}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium bg-slate-50 whitespace-nowrap"
                    >
                      {e.name}
                    </td>
                    <td className="px-6 py-4 bg-slate-100">{e.topic}</td>
                    <td className="px-6 py-4 bg-slate-50">{e.marks}</td>
                    <td className="px-6 py-4 bg-slate-100" >{e.duration}</td>
                    <td className="px-6 py-4 bg-slate-50">
                      <a href="#" className="font-medium mx-2 hover:underline">
                        Edit
                      </a>
                      |
                      <Link href={`/admin/exam/add-questions?exam_id=${e.id}`} className="font-medium  mx-2  hover:underline">
                        Add Qus
                      </Link>
                      |
                      <a href="#" className="font-medium text-red-500 mx-2  hover:underline">
                        Delete
                      </a>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
        }
      </div>

  )
}

export default Exam