import React, { useState } from "react";
// import loginSignupImage from "../assetes/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import http from "../httpServices/httpService";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [details, setData] = useState({
    firstName: "",
    lastName: "",
    
    email: "",
    password: "",
    confirmPossword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnchange = (e) => {
    const { name, value  } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("data", details);
    try{
      let request = await http.post("/addUser", details);
      let {data} = request;
      window.location = "/"
    }
    catch(ex){
      console.log(ex);
    }
  };

  return (
    <div className="w-full  p-10 md:p-5 ">
         <div className= "text-blue-700 text-xl  text-center py-3 m-3 text-md  font-sans font-bold tracking-[6px]"> Create your account </div>
      <div className="w-full max-w-sm rounded-md bg-white m-auto flex  flex-col p-4 shadow-lg">
      <div className="w-30  rounded-sm  m-auto ">
           <h1 className="text-xl">Notify me</h1>
        </div>
        
        <form className=" w-full py-3 flex flex-col " onSubmit={handleSubmit}>
        <div className="flex justify-around gap-10 ">
          <div >
          <label htmlFor="firstName"> FirstName </label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            value={details.firstName}
            onChange={handleOnchange}
            className=" mt-2 mb-1 w-full bg-slate-200 rounded-md  px-2 py-1 focus-within:outline-blue-500"
            required
          />
          </div>

<div >
          <label htmlFor="lastName "> LastName </label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            value={details.lastName}
            onChange={handleOnchange}
            className=" mt-2 mb-2 w-full bg-slate-200 rounded-md px-4 py-1  focus-within:outline-blue-500"
            required
          />
          </div>
          </div>
          <label htmlFor="email"> Email</label> 
          <input
            type={"email"}
            id="email1"
            name="email"
            value={details.email}
            onChange={handleOnchange}
            className=" mt-2 mb-2 w-full px-2 py-1 rounded-md bg-slate-200 focus-within:outline-blue-500 "
            required
          />
          {/* <div className="flex gap-3 my-2 items-center justify-start">
            <label className="font-medium">Gender :</label>
           <label className="flex justify-start items-center gap-1">
          <input
            type={"radio"}
            name="gender"
            value={data.gender || "Male"}
            // checked={gender === 'male'}
            onChange={handleOnchange}
          />
          Male
          
        </label>
        <label className="flex justify-start items-center gap-1">
          <input
            type={"radio"}
            name="gender"
            value={data.gender || "Female"}
            // checked={gender === 'female'}
            onChange={handleOnchange}
          />
          Female
        </label>
        <label className="flex justify-start items-center gap-1">
          <input
            type={"radio"}
            name="gender"
            value={data.gender || "Other"}
            // checked={gender === 'other'}
            onChange={handleOnchange}
          />
          Other
        </label>
        </div> */}
          <label htmlFor="password "> Password</label>
          <div className="flex   bg-slate-200 rounded mt-2 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password1"
              name="password"
              value={details.password}
              onChange={handleOnchange}
              className=" px-2 py-1  w-full border bg-slate-200 rounded-md focus-within:outline-blue-500"
              required
            />
            <span
              className="flex text-xl mt-2 cursor-pointer "
              onClick={handleShowPassword}
            >
              {" "}
              {showPassword ? <BiShow /> : <BiHide />}{" "}
            </span>
          </div>
          <label htmlFor=" confirmPossword "> Confirm password</label>
          <div className="flex   bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showConfirmPassword ? "text" : "confirmPossword"}
              id="confirmPossword"
              name="confirmPossword"
              value={details.confirmPossword}
              onChange={handleOnchange}
              className="   px-2 py-1 w-full border bg-slate-200 rounded-md  focus-within:outline-blue-500"
              required
            />
            <span
              className="flex text-xl mt-2 cursor-pointer "
              onClick={handleShowConfirmPassword}
            >
              {" "}
              {showConfirmPassword ? <BiShow /> : <BiHide />}{" "}
            </span>
           
          </div>
          {/* <p className="text-sm text-center">By clicking signup button. I agree to the <a href="#" className="text-blue-500">Terms & conditions</a> and <a href="#" className="text-blue-500">privacy policy</a>.</p>
          */}
          <button className=" w-full m-auto bg-blue-700 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-md mt-4 ">
            {" "}
            Sign UP{" "}
          </button> 
        </form>
        <p className="text-left text-sm mt-2 ">
          {" "}
          Already have account ?{" "}
          <Link to={"/login  "} className="text-blue-500 underline  m-1 text-md"> SignIn</Link>
            
        </p>
      </div>
      {/* <h1 className='text-center text-2xl font-bold '>Sign up</h1> */}
    </div>
  );
}

