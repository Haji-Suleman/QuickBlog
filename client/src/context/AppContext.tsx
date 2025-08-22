import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Blog type
export interface Blog {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isPublished: boolean;
    subTitle: string;
}

// Context type
interface AppContextType {
    navigate: ReturnType<typeof useNavigate>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    blogs: Blog[];
    setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    fetchBlogs: () => Promise<void>;
}

// Create context with proper type
const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blogs/all");
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error));
        }
    };

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = `${storedToken}`;
        }
    }, []);

    const value: AppContextType = {
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
