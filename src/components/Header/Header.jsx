import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="navigaionPanel">
        <div className="navLeft"></div>
        <div className="navCenter">
          <Link className="linkUrl" to="/">
            Home /
          </Link>
          <Link className="linkUrl" to="/create">
            Create Post /
          </Link>
          <Link className="linkUrl" to="/posts">
            Posts /
          </Link>
        </div>
        <div className="navRight authorization">
          {!isLoggedIn ? (
            <>
              <button>
                <Link to="/login">Log in</Link>
              </button>
              <button>
                <Link to="/signup">Sign up</Link>
              </button>
            </>
          ) : (
            <>
              <button onClick={logout}>Log out</button>
              <button>
								<Link to='/userpage'>User</Link>
							</button>
            </>
          )}
        </div>
      </nav>
      <h3 className="nameCite">MS</h3>
    </header>
  );
};

export default Header;
