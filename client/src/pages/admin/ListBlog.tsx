import { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import toast from 'react-hot-toast'
import axios from 'axios'
import type { BlogType } from '../../types'

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]) // Note: lowercase 'blogs' is more conventional

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("api/admin/blogs")
            if (data.success) {
                setBlogs(data.blogs) // Assuming data.blogs is the array
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <h1>All blogs</h1>
            <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr className='top-0 bg-white z-10'>
                            <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
                            <th scope="col" className="px-2 py-4"> Blog Title </th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden"> Date </th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden"> Status </th>
                            <th scope="col" className="px-2 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs?.map((blog: BlogType, index) => (
                            <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBlog
// 689a2ed99c05dab0294b0e7f
// 689a2e829c05dab0294b0e4b