import BlogGrid from "@/components/pages/blogs/blog";
export const metadata = {
  title: "Blogs | Coderzon Technologies Pvt Ltd",
  description:
    "Explore Coderzon's blog for the latest insights on AI software development, cloud computing, data analytics, MVP strategies, and emerging tech trends.",
  keywords: [
    "Coderzon blog",
    "tech blogs",
    "AI blog",
    "artificial intelligence articles",
    "data analytics tips",
    "cloud computing insights",
    "MVP development blogs",
    "software development articles",
    "machine learning trends",
    "enterprise tech news",
    "coderzon technologies blog",
    "custom app development ideas",
    "digital transformation stories",
    "startup technology strategies",
    "software engineering best practices"
  ],
  openGraph: {
    title: "Blogs | Coderzon Technologies Pvt Ltd",
    description:
      "Stay up-to-date with Coderzon's blog. Get expert perspectives on AI, cloud, mobile apps, big data, and product development for startups and enterprises.",
    url: "https://coderzon-website-2463.vercel.app/blog",
    siteName: "Coderzon",
    images: [
      {
        url: "https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp",
        width: 1200,
        height: 630,
        alt: "Coderzon Blog",
      },
    ],
    type: "website",
  },
};

const Blog = () => {
    return (
        <>
            <BlogGrid />
        </>
    );
};

export default Blog;