import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="navbar">
        <Link to="/">
          <h1>Games Library</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <div>
                {/* <Link to="/collection">Collection</Link> */}
                <button onClick={handleClick}>Log out</button>
              </div>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
