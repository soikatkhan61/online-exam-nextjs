import React from 'react'
import {useState,useEffect} from 'react'
const RegistrationState = ({ code,statusText }:{ code: any ,statusText:any }) => {
    const [boxColor,setBoxColor] = useState<String | null>(null)
    useEffect(() => {
        if (code === 1) {
          setBoxColor('bg-blue-600');
        } else if (code === 200) {
          setBoxColor('bg-green-600');
        } else if (code === 3) {
          setBoxColor('bg-yellow-500');
        } else if (code === 4){
            setBoxColor('bg-red-600');
        }
      }, [code]);
  return (
    <div className={`${boxColor} text-white bg-blue-400 mb-2 rounded py-3 text-center`}>
            {statusText}
     </div>
  )
}

export default RegistrationState