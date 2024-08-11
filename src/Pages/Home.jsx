import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Upload from '../Components/Upload';
import Dashboard from '../Components/Dashboard';
import Invoice from '../Components/Invoice';
import Notification from '../Components/Notification';
import Schedule from '../Components/Schedule';
import Calender from '../Components/Calender';
import Settings from '../Components/Settings';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState('Upload');
  const [block, setBlock] = useState(true);
  const [mode, setMode] = useState(false); // Light mode is false by default

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBlock = (item) => {
    setBlock(item);
  };

  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Upload':
        return <Upload onBlockSelect={handleBlock} mode={mode} toggleMode={toggleMode} />;
      case 'Dashboard':
        return <Dashboard mode={mode} />;
      case 'Invoice':
        return <Invoice mode={mode} />;
      case 'Schedule':
        return <Schedule mode={mode} />;
      case 'Calender':
        return <Calender mode={mode} />;
      case 'Notification':
        return <Notification mode={mode} />;
      case 'Settings':
        return <Settings mode={mode} />;
      default:
        return <Dashboard mode={mode} />;
    }
  };

  return (
    <div className='flex h-auto'>
      {/* Sidebar visibility based on 'block' */}
      <div className={`${block ? 'block' : 'hidden'} sm:block w-full sm:w-1/5`}>
        <Sidebar onItemSelect={handleItemClick} onBlockSelect={handleBlock} mode={mode} toggleMode={toggleMode} />
      </div>

      {/* Content visibility based on 'block' */}
      <div className={`${block ? 'hidden' : 'block'} w-full sm:w-4/5 h-screen ${mode ? 'bg-white text-black' : 'bg-[#161616] text-white'}`}>
        {/* {renderContent()} */}
            <Upload onBlockSelect={handleBlock} mode={mode} toggleMode={toggleMode} />

      </div>
    </div>
  );
};

export default Home;
