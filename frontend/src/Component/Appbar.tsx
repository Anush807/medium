import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

function Appbar() {

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
        <div >
              Medium
        </div>
      </Link>
      
          <div className="flex items-center space-x-6">
        {/* Post button */}
        <Link
          to="/create"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Post
        </Link>

        {/* User avatar */}
        <Avatar name="Anush" size="big" />
      </div>
    </div>
  )
}

export default Appbar
