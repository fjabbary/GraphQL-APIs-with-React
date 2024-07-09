import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">All Posts</Link>
        </li>
        <li>
          <Link to="/posts_by_userId">Posts By UserId</Link>
        </li>
        <li>
          <Link to="/add_post">Add New Post</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
