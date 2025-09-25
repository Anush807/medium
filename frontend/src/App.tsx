import Blog from "./pages/Blog";
import "./App.css"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Blogs from "./pages/Blogs";
import CreateBlog from "./Component/CreateBlog";

function App() {

  return (
   <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={ <SignUp></SignUp> }></Route>
          <Route path="/signin" element={ <SignIn></SignIn> }></Route>
          <Route path="/blogs/:id" element={ <Blog></Blog> }></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
