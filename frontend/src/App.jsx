import { Route, Routes, useLocation } from 'react-router'
import './App.css'

import Confession from './components/Confession'
import GlobalChat from './components/GlobalChat'
import Navbar from './components/Navbar'
import Notices from './components/Notices'
import Marketplace from './components/Marketplace'
import LostFound from './components/LostFound'
import Admin from './pages/admin'

function App() {
  const location = useLocation();
  const pageNames = {
    '/':"Confession",
    '/chat':"AllChat",
    '/notice':"Notices",
    '/market':"MarketPlace",
    '/laf':"Lost & Found",
  }
  return (
    <div className='bg-blue-100 h-screen w-screen overflow-hidden'>
      <div className='bg-white w-screen h-16 flex items-center px-4 cursor-pointer justify-between'>
        <div className='text-blue-600 font-bold text-3xl'>KuConnect</div>
        <p className='text-lg font-bold'>
          {pageNames[location.pathname]}
        </p>
      </div>
      <div>
        {location.pathname != '/admin' && <Navbar/>}
        <Routes>
          <Route path='/' element={<Confession/>}/>
          <Route path='/chat' element={<GlobalChat/>}/>
          <Route path='/notice' element={<Notices/>}/>
          <Route path='/market' element={<Marketplace/>}/>
          <Route path='/laf' element={<LostFound/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App