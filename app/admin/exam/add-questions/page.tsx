import QuestionList from "../QuestionList";
import Question_Form from "../QuestionForm";
import {Providers} from '../../../../redux/provider'

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    exam_id?: string;
  };
};
const Add_Qus: React.FC = (props: Props) => {
  let exam_id = props.searchParams?.exam_id;
  if(!exam_id){
    return <p>Please select exam first</p>
  }
  return (
   <Providers>
      <Question_Form/>
      <QuestionList/>
   </Providers>
  );
}

export default Add_Qus