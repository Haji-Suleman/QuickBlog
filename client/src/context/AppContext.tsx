import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext({});

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<null | string>(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")
    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }; // your context value here
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};df
export const useAppContext = () => {
    return useContext(AppContext)
}