import { Link, useLocation } from 'react-router'
import publicIcon from '../assets/public.svg'
import chatIcon from '../assets/chat.svg'
import noticeIcon from '../assets/notice.svg'

const Navbar = () => {
    const location = useLocation()

    return (
        <div className='bg-gray-100 h-10 w-[94vw] mt-4 rounded-2xl m-auto flex gap-0 sm:gap-20 justify-around items-center'>
            {/* Public Tab */}
            <Link to="/">
                <div className={`flex gap-1 sm:gap-2 px-3 sm:px-20 py-1 rounded-xl cursor-pointer ${location.pathname === '/' ? "bg-blue-400" : ""}`}>
                    <img src={publicIcon} alt="Public" className="w-6 h-6" />
                    <p>Public</p>
                </div>
            </Link>
            {/* Notices */}
            <Link to="/notice">
                <div className={`flex gap-1 sm:gap-2 px-3 sm:px-20 py-1 rounded-xl cursor-pointer ${location.pathname === '/notice' ? "bg-green-300" : ""}`}>
                    <img src={noticeIcon} alt="Notices" className="w-6 h-6" />
                    <p>Notices</p>
                </div>
            </Link>
            {/* Chat */}
            <Link to="/chat">
                <div className={`flex gap-1 sm:gap-2 px-3 sm:px-20 py-1 rounded-xl cursor-pointer ${location.pathname === '/chat' ? "bg-blue-400" : ""}`}>
                    <img src={chatIcon} alt="Chat" className="w-6 h-6" />
                    <p>Chat</p>
                </div>
            </Link>
        </div>
    )
}

export default Navbar