import LeftSideBar from '@/components/shared/LeftSideBar'
import RIghtSideBar from '@/components/shared/RIghtSideBar'
import Navbar from '@/components/shared/navbar/Navbar'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='background-light850_dark100 relative'>
        <Navbar />
        <div className='flex'>
           <LeftSideBar />
           <section className='mt-28 flex min-h-screen flex-1  flex-col px-6 pb-6 max-md:pb-14 sm:px-14 '>
               <div className='mx-auto w-full  max-w-5xl '>
                {children}
               </div  >
           </section>
          <RIghtSideBar />
        </div>
        <Toaster />
    </div>
  )
}

export default Layout