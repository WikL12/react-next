'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter()


  return (
    <div>
      <div className="w-full">asdasd</div>
      <Link href="/about" >
        <Button>Go to About</Button>
      </Link>
    </div>
  );
}

