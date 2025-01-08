
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../app/globals.css";
export default function About({name}:{name:any}) {
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

export  async function getStaticProps(context:any): Promise<any>{
  console.log("getStaticProps",context);
  return {
    props: {
      name:'form getStaticProps',
    }
  }
}

