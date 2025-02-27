"use client"
import { Button ,message} from 'antd';
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useState } from "react";
import '@ant-design/v5-patch-for-react-19';

export default function Home() {
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="">this is a nextjs project</div>
      <Link href="/about" >
        <Button>Go to About</Button>
      </Link>
      <Link href="/home" >
        <Button>Go to home</Button>
      </Link>
      <Link href="/langChain" >
        <Button>Go to langChain</Button>
      </Link>
      <Link href="/typingGame" >
        <Button>Go to typingGame</Button>
      </Link>
      <Link href="/deepseek" >
        <Button>Go to deepseek</Button>
      </Link>
    </div>
  );
}

