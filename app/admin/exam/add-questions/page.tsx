import QuestionList from "../QuestionList";
import Question_Form from "../QuestionForm";
import {Providers} from '../../../../redux/provider'

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
const Add_Qus: React.FC = () => {
  return (
   <Providers>
      <Question_Form/>
      <QuestionList/>
   </Providers>
  );
}

export default Add_Qus