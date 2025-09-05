
import React from 'react'
import { CardComponent } from '@/components/cardComponent'
import { Suspense } from 'react'
import PageLoader from '@/components/pageLaoder'

const page = async () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Suspense fallback={<PageLoader />}>
                <CardComponent />
            </Suspense>
        </div >
    )
}

export default page
