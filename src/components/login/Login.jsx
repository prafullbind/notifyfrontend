import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import http from "../httpServices/httpService";
import SpinLoader from "../loader/SpinLoader";
import auth from "../httpServices/auth";

// import OtpPage from "../otppages/OtpPage";
// import loginSignupImage from "../assest/login-animation.gif";

// import axios from "axios";


export default function Login() {
  const [showOTPPage , setShowOTPPage] =useState();
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    phone:"",
    password: "",
  });

 const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("")
    let body = {};

    
    let checkNumber = /^[0-9]+$/
    let error = validateLogin();
    if (isValid(error)) {
      if (data.email.match(checkNumber)) {
        body.phone = +data.email;
        body.email = "";
        body.password = data.password;
        // body.otp = generateOTP();
        // setOtpdigit(body.otp);
        setError({});
        login(body)
      }
      else {
        body.email = data.email;
        body.phone = "";
        body.password = data.password;
        // body.otp = generateOTP();
        // setOtpdigit(body.otp);
        setError({});
        login(body)
      }
    }
    else {
      setError(error);
      setLoading(false);
    }
  };


  const login = async (body) => {
    try {
      let response = await http.post("/login", body);
      let { data } = response;
      auth.login(data);
      // setOtppage(1);
      window.location = "/";
      setLoading(false);
    }
    catch (ex) {
      setLoading(false)
      setData({
        email: "",
        phone:"",
        password: "",
      });
      setLoginError(ex.response.data)
    }
  }

  
  const isValid = (error) => {
    let keys = Object.keys(error);
    let count = keys.reduce((acc, curr) => error[curr] ? acc + 1 : acc, 0);
    return count === 0;
  }

  const validateLogin = () => {
    let error = { email: "", password:"" };
    error.email = !data.email ? "Enter email or mobile number" : "";
    error.password = !data.password ? "Enter your password" : "";
    return error;
  }

  // const generateOTP = () => {

  //   var digits = '0123456789';

  //   var otpLength = 6;

  //   var otp = '';

  //   for (let i = 1; i <= otpLength; i++) {

  //     var index = Math.floor(Math.random() * (digits.length));

  //     otp = otp + digits[index];

  //   }

  //   return otp;

  // }



  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };



  return (
    <>
{loading ? 
    <SpinLoader />
    : ""}
<div className="w-full h-[100vh] p-10 md:p-5">
<div className= "text-blue-700 text-xl  text-center py-3 m-3 text-md font-sans font-bold tracking-[6px]">Notify me</div>
<p className="text-red-600 text-center">{loginError?.message}</p>
      <div className="w-full max-w-sm rounded-md  bg-white m-auto flex  flex-col p-4 shadow-lg">
        <div className="w-30  rounded-md">
           <h1 className="text-xl font-bold text-gray-700">Log in to your account</h1>
        </div>
    {!showOTPPage ? (       
        <form  className=" w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email" className="">Email</label>
          <input
            type={"text"}
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnchange} 
            className="border border-indigo-200 mt-3 mb-2 w-full rounded-md px-2 py-[6px] bg-slate-200 focus-within:outline-blue-500 "
          />
          {error.email ? <span className="text-red-600">{error.email}</span> : ""}
          <label htmlFor="password " className="mt-2">Password</label>
          <div className="flex bg-slate-200 rounded mt-2 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnchange}
              className="px-2 py-2  rounded-md  w-full bg-slate-200 focus-within:outline-blue-500"
            />
            <span
              className="flex text-xl mt-2 cursor-pointer "
              onClick={handleShowPassword}
            >
              
              {showPassword ? <BiShow /> : <BiHide />}{" "}
            </span>
          </div>
          {error.password ? <span className="text-red-600">{error.password}</span> : ""}
          <div className="flex mt-3 justify-center items-center ">
            
            {/* <div>
                <Link to="#" className="text-blue-500 hover:underline">Forgot password?</Link>
            </div> */}
          </div>
          {/* <p className="text-sm text-center mt-1">By clicking login button. I agree to the <a href="#" className="text-blue-500">Terms & conditions</a> and <a href="#" className="text-blue-500">privacy policy</a>.</p>
          */}
          <button className=" w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-md mt-4">
            Log in
          </button> 
        </form> 
             ) : (OtpPage) }
        <p className="text-left text-sm mt-2 ">
        Don’t have an account yet?
          <Link to={"/register"} className="text-blue-500 ml-1 text-md underline">
            Signup
          </Link> 
        </p>
      </div>
      {/* <h1 className='text-center text-2xl font-bold '>Sign up</h1> */}
    </div>
    </>
  );
}
