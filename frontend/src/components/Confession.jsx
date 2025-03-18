import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Confession = () => {

  const [input, setInput] = useState('');
  const [confession, setConfession] = useState([]);

  useEffect(() => {
    async function getConfession() {
      const data = await axios.get('http://localhost:3000/api/confessions')
      const confession = data.data;
      setConfession(confession.reverse())
    }
    getConfession()
  }, [])

  function sendConfession() {
    let confession = input
    if (confession && confession.length > 30) {
      axios.post('http://localhost:3000/api/confessions', { confession })
        .then((res) => {
          console.log(res)
        })
      setInput('')
    } else {
      alert('Confession should be more than 30 words')
    }
  }

  return (

    <div className='bg-white w-[94vw] sm:w-[97vw] m-auto overflow-y-scroll overflow-hidden p-4 rounded-md mt-5 min-h-[67vh] max-h-[67vh]'>
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
          placeholder='your confession here...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id='input'
          className='outline outline-2 outline-gray-200 w-full h-full rounded-md px-4' />
        <button className='w-20 rounded-lg bg-purple-500 text-white'
          onClick={sendConfession}>
          Send
        </button>
      </div>
    </div >
  )
}

export default Confession;