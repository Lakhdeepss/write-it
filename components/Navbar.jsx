import React from 'react'
import { Button } from '@/components/ui/button'
const Navbar = () => {
    return (
        <div className='flex bg-gray-800 text-white justify-between px-4 py-2 shadow-md'>
            <h1 className='text-2xl font-bold'>WriteIt</h1>

            <div className='flex gap-1'>
                <Button className={"cursor-pointer bg-blue-500"} >Sign In</Button>
                <Button className={"cursor-pointer bg-red-500"}>Sign Up</Button></div>
        </div>
    )
}

export default Navbar
