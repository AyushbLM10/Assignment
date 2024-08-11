import React, { useState } from 'react';
import { RiDashboardHorizontalFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { SlGraph } from "react-icons/sl";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { AiOutlineSun } from 'react-icons/ai';
import { IoMoonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Sidebar = ({onItemSelect, onBlockSelect, toggleMode}) => {
  const [state,setState] = useState("");
  const [mode, setMode] = useState(false); // Light mode is false by default

  return (
    <div className={`'p-4 h-[1272px] pl-10 sm:pl-4 pt-14 ${mode ? 'bg-white text-black' : 'bg-black text-white'} '`}>
      <div className='flex justify-between'>
        <div className='flex '>
          <div className='bg-[#605BFF] rounded-full w-8 h-8 mr-2'>
            <SlGraph color={`${mode ? "white" : "black"}`} className='transform rotate-180' size={32}/>
          </div>
          <h1 className={`'font-semibold text-xl ${mode ? 'bg-white ' : ' text-white'}'`}>Base</h1>
        </div>
        <button className={` mr-10 sm:hidden ${mode ? 'text-black': 'text-white'} `} onClick={()=>{onBlockSelect(false)}}>
          <h1 className='text-3xl'>&times;</h1>
        </button>
        <Link to = '/'><RiLogoutBoxRLine color='gray' size={32} className='cursor-pointer hidden sm:block'/></Link>
      </div>
      <div className={`flex flex-col mt-8 ${mode ? 'text-black' : 'text-white'}`}>
        <ul className='text-gray-400 w-full space-y-3'>
          <li onClick={()=>{setState("Dashboard")
            onItemSelect("Dashboard")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Dashboard' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <RiDashboardHorizontalFill  color={state === 'Dashboard' ? '#605BFF' : 'gray'}size={26} />
            <span >Dashboard</span>
          </li>
          <li onClick={()=>{setState("Upload")
            onItemSelect("Upload")
            onBlockSelect(false)
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Upload' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <BsFileBarGraphFill  color={state === 'Upload' ? '#605BFF' : 'gray'} size={26} />
            <span>Upload</span>
          </li>
          <li onClick={()=>{setState("Invoice")
            onItemSelect("Invoice")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Invoice' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <FaFileInvoice  color={state === 'Invoice' ? '#605BFF' : 'gray'} size={26} />
            <span>Invoice</span>
          </li>
          <li onClick={()=>{setState("Schedule")
            onItemSelect("Schedule")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Schedule' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <BsFileBarGraphFill className='transform rotate-90 mr-1'  color={state === 'Schedule' ? '#605BFF' : 'gray'} size={26} />
            <span>Schedule</span>
          </li>
          <li onClick={()=>{setState("Calender")
            onItemSelect("Calender")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Calender' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <SlCalender  color={state === 'Calender' ? '#605BFF' : 'gray'} size={26} />
            <span>Calender</span>
          </li>
          <li onClick={()=>{setState("Notification")
            onItemSelect("Notification")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Notification' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <IoIosNotifications  color={state === 'Notification' ? '#605BFF' : 'gray'} size={26} />
            <span>Notification</span>
          </li>
          <li onClick={()=>{setState("Settings")
            onItemSelect("Settings")
          }} className={`flex items-center h-12 w-full cursor-pointer ${
            state === 'Settings' ? 'text-[#605bff] bg-gradient-to-r from-[rgba(172,169,255,0.21)] to-[rgba(172,169,255,0)] w-full' : ''}`}>
            <IoMdSettings  color={state === 'Settings' ? '#605BFF' : 'gray'} size={26} />
            <span>Settings</span>
          </li>
          
        </ul>
        </div>
        <button className='mt-36 ' onClick={() => { setMode(!mode)  
          toggleMode(!mode)}}>
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
    </div>
  );
}

export default Sidebar;
