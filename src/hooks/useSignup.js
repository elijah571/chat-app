import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const handleInputErrors = ({ fullName, userName, password, confirmPassword, gender }) => {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
};

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    const isValid = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
      toast.success("Signup successful!");
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data); 
      console.log(data); 
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
