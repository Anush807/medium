import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        const token = localStorage.getItem("token")
      const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`, {
        title,
        content,
      },{
        headers:{
            Authorization: `Bearer ${token}`
        }
      }
    );

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Blog posted successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage("❌ Failed to post blog");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Error posting blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold mb-6">Create a New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog here..."
              rows={6}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default CreateBlog;
