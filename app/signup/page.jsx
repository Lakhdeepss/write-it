import React from 'react'
import SignupFrom from '@/components/SignupFrom'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const SignupPage = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect("/homepage")
    return (
        <div>
            <SignupFrom></SignupFrom>
        </div>
    )
}

export default SignupPage
