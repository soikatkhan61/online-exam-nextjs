"use client"
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import createQus from './questionController'
import { addQuestion } from '../../../redux/features/question/addQuestionSlice'
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import  {useSearchParams} from 'next/navigation'

const Question_Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const examId = Number(searchParams.get('exam_id'))
  
  const [data, setData] = useState<string>("");
  const [opt1, setOpt1] = useState<string>("");
  const [opt2, setOpt2] = useState<string>("");
  const [opt3, setOpt3] = useState<string>("");
  const [opt4, setOpt4] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ script: 'sub' }, { script: 'super' }],
      ['clean']
    ],
  }


  const options = [
    { "text": 'Option 1', "value": '1' },
    { "text": 'Option 2', "value": '2' },
    { "text": 'Option 3', "value": '3' },
    { "text": 'Option 4', "value": '4' },
  ]

  const handleOptionChange = (selectedValue:string) => {
    setSelectedOption(selectedValue)
  }

  const handleSubmit = async () => {
    if (data.length < 1 || opt1.length < 1 || opt2.length < 1 || opt3.length < 1 || opt4.length < 1 || data == '<p><br></p>' || opt1 == '<p><br></p>' || opt2 == '<p><br></p>' || opt3 == '<p><br></p>' || opt4 == '<p><br></p></' || selectedOption == null) {
      toast.error("One or more data is empty")
    } else {
      let qus_data = {
        question_text: data,
        opt1,
        opt2,
        opt3,
        opt4,
        examId
      }
      let res = await createQus(qus_data)
      if (res) {
        toast.success("Qus created successfully")
        dispatch(addQuestion(res.result))
      }

    }
  }

  return (
    <div>
      <p>Questions Data</p>
      <div>
        <ReactQuill modules={modules} theme="snow" value={data} onChange={setData} />
        {(data.length < 1 || data == '<p><br></p>') && <p className="text-red-500">Required</p>}
      </div>

      <div className="md:grid grid-cols-2 gap-1 my-3">
        <div>
          <p className="mb-1">Option 1</p>
          <ReactQuill modules={modules} theme="snow" value={opt1} onChange={setOpt1} />
          {(opt1.length < 1 || opt1 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 2</p>
          <ReactQuill modules={modules} theme="snow" value={opt2} onChange={setOpt2} />
          {(opt2.length < 1 || opt2 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 3</p>
          <ReactQuill modules={modules} theme="snow" value={opt3} onChange={setOpt3} />
          {(opt3.length < 1 || opt3 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 4</p>
          <ReactQuill modules={modules} theme="snow" value={opt4} onChange={setOpt4} />
          {(opt4.length < 1 || opt4 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

      </div>

      <div className="my-3 border rounded bg-green-200 p-2">
        <h3 className="mb-1 font-semibold text-gray-900">
          Correct Answer
        </h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
          {options.map((opt,key)=>(
            <li key={key} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center pl-3">
              <input
                id={key+'-list-radio'}
                type="radio"
                defaultValue={opt.value}
                key={key}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              <label
                htmlFor={key+'-list-radio'}
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
              >
                {opt.text}
              </label>
            </div>
          </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit} className={`mt-2 bg-green-600 hover:bg-green-700 text-white  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
      >
        Add Question
      </button>
    </div>
  );
}

export default Question_Form