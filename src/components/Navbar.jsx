import React from 'react'
import { Link } from 'react-router-dom'
import auth from "../components/httpServices/auth";

const Navbar = ({children}) => {

    const user = auth.getUser();

    const handleLogout = () => {
      auth.logout();
      window.location = "/"
    }

  return (
    <div>
    <div className='bg-gray-600 text-white top-0 fixed w-full flex justify-between items-center p-4'>
     <Link to="/"  className='font-bold'>NotiFy me</Link>
     <div className='flex gap-3'>
    { user && 
    <Link to="/" className=''>{user.firstName +" " + user.lastName}</Link>
    }
     {user && 
     <Link onClick={() => handleLogout()}>Sign Out</Link>
     }
     {!user && 
     <Link to="/login">Login</Link>
     }
     {!user && 
     <Link to="/register">Register</Link>
     }
     </div>
    </div>
    <div className='mt-[5%]'>{children}</div>
    </div>
  )
}

export default Navbar;