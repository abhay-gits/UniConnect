import { Route, Routes, useLocation } from 'react-router'
import './App.css'

import Confession from './components/Confession'
import Navbar from './components/Navbar'
import Notices from './components/Notices'
import Admin from './pages/Admin'
import Adminconfession from './components/adminComponents/Adminconfession'
import AdminNotices from './components/adminComponents/AdminNotices'
import Chat from './components/Chat'
function App() {
  const location = useLocation();
  const pageNames = {
    '/':"Confession",
    '/notice':"Notices",
  }
  return (
    <div className='bg-blue-100 h-screen w-screen overflow-x-hidden'>
      {!location.pathname.startsWith('/admin') && 
      <div className='bg-white w-screen h-16 flex items-center px-4 cursor-pointer justify-between'>
        <div className='text-blue-600 font-bold text-3xl'>KuConnect</div>
        <p className='text-lg font-bold'>
          {pageNames[location.pathname]}
        </p>
      </div>}
      <div>
        {!location.pathname.startsWith('/admin') && <Navbar/>}
        <Routes>
          <Route path='/' element={<Confession/>}/>
          <Route path='/notice' element={<Notices/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/admin' element={<Admin/>}>
            <Route index element={<Adminconfession/>}/>
            <Route path='notice' element={<AdminNotices/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App