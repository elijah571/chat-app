import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useLogin = () => {
    const {setAuthUser} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const login = async (userName, password) => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({userName, password})
            })
            
            const data = await res.json()
            if (!res.ok) { 
                throw new Error(data.message || "Login failed");
            }
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return { loading, login }; 
}
export default useLogin