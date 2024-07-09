import "./App.css";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PostsByUserId from "./components/PostsByUserId";

import Nav from "./components/Nav";
import CreatePostForm from "./components/CreatePost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <hr />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts_by_userId" element={<PostsByUserId />} />
          <Route path="/add_post" element={<CreatePostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
