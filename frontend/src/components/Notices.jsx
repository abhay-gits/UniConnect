import React from 'react'

const Notices = () => {
    return (
        <div className="grid grid-cols-3 gap-4 p-4 w-[97%] mt-5 m-auto rounded-md bg-white">
            <div className="col-span-2 bg-green-100 min-h-96 overflow-y-scroll rounded border border-e-green-500"></div>
            <div className="col-span-1 bg-green-100 rounded border border-s-green-500">
                <form action="" className='flex flex-col px-2 h-full'>
                    <label htmlFor="text" className='text-gray-600 text-sm my-1'>Title</label>
                    <input type="text" id='text' className='w-full rounded-sm'/>
                    <label htmlFor="body" className='text-gray-600 text-sm my-1'>Body</label>
                    <textarea id='body' rows={11} className='w-full rounded-md'></textarea>
                    <button className='border px-5 py-1 rounded-md bg-green-400 text-white my-2'>
                        Publish
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Notices