import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

interface Blog {
    _id: string;
    title: string;
    createdAt: string;
    isPublished: boolean;
}

interface BlogTableItemProps {
    blog: Blog;
    fetchBlogs: () => Promise<void>;
    index: number;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, isPublished, _id } = blog;
    const blogDate = new Date(createdAt);

    const deleteBlog = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const { data } = await axios.post("/api/blogs/delete", { id: _id });
            data.success ? (toast.success(data.message), await fetchBlogs()) : toast.error(data.message);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error));
        }
    };

    const togglePublish = async () => {
        try {
            const { data } = await axios.post("/api/blogs/toggle-publish", { id: _id });
            data.success ? (toast.success(data.message), await fetchBlogs()) : toast.error(data.message);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error));
        }
    };

    return (
        <tr className="border-y border-gray-300">
            <th className="px-2 py-4">{index}</th>
            <td className="px-2 py-4">{title}</td>
            <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
            <td className="px-2 py-4 max-sm:hidden">
                <p className={isPublished ? "text-green-600" : "text-orange-700"}>
                    {isPublished ? "Published" : "Unpublished"}
                </p>
            </td>
            <td className="px-2 py-4 flex text-xs gap-3">
                <button
                    className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
                    onClick={togglePublish}
                >
                    {isPublished ? "Published" : "Unpublished"}
                </button>
                <img
                    className="w-8 hover:scale-110 transition-all cursor-pointer"
                    src={assets.cross_icon}
                    onClick={deleteBlog}
                    alt="Delete"
                />
            </td>
        </tr>
    );
};

export default BlogTableItem;
