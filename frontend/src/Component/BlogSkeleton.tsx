// BlogSkeleton.tsx
import { motion } from "framer-motion";

const BlogSkeleton = () => {
  const shimmerVariants = {
    start: { x: "-100%" },
    end: { x: "100%" }
  };

  const pulseVariants = {
    start: { opacity: 0.4 },
    end: { opacity: 0.8 }
  };

  return (
    <motion.div
      className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Author Section Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {/* Avatar skeleton */}
          <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="ml-4 space-y-2">
            {/* Author name skeleton */}
            <div className="relative w-24 h-3 bg-gray-200 rounded overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                variants={shimmerVariants}
                initial="start"
                animate="end"
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
            </div>
            {/* Date skeleton */}
            <div className="relative w-16 h-2 bg-gray-200 rounded overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                variants={shimmerVariants}
                initial="start"
                animate="end"
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Read time badge skeleton */}
        <div className="relative w-16 h-6 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.4
            }}
          />
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-3 mb-4">
        <div className="relative w-4/5 h-6 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
        <div className="relative w-3/5 h-6 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.6
            }}
          />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.7
            }}
          />
        </div>
        <div className="relative w-5/6 h-4 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
        </div>
        <div className="relative w-4/5 h-4 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.9
            }}
          />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <motion.div 
              className="w-2 h-2 bg-gray-200 rounded-full"
              variants={pulseVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="w-2 h-2 bg-gray-200 rounded-full"
              variants={pulseVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "reverse",
                delay: 0.2
              }}
            />
            <motion.div 
              className="w-2 h-2 bg-gray-200 rounded-full"
              variants={pulseVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "reverse",
                delay: 0.4
              }}
            />
          </div>
          
          <div className="relative w-5 h-5 bg-gray-200 rounded overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </div>

      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default BlogSkeleton;