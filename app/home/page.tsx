"use client"
import '@ant-design/v5-patch-for-react-19';
import { Button ,message} from 'antd';
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
export default function About() {
  const [names,setNames] = useState('')
  const router = useRouter()
 useEffect(()=>{
  fetch('/api/getName',{
    body: JSON.stringify({name:'test'}),
    method: 'POST',
  }).then(res=>res.json()).then(res=>{
    console.log(res.data.name)
    setNames(res.data.name)
  })
 },[])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {names}
      <Button onClick={()=>router.push('/')}>go back</Button>
    </div>
  );
}



