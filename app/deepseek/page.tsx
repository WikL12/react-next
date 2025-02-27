"use client"
import '@ant-design/v5-patch-for-react-19';

import { Input,Button } from "antd"
import {useState} from "react"
export default function Page() {
    const [value,setValue] = useState<string>('');
    const [answer , setAnswer] = useState<string>('');
    type submits = ()=>void;
    const submit:submits = ()=>{
        // 调用api接口
        let params = {
            message:value
        };
        setValue('');
        fetch('/api/deepseek',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params)
        }).then(res=>res.json()).then(res=>{
            console.log(res);
            setAnswer(res.data);
        });
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-4/5 h-4/5  border border-sky-100 p-2">
                {
                    answer.length>0?answer:'请输入您的问题'
                }
            </div>
            <div className="w-4/5 h-1/5 flex justify-between items-center">
                <Input size="large" type="text" value={value} onChange={(e)=>{setValue(e.target.value)}}></Input>
                <Button size="large" type="primary" onClick={submit}>发送</Button>
            </div>
         
        </div>
    )
}