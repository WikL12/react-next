import {readFileSync} from "fs"
import path from "path"
import { NextRequest,NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-f8164523a3664e31a15fa63543ae7700'
});

async function main(question:string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: question }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}



export async function POST(req:NextRequest){
    const requset = await req.json();
    console.log(requset);
   const result = await main(requset.message);
    console.log(result);
  return  NextResponse.json({
    data:result,
  })
} 