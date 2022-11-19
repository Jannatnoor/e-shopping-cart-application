import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
      <h1>Shopping Application</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        
          <li>
            <Link to= "/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;