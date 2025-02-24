import {readFileSync} from "fs"
import path from "path"
export default function handler(req, res) {
    const data = getFileData();
  res.status(200).json({ result:data});
}


function getFileData(){
  const filePath = path.join(process.cwd(), 'data','01.json');
  console.log(filePath);
  const fileData = readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
} 