'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link";
export default function Home() {



  return (
    <div>
      <div className="w-full">asdasd</div>
      <Link href="/about" >
        <Button>Go to About</Button>
      </Link>
    </div>
  );
}

