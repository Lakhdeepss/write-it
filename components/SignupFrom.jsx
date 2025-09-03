'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

const SignupFrom = () => {

    const [Name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const postuser = async (e) => {
        e.preventDefault();
        if (!Name || !email || !password) {
            setError("All fields are required");
            return;
        }
        try {
            const res = await fetch('/api/userExists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const { user } = await res.json();

            if (user) {
                setError("User already exists");
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: Name, email, password }),
            });

            if (!response.ok) {

                throw new Error('Failed to create user');
            }
            router.push('/');
            const form = e.target
            form.reset();
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            setError("Registration failed");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="border-t-4 border-indigo-500 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Sign up</h1>
                <form action="" className="" onSubmit={postuser}>
                    <div>
                        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="full-name"
                                name="full-name"
                                onChange={e => setFullName(e.target.value)}
                                required
                                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>


                        <div className="mt-1 mb-2">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    <div> have an account? <a href="/" className="text-indigo-600 hover:text-indigo-500">Sign in</a></div>
                </form>
            </div>
        </div>
    );
};

export default SignupFrom
