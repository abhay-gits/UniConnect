import React from 'react'

const GlobalChat = () => {
  return (
    <div className='bg-white w-[97%] m-auto rounded-md mt-5 h-96 overflow-y-scroll overflow-hidden'>
        
        <div className='fixed left-3 sm:left-5 bottom-3 sm:w-[97%] w-[94%] md:w-[97%] h-10 flex gap-2'>
        <input type="text" placeholder='your message here...' className='outline outline-2 outline-gray-200 w-full h-full rounded-md px-4' />
        <button className='w-20 rounded-lg bg-blue-500 text-white'>Send</button>
        </div>
    </div>
  )
}

export default GlobalChat