import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks";

// Blog type interface
interface Blogs {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedDate: string;
}

// Avatar component (black/white theme)
function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  const initial = name && name.length > 0 ? name[0].toUpperCase() : "?";

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-800 rounded-full ${size === "small" ? "w-8 h-8" : "w-12 h-12"
        }`}
    >
      <span
        className={`${size === "small" ? "text-sm" : "text-lg"
          } font-medium text-white`}
      >
        {initial}
      </span>
    </div>
  );
}

function Blog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, blog } = useBlog({ id: id || "" });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gray-100 rounded-2xl shadow-sm p-8">
            <div className="animate-pulse">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(blog.content);
  const wordCount = blog.content.split(/\s+/).length;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-700 hover:text-black transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium cursor-pointer">Back to articles</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="px-8 lg:px-12 pt-12 pb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center">
                <Avatar name={blog.author?.name || "Anonymous"} size="big" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-black">
                    {blog.author?.name || "Anonymous"}
                  </h3>
                  {/* <p className="text-gray-600">{formatDate(blog.publishedDate)}</p> */}
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center">
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="px-8 lg:px-12">
            <div className="h-px bg-gray-200"></div>
          </div>

          {/* Article */}
          <div className="px-8 lg:px-12 py-12">
            <div className="text-gray-900 leading-relaxed space-y-6">
              {blog.content.split("\n\n").map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p key={index} className="text-lg leading-8">
                      {paragraph.trim()}
                    </p>
                  )
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Blog;
