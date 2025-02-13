import React from 'react'
import './loader.css'

export default function Loader() {
  return (
    <div className=' flex flex-col items-center gap-5 h-auto md:h-[5rem]'>
        <p className='font-bold text-xl text-[#514b82]'>Loading</p>
        <span className='loader' />
    </div>
  )
}