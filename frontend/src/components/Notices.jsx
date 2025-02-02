import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Notices = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notices,setNotices] = useState([])

    useEffect(()=>{
        async function getNotices() {
            const data = await axios.get('http://localhost:3000/api/notices')
            const notices = data.data
            setNotices(notices)
        }
        getNotices()
    },[])

    function sendNotice(){
        let title = title;
        let body = body;
        if( body && title ){
            axios.post('http://localhost:3000/api/notices', { title, body })
            .then((res)=>{
                console.log(res)
            })
            setTitle('')
            setBody('')
        }
    }
    return (
        <div className="grid grid-cols-3 gap-4 p-4 w-[97%] mt-5 m-auto rounded-md bg-white">
            <div className="col-span-2 bg-green-100 min-h-96 overflow-y-scroll rounded border border-e-green-500">

                {notices.map((notice)=>(
                        <div key={notice._id}>
                        <p className='text-md font-bold '>{notice.title}</p>
                        <p>{notice.body}</p>
                    </div>
                    ))}

            </div>
            <div className="col-span-1 bg-green-100 rounded border border-s-green-500">
                <form action="" className='flex flex-col px-2 h-full'>
                    <label htmlFor="title" className='text-gray-600 text-sm my-1'>Title</label>
                    <input type="text" id='title' 
                    className='w-full rounded-sm'
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}/>
                    <label htmlFor="body" className='text-gray-600 text-sm my-1'>Body</label>
                    <textarea id='body' rows={11} className='w-full rounded-md'
                    value={body}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    ></textarea>
                    <button className='border px-5 py-1 rounded-md bg-green-400 text-white my-2' 
                    onClick={sendNotice}>
                        Publish
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Notices