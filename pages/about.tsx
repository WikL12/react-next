
import { GetStaticProps } from 'next'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../app/globals.css";
export default function About({name}:PostProps) {
  const [names,setNames] = useState('')
  const router = useRouter()
  fetch('http://localhost:3000/api/getName').then(res=>res.json()).then(res=>{
    console.log(res)
    setNames(res.result.name)
  })

  return (
    <div>
      <div className="w-full">this is about page</div>
      <div className="w-full">data is form {name}</div>
      <div className="w-full">data is form {names}</div>
      <Button onClick={()=>router.push('/')}>go back</Button>
    </div>
  );
}
interface PostProps {
    name: string
}
export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  console.log("getStaticProps", context);
  return {
    props: {
      name: 'from getStaticProps',
    }
  }
}

