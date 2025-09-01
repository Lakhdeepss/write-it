
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export const Homedata = ({ data }) => {
    return (

        <div className=" grid gap-4 p-4 w-full max-w-lg">
            {data.map((note) => (
                <div
                    key={note._id}
                    className="bg-slate-100 border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                    <div className='flex justify-between '>
                        <h2 className="font-semibold text-xl">{note.title}</h2>
                        <Link href={`/notesDetail/${note._id}`}   ><Button className='text-slate-500' variant="link">view</Button></Link>
                    </div>
                    <p className="text-gray-500">{note.content}</p>
                </div>
            ))}
        </div>

    )
}


