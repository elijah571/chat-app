import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      {/* search */}
      <SearchInput/>
      <div className='divider px-3'></div>
      {/* conversation */}
      <Conversations/>
      {/* logout */}
      <Logout/>
    </div>
  )
}

export default Sidebar
