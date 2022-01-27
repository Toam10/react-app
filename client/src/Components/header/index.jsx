import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/edit">Edit</Link>
      <Link to="/operations">Operations</Link>
    </div>
  );
};
export default Header;
