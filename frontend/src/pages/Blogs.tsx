// Blogs.tsx
import Appbar from '../Component/Appbar'
import BlogCard from '../Component/BlogCard'
import { useBlogs } from '../hooks'
import BlogSkeleton from '../Component/BlogSkeleton';

function Blogs() {
  const { loading, blogs } = useBlogs();

   if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className="space-y-6 w-full max-w-2xl mt-6">
            {/* Show 3 skeletons while loading */}
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        {/* Added space-y-6 for vertical spacing */}
        <div className="space-y-6 w-full max-w-2xl">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="2nd Oct 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Blogs
