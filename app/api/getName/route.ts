import {readFileSync} from "fs"
import path from "path"
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
  const requset = await req.json();
    console.log(requset);
  const filePath = path.join(process.cwd(), 'data','01.json');
  console.log(filePath);
  const fileData = readFileSync(filePath, 'utf8');
  return  NextResponse.json({
    data:JSON.parse(fileData),
  })
} 