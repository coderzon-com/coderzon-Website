'use client'; // Add this line to mark the component as a Client Component

import { useParams, useRouter } from "next/navigation";
import { createClient } from 'next-sanity';
import { useState, useEffect } from "react";
import BlogDetails from '@/components/pages/blogs/blog-details';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const BlogDetail = () => {
    const [blogs, setBlogs] = useState([]);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await client.fetch(`
                  *[_type == 'blogs'] | order(_createdAt desc) {
                    _id,
                    blogName,
                    _createdAt,
                    content,
                    "imageUrl": image.asset->url
                  }`);
                setBlogs(data); // State is updated after the component renders
            } catch (err) {
                console.log('Failed to load blogs'); 
            }
        };

        fetchBlogs(); // Fetch blogs when component mounts
    }, []); // This ensures it runs once when the component is mounted
    const singleData = blogs?.find((blog) => blog._id === params.id);

    return (
        <>
            {/* Pass singleData as a prop to BlogDetails */}
            <BlogDetails singleData={singleData} />
        </>
    );
};

export default BlogDetail;
