import { Route, Routes } from 'react-router'

import Confession from './components/Confession'
import GlobalChat from './components/GlobalChat'
import Navbar from './components/Navbar'
import './App.css'
import Notices from './components/Notices'

function App() {

  return (
    <div className='bg-blue-100 h-screen w-screen overflow-hidden'>
      <div className='bg-white w-screen h-16 flex items-center px-4 cursor-pointer'>
        <div className='text-blue-600 font-bold text-3xl'>KuConnect</div>
      </div>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Confession/>}/>
          <Route path='/chat' element={<GlobalChat/>}/>
          <Route path='/notice' element={<Notices/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
