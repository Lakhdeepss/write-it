

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getnotes } from '@/actions/getNotes'

import { Homedata } from '@/components/homedata'
const Page = async () => {


  const data = await getnotes();


  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">

        {data ? <Homedata data={data} /> : <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Add your first note!!</h1>
          <Image
            className="size-40"
            src="https://media.istockphoto.com/id/1224609563/vector/online-survey-concept-banner-various-people-answer-questions-and-fill-out-questionnaire.jpg?s=612x612&w=is&k=20&c=qpVLWiYmeM0Syi7cEZwbcXs3TK1f599jIjKmmnEXn8Y="
            alt="notes"
            width={400}
            height={400}
          />
        </div>
        }
        {/* Title + Image Row */}

        {/* Button with Icon */}
        <Link href="/addnote/">
          <Button variant="outline" className="mt-6 bg-blue-400 flex items-center gap-2 hover:text-black">
            <Plus className="w-4 h-4" />
            Create Note
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Page
