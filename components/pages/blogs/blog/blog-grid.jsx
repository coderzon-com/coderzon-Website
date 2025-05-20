"use client";
import { createClient } from 'next-sanity';
import React, { useState,useEffect } from 'react';
import BlogItem from './blog-item';
import Pagination from './pagination';
import { format } from 'date-fns';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});


const BlogGridMain = () => {
    const [blogs, setBlogs] = useState([]); 
    const blogItemShow = 6;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(blogs.length / blogItemShow);
    const startIndex = currentPage * blogItemShow;
    const endIndex = startIndex + blogItemShow;
    const currentBlogItems = blogs.slice(startIndex, endIndex);
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        }
    };

      useEffect(() => {
        // Fetch the blogs client-side after the component mounts
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
            setBlogs(data); 
          } catch (err) {
            console.log('Failed to load blogs', err); // Handle errors
          }
        };
    
        fetchBlogs(); 
      }, []);
    return (
        <>
	        <div className="blog__two section-padding">
                <div className="container">
                    <div className="row gy-4">
                        <BlogItem currentBlogItems={currentBlogItems} />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        handlePrevPage={handlePrevPage}
                        totalPages={totalPages}
                        handleNextPage={handleNextPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default BlogGridMain;