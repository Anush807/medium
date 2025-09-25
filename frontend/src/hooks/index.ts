import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blogs {
    "title": string,
    "content": string,
    "id": string
    "author": {
        "name": string
    }
}


export const useBlog = ({ id }: {id: string}) =>{
        const [loading, setLoadings] = useState(true);
    const [blog, setBlog] = useState<Blogs>();
    []
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoadings(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoadings(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoadings(false);

                // Handle invalid/expired token
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    // Redirect to login or handle auth error
                }
            });
    }, [id])
    return {
        loading, blog
    }
}

export const useBlogs = () => {
    const [loading, setLoadings] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    []
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoadings(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoadings(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoadings(false);

                // Handle invalid/expired token
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    // Redirect to login or handle auth error
                }
            });
    }, [])
    return {
        loading, blogs
    }
}