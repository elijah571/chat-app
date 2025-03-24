import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import { useGetConversation } from '../../hooks/useGetConversation';
import toast from "react-hot-toast"

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const {  setSelectedConversation} = useConversation()
  const { conversations } = useGetConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!search) return

    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long')
    }

   

    const conversation = conversations.find((c) => 
      c.fullName.toLowerCase().includes(search.toLowerCase())
    )

    if (conversation) {
    
      setSelectedConversation(conversation)
      setSearch("")
    } else {

      toast.error('No User found')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="text" 
          placeholder='Search...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered rounded-full' 
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchInput
