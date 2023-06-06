"use client"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import createQus from './questionController'
import {addQuestion} from '../../../redux/features/question/addQuestionSlice'
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
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

interface AddQusProps {
    onAddQuestion: (newQuestion: Question) => void;
}

const Question_Form: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [data, setData] = useState<string>("");
  const [opt1, setOpt1] = useState<string>("");
  const [opt2, setOpt2] = useState<string>("");
  const [opt3, setOpt3] = useState<string>("");
  const [opt4, setOpt4] = useState<string>("");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const handleSubmit = async () => {
    if (data.length < 1 || opt1.length < 1 || opt2.length < 1 || opt3.length < 1 || opt4.length < 1 || data == '<p><br></p>' || opt1 == '<p><br></p>' || opt2 == '<p><br></p>' || opt3 == '<p><br></p>' || opt4 == '<p><br></p></' ) {
      toast.error("One or more data is empty")
    }else{
      let qus_data = {
        question_text:data,
        opt1,
        opt2,
        opt3,
        opt4
      }
      let res = await createQus(qus_data)
      console.log(res.result);
      if(res){
        toast.success("Qus created successfully")
        dispatch(addQuestion(res.result))
      }
      
    }
    console.log(data, opt1, opt2, opt3, opt4);
  }

  return (
    <div>
      <p>Questions Data</p>
      <div>
        <ReactQuill modules={modules} theme="snow" value={data} onChange={setData} />
        {data.length}
        {(data.length < 1 || data == '<p><br></p>') && <p className="text-red-500">Required</p>}
      </div>

      <div className="md:grid grid-cols-2 gap-1 my-3">
        <div>
          <p className="mb-1">Option 1</p>
          <ReactQuill modules={modules} theme="snow" value={opt1} onChange={setOpt1}/>
          {opt1}
          {(opt1.length < 1 || opt1 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 2</p>
          <ReactQuill modules={modules} theme="snow" value={opt2} onChange={setOpt2}/>
          {opt2.length}
          {(opt2.length < 1 || opt2 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 3</p>
          <ReactQuill modules={modules} theme="snow" value={opt3} onChange={setOpt3}/>
          {opt3.length}
          {(opt3.length < 1 || opt3 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <p className="mb-1">Option 4</p>
          <ReactQuill modules={modules} theme="snow" value={opt4} onChange={setOpt4}/>
          {opt4.length}
          {(opt4.length < 1 || opt4 == '<p><br></p>') && <p className="text-red-500">Required</p>}
        </div>

      </div>
      <button onClick={handleSubmit} className={`mt-2 bg-green-600 hover:bg-green-700 text-white  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
      >
        Add Question
      </button>
    </div>
  );
}

export default Question_Form