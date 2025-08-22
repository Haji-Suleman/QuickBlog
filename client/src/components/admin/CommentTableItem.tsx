import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import type { commentDataType } from '../../types'
import { assets } from '../../assets/assets' // make sure this import is correct

type Props = {
    comment: commentDataType
    index: number
    fetchComments: () => Promise<void>
}

const CommentTableItem: React.FC<Props> = ({ comment, fetchComments }) => {

    const approveComment = async (id: string) => {
        console.log("Frontend sending ID:", id)
        try {
            const { data } = await axios.post("/api/admin/approve-comment", { id })
            console.log("Backend response:", data)
            if (data.success) {
                toast.success(data.message)
                await fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const deleteComment = async (id: string) => {
        console.log("Frontend sending ID:", id)
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?")
        if (!confirmDelete) return
        try {
            const { data } = await axios.post("/api/admin/delete-comment", { id })
            console.log("Backend response:", data)
            if (data.success) {
                toast.success(data.message)
                await fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className="font-medium text-gray-600">Blog</b>: {comment.blog.title}
                <br /><br />
                <b className='font-medium text-gray-600'>Name</b>: {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b>: {comment.content}
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {new Date(comment.createdAt).toLocaleDateString()}
            </td>
            <td className='px-6 py-4'>
                <div className='inline-flex item-center gap-4'>
                    {!comment.isApproved ? (
                        <img
                            onClick={() => approveComment(comment._id)}
                            className='w-5 hover:scale-110 transition-all cursor-pointer'
                            src={assets.tick_icon}
                            alt="Approve"
                        />
                    ) : (
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
                    )}
                    <img
                        onClick={() => deleteComment(comment._id)}
                        src={assets.bin_icon}
                        alt="Delete"
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem
