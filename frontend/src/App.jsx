import Confession from './components/Confession'
import GlobalChat from './components/GlobalChat'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <div className='bg-blue-100 h-screen w-screen'>
      <div className='bg-white w-screen h-16 flex items-center px-4 cursor-pointer'>
        <div className='text-blue-600 font-bold text-3xl'>KuConnect</div>
      </div>
      <div>
        <Navbar />
        <Confession />
        {/* <GlobalChat /> */}
      </div>
    </div>
  )
}

export default App
