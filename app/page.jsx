import React from 'react'
import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const SigninPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) redirect("homepage")
    return (
        <div>
            <LoginForm></LoginForm>
        </div>
    )
}

export default SigninPage
