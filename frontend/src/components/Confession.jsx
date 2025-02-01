import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Confession = () => {

  const [ input, setInput ] = useState('');
  const [ confession, setConfession ] = useState([]);

  useEffect(()=>{
    async function getConfession() {
      const data = await axios.get('http://localhost:3000/api/confessions')
      const confession = data.data;
      setConfession(confession.reverse())
    }
    getConfession()
  },[])

  function sendConfession(){
    let confession = document.getElementById('input').value;
    if(confession ){
      axios.post('http://localhost:3000/api/confessions',{ confession })
      .then((res)=>{
        console.log(res)
      })
      setInput('')
    }else{
      alert('Confession should be more than 20 words')
    }
  }

  return (

    <div className='bg-white w-[97%] m-auto rounded-md mt-5 h-96 overflow-y-scroll overflow-hidden p-4'>   
        {confession.map((confession,index)=>(
          <div 
          className={`max-w-max mb-3 mt-2 px-3 py-1 rounded ${ index % 2 === 0?"bg-pink-200":"bg-purple-200"}`}
          key={confession._id}>
            <p>{confession.confession}</p>
            <p className='text-right text-gray-600 text-sm'>{confession.createdAt.split("T")[0]}</p>
          </div>
        )
        )}
        <div className='fixed left-3 sm:left-5 bottom-3 sm:w-[97%] w-[94%] md:w-[97%] h-10 flex gap-2'>
        <input type="text"
        placeholder='your confession here...'
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        id='input'
        className='outline outline-2 outline-gray-200 w-full h-full rounded-md px-4' />
        <button className='w-20 rounded-lg bg-purple-500 text-white' 
        onClick={sendConfession}>
          Send
        </button>
        </div>
    </div>
  )
}

export default Confession;