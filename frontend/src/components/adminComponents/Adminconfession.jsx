import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Adminconfession = () => {
    const [confessions, setConfessions] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const rawData = await axios.get('http://localhost:3000/admin');
        const data = rawData.data
        setConfessions(data.reverse())
      }
      fetchData()
    }, [])
  
    function approveConfession(id) {
      axios.put('http://localhost:3000/admin', { id, 'status': "approved" })
      window.location.reload()
    }
    function rejectConfession(id){
      axios.delete(`http://localhost:3000/admin/${id}`);
      window.location.reload();
    }
    return (
      <div className='p-2 max-h-5/6'>
        {confessions.map((confession) => (
          <div className='bg-white p-3 rounded-lg my-1'>
            <div className='flex justify-between'  key={confession._id}>
            <p className=" p-2 rounded-lg mb-2">{confession.confession}</p>
            <p className={`bg-[#FFF0BD] rounded-xl px-4 h-7 ${confession.status === "pending"?"bg-red-400":"bg-green-400"}`}>{confession.status}</p>
            </div>
            <button className={`btn btn-sm bg-[#C7DB9C] text-white ${confession.status === "approved"?"hidden":""}`}
            onClick={() => approveConfession(confession._id)}>Accept</button>
            <button className="btn btn-sm bg-[#E50046] text-white"
            onClick={() => rejectConfession(confession._id)}>Reject</button>
          </div>
        ))}
      </div>
    )
}

export default Adminconfession