import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext({});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<null | string>(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("api/blogs/all");
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem("token")
        if(token){
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `${token}`
        }
        
    }, [])
    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }; // your context value here
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = () => {
    return useContext(AppContext)
}