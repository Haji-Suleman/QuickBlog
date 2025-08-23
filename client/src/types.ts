export interface BlogDataType {
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
}[]
export interface BlogType {
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
export interface commentDataType {
    _id?: string;
    blog?: {
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
    },
    name: string,
    content: string,
    isApproved?: boolean;
    createdAt: string;
    updatedAt?: string;
}
export interface DashboardDataType {
    blogs: number;
    comments: number;
    drafts: number;
    recentBlogs: {
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
    }[];

}