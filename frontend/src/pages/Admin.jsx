import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Admin = () => {
  const[confessions,setConfessions] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const rawData = await axios.get('http://localhost:3000/admin');
      const data = rawData.data
      console.log(data)
      setConfessions(data)
    }
    fetchData()
  },[])

  function setConfessionStatus(id){
      axios.put('http://localhost:3000/admin',{id,'status':"approved"})
    
  }
  return (
    <div>
      {confessions.map((confession)=>(
        <div key={confession._id}>
        <p>{confession.confession}</p>
        <button onClick={()=> setConfessionStatus(confession._id)}>Accept</button>
        <button>Reject</button>
        </div>
      ))}
    </div>
  )
}

export default Admin