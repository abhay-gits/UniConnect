import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Notices = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notices, setNotices] = useState([])
    const [showNoticeForm, setShowNoticeForm] = useState(false)

    useEffect(() => {
        async function getNotices() {
            const data = await axios.get('https://uniconnect-kzn1.onrender.com/api/notices')
            const notices = data.data
            setNotices(notices.reverse())
        }
        getNotices()
    }, [])

    async function sendNotice(e) {
        e.preventDefault()
        if (body && title) {
            const res = await axios.post('https://uniconnect-kzn1.onrender.com/api/notices', { title, body })
            console.log(res);
            setTitle('')
            setBody('')
            // Refresh notices after posting
            const data = await axios.get('https://uniconnect-kzn1.onrender.com/api/notices')
            setNotices(data.data.reverse())
        }
    }

    const toggleNoticeForm = () => {
        setShowNoticeForm(!showNoticeForm);
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Notices Display Section */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notices</h2>
                        <div className="space-y-4 max-h-[calc(100vh-17rem)] overflow-y-auto">
                            {notices.map((notice) => (
                                <div
                                    key={notice._id}
                                    className="p-4 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-200"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.title}</h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">{notice.body}</p>
                                    <div className="mt-2 text-xs text-gray-400">
                                        {new Date(notice.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                            {notices.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No notices available
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notice Creation Form */}
                {showNoticeForm && (
                    <div className="lg:col-span-1 order-1 lg:order-2 ">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Notice</h2>
                            <form className="space-y-4" onSubmit={sendNotice}>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        placeholder="Enter notice title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                        Body
                                    </label>
                                    <textarea
                                        id="body"
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={body}
                                        onChange={(e) => { setBody(e.target.value) }}
                                        placeholder="Enter notice content"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                                    type="submit"
                                >
                                    Publish Notice
                                </button>
                            </form>
                        </div>
                    </div>)}
            </div>
            <div onClick={toggleNoticeForm} className='text-white w-20 h-10 rounded-full bg-blue-500 fixed bottom-5 right-5 flex justify-center items-center cursor-pointer'>
                <p>Create</p>
            </div>
        </div>
    )
}

export default Notices