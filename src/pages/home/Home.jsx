import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Messages from '../../components/messages/Messages'

const Home = () => {
  return (
    <div className='flex sm:[450px] md:h-[615px] rounded-lg overflow-hidden bg-gray-400 '>
      {/* sidebar */}
      <Sidebar/>
      {/* message */}
      <Messages/>
    </div>
  )
}

export default Home
