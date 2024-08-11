import React, { useState } from 'react';
import { IoLogoDiscord } from "react-icons/io5";
import { FaApple, FaGithub, FaLinkedin, FaTwitterSquare, FaGoogle } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {
  const [mode, setMode] = useState(false); // Light mode is false by default
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  function handleInputErrors() {
    // Check if fields are filled
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }

    // Check if password length is sufficient
    if (password.length < 8) {
      toast.error("Password too short");
      return false;
    }

    // If all checks pass, show success message and navigate to home page
    toast.success("Successfully signed in!"); // Example success message
    navigate('/'); // Navigate to home page
    return true;
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start h-screen ${mode ? 'bg-[#f0f0f0]' : 'bg-[#161616]'}`}>
      {/* Left Section */}
      <div className={`w-full sm:w-1/3 sm:m-6 sm:h-11/12 sm:rounded-2xl sm:ml-20 xl:ml-32 2xl:ml-56 ${mode ? 'bg-[#605bff]' : 'bg-[#605bff]'}`}>
        <div className='flex items-center sm:hidden mt-5 mb-5'>
          <div className='bg-black rounded-full w-6 ml-12 h-6 mr-2 animate-heartbeat'></div>
          <h1 className='font-bold text-2xl'>Base</h1>
        </div>
        <div className='bg-opacity-25 hidden sm:block bg-blue-950 m-4 sm:m-6 rounded-xl size-11/12 flex-col'>
          <div className={`bg-white rounded-3xl w-24 sm:w-28 h-10 sm:h-12 m-6 sm:m-8 flex items-center justify-center mt-6 ${mode ? 'bg-white' : 'bg-[#605BFF]'}`}>
            <div className='flex items-center'>
              <div className='bg-[#605BFF] rounded-full w-4 sm:w-5 h-4 sm:h-5 mr-2 animate-heartbeat'></div>
              <h1 className='font-bold text-lg sm:text-xl'>Base</h1>
            </div>
          </div>
          <div className={`text-white m-6 sm:m-8 mb-8 sm:mb-14 ${mode ? 'text-black' : 'text-white'}`}>
            <h1 className='font-semibold text-xl sm:text-3xl'>Generate detailed</h1>
            <h1 className='font-semibold text-xl sm:text-3xl'>reports with just one</h1>
            <h1 className='font-semibold text-xl sm:text-3xl'>click</h1>
          </div>
          <div className='flex justify-between items-end'>
            <button onClick={() => { setMode(!mode) }}>
              {mode ? (
                <div className='flex bg-white w-14 sm:w-16 h-8 sm:h-9 mb-6 sm:mb-8 ml-4 sm:ml-6 rounded-2xl cursor-pointer'>
                  <div className='bg-gray-200 rounded-full ml-1 w-7 sm:w-8 h-7 sm:h-8 mt-0.5'>
                    <AiOutlineSun color='gray' size={20} className='ml-1.5 mt-1' />
                  </div>
                  <IoMoonOutline color='black' size={20} className='ml-1 mt-1' />
                </div>
              ) : (
                <div className='flex bg-gray-900 w-14 sm:w-16 h-8 sm:h-9 mb-6 sm:mb-8 ml-4 sm:ml-6 rounded-2xl cursor-pointer'>
                  <AiOutlineSun color='gray' size={20} className='ml-1 mt-1.5' />
                  <div className='bg-black rounded-full ml-1 w-7 sm:w-8 h-7 sm:h-8 mt-0.5'>
                    <IoMoonOutline color='white' size={20} className='ml-1.5 mt-1' />
                  </div>
                </div>
              )}
            </button>
            <img src="photo.png" alt="photo image" className='w-1/2 sm:w-3/5' />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={`w-11/12 sm:w-1/2 lg:w-1/4 ${mode ? ' text-black' : ' text-white'} sm:mt-10 sm:ml-32 h-full sm:h-3/4 flex flex-col justify-center`}>
        <h1 className='font-bold text-xl sm:text-2xl'>Sign In</h1>
        <h1 className='text-sm sm:text-base'>Sign in to your account</h1>
        <div className='flex flex-row mt-4'>
          <div className={`rounded-3xl w-full mr-10 sm:w-[197px] h-[33px] mb-2 flex items-center justify-center ${mode ? 'bg-white' : 'bg-black'}`}>
            <div className='flex items-center'>
              <FaGoogle color={`${mode ? "black" : "white"}`} size={16} className='mr-2' />
              <h1 className={`text-xs ${mode ? 'text-black' : 'text-gray-400'}`}>Sign in with Google</h1>
            </div>
          </div>
          <div className={`rounded-3xl w-full sm:w-[197px] h-[33px] mb-2 sm:ml-4 flex items-center justify-center ${mode ? 'bg-white' : 'bg-black'}`}>
            <div className='flex items-center'>
              <FaApple color={`${mode ? "black" : "white"}`} size={16} className='mr-2' />
              <h1 className={`text-xs ${mode ? 'text-black' : 'text-gray-400'}`}>Sign in with Apple</h1>
            </div>
          </div>
        </div>
        <div className={`flex flex-col mt-4 mb-2 rounded-xl p-4 ${mode ? 'bg-white' : 'bg-black'}`}>
          <label className={`text-sm sm:text-base ${mode ? 'text-black' : 'text-white'}`}>Email address</label>
          <input
            className={`mt-2 bg-[#161616] h-[33px] rounded-md p-2 text-sm sm:text-base ${mode ? 'bg-[#eaeaea] text-black' : 'bg-[#161616] text-white'}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={`text-sm sm:text-base mt-4 ${mode ? 'text-black' : 'text-white'}`}>Password</label>
          <input
            className={`mt-2 bg-[#212121] h-[33px] rounded-md p-2 text-sm sm:text-base ${mode ? 'bg-[#eaeaea] text-black' : 'bg-[#212121] text-white'}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className={`mt-2 mb-4 text-sm sm:text-base ${mode ? 'text-[#4979d9]' : 'text-[#4979d9]'} hover:underline`} href="#">Forget password?</a>
          <button
            onClick={handleInputErrors}
            className={`bg-[#605BFF] font-bold h-[40px] rounded-lg cursor-pointer text-sm sm:text-base ${mode ? 'text-white' : 'text-black'}`}
          >
            Sign In
          </button>
        </div>
        <h1 className={`text-center text-sm sm:text-base ${mode ? 'text-gray-500' : 'text-gray-500'}`}>
          Don't have an account? <a className={`text-[#4979d9] hover:underline ${mode ? 'text-[#4979d9]' : 'text-[#4979d9]'}`} href="#">Register here</a>
        </h1>
        <div className='flex justify-center sm:justify-between gap-4 w-3/4 sm:w-9/12 mx-auto mt-10 sm:mt-20'>
          <FaGithub color={`${mode ? 'black' : 'white'}`} size={24} sm:size={32} />
          <FaTwitterSquare className='rounded-full' color={`${mode ? 'black' : 'white'}`} size={24} sm:size={32} />
          <FaLinkedin color={`${mode ? 'black' : 'white'}`} size={24} sm:size={32} />
          <IoLogoDiscord color={`${mode ? 'black' : 'white'}`} size={24} sm:size={32} />
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
    </div>
  );
};

export default Login;
