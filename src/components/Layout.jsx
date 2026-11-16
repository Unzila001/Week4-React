import {Link, Outlet} from 'react-router';

const Layout = () => {
  return (
    <div>
      <header>
        <h1>My Super Media App</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 My Super Media App</p>
      </footer>
    </div>
  );
};

export default Layout;
