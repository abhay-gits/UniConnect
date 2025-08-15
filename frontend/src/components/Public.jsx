import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Public = () => {

  const [input, setInput] = useState('');
  const [confession, setConfession] = useState([]);

  useEffect(() => {
    async function getConfession() {
      const data = await axios.get('https://uniconnect-kzn1.onrender.com/api/confessions')
      const confession = data.data;
      setConfession(confession.reverse())
    }
    getConfession()
  }, [])

  function sendConfession() {
    let confession = input
    if (confession && confession.length > 30) {
      axios.post('https://uniconnect-kzn1.onrender.com/api/confessions', { confession })
        .then((res) => {
          console.log(res)
        })
      setInput('')
    } else {
      alert('Confession should be more than 30 words')
    }
  }

  return (

    <div className='bg-white w-[94vw] sm:w-[97vw] m-auto overflow-y-scroll overflow-hidden p-4 rounded-md mt-5 min-h-[70vh] max-h-[70vh]'>
      {confession.map((confession, index) => (

        <div className="chat chat-start" >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s" />
            </div>
          </div>
          <div className={`chat-bubble ${index % 2 === 0 ? "chat-bubble-info" : "chat-bubble-primary"}`}>{confession.confession}</div>
        </div>
      )
      )}
      <div className='fixed left-5 sm:left-5 bottom-3 sm:w-[97%] w-[90%] md:w-[97%] h-10 flex gap-2'>
        <input type="text"
          placeholder='Your Public Message here...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id='input'
          className='outline outline-2 outline-gray-200 w-full h-full rounded-md px-4' />
        <button className='w-16 rounded-lg bg-blue-500 flex justify-center items-center'
          onClick={sendConfession}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" stroke-width="1.5" />
            <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div >
  )
}

export default Public;