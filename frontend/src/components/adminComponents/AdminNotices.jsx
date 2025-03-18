import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const AdminNotices = () => {
  const [notices, setNotices] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/admin/notice')
      setNotices(response.data)
    }
    fetchData()
  }, [])

  function approveNotice(id) {
    axios.put('http://localhost:3000/admin/notice', { id, 'status': "approved" })
    window.location.reload()
  }
  function rejectNotice(id){
    axios.delete(`http://localhost:3000/admin/notice/${id}`);
    window.location.reload();
  }
  return (
    <div>
      {notices.map((notice) => (
        <div className='bg-white p-3 rounded-lg my-1'>
          <div className='flex justify-between' key={notice._id}>
            <div>
            <h1 className="rounded-lg ">Title: {notice.title}</h1>
            <p className="p-2 rounded-lg ">Body: {notice.body}</p>
            </div>
            <p className={`bg-[#FFF0BD] rounded-xl px-4 h-7 ${notice.status === "pending" ? "bg-red-400" : "bg-green-400"}`}>{notice.status}</p>
          </div>
          <button className={`btn btn-sm bg-[#C7DB9C] text-white ${notice.status === "approved" ? "hidden" : ""}`}
            onClick={() => approveNotice(notice._id)}>Accept</button>
          <button className="btn btn-sm bg-[#E50046] text-white"
            onClick={() => rejectNotice(notice._id)}>Reject</button>
        </div>
      ))}
    </div>
  )
}

export default AdminNotices