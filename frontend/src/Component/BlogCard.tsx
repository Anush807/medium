// BlogCard.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

interface BlogCardProps {
  authorName: string
  title: string
  content: string
  publishedDate: string
  id: string
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) {
  const readTime = Math.ceil(content.length / 200);
  
  return (
    <Link to={`/blogs/${id}`} className="block group">
      <motion.div 
        className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden backdrop-blur-sm"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Author Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar name={authorName} size="small" />
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-gray-500" />
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {authorName}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{publishedDate}</p>
              </div>
            </div>
            
            {/* Read time badge */}
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 group-hover:bg-gray-200 rounded-full transition-colors">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{readTime} min</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="space-y-4">
            <motion.h2 
              className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-200"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              {title}
            </motion.h2>
            
            <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
              {content.slice(0, 180)}...
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 group-hover:bg-gray-400 rounded-full transition-colors"></div>
                <div className="w-2 h-2 bg-gray-200 group-hover:bg-gray-300 rounded-full transition-colors delay-75"></div>
                <div className="w-2 h-2 bg-gray-100 group-hover:bg-gray-200 rounded-full transition-colors delay-150"></div>
              </div>
              
              <motion.div
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    </Link>
  )
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  const initial = name && name.length > 0 ? name[0].toUpperCase() : '?';

  const sizeClasses = {
    small: "w-10 h-10 text-sm",
    big: "w-14 h-14 text-lg"
  }

  return (
    <motion.div 
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 font-bold shadow-sm ${sizeClasses[size]}`}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ duration: 0.2 }}
    >
      {initial}
    </motion.div>
  );
}

export default BlogCard