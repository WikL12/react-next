"use client"
import '@ant-design/v5-patch-for-react-19';

import { Button ,message} from 'antd';
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
export default function About() {
  const [names,setNames] = useState('')
  const router = useRouter()
  fetch('/api/getName').then(res=>res.json()).then(res=>{
    console.log(res)
    setNames(res.result.name)
  })
  useEffect(()=>{
    message.open({
      type: 'success',
      content: 'This is a success message',
    });
  },[])
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      home

      about
      another
      same
      <Button onClick={()=>router.push('/')}>go back</Button>
    </div>
  );
}



