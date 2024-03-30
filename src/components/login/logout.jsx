import React, { useEffect, useState } from 'react';
import auth from "../httpServices/auth";
import SpinLoader from '../loader/SpinLoader';

const Logout = () => {


    useEffect(()=> {
          let user = auth.getUser();
          if(user?.token){
            auth.logout();
            window.location = "/"
          }
          window.location = "/"
    },[])
    
  return (
    <div>
    
    </div>
  )
}

export default Logout