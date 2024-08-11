import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import Papa from 'papaparse';
import { SlGraph } from 'react-icons/sl';
import { FaBars } from "react-icons/fa";

const Upload = ({ onBlockSelect, mode }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [tagsOptions, setTagsOptions] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Unique key for file input

  const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('fileDB', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  const saveFileToDB = async (fileData) => {
    const db = await initDB();
    const transaction = db.transaction('files', 'readwrite');
    const objectStore = transaction.objectStore('files');

    objectStore.add(fileData);

    transaction.oncomplete = () => {
      fetchFilesFromDB();
    };
  };

  const fetchFilesFromDB = async () => {
    const db = await initDB();
    const transaction = db.transaction('files', 'readonly');
    const objectStore = transaction.objectStore('files');
    const request = objectStore.getAll();

    request.onsuccess = () => {
      setUploadedFiles(request.result);
      extractTags(request.result);
    };
  };

  const handleUploadClick = () => {
    if (uploadedFiles.length > 0) {
      setUploadedFiles([]); // Clear the uploaded files
      setFileInputKey(Date.now()); // Reset the file input by changing the key
    } else {
      console.log("File selection triggered");
    }
  };

  const extractTags = (files) => {
    const allTags = new Set();

    files.forEach((file) => {
      file.content.forEach((row) => {
        const tagsString = row['select tags'];
        if (tagsString) {
          const tagsArray = tagsString.split(',').map(tag => tag.trim());
          tagsArray.forEach(tag => allTags.add(tag));
        }
      });
    });

    setTagsOptions([...allTags]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          saveFileToDB({
            name: file.name,
            content: results.data,
            timestamp: new Date(),
          });
          extractTags([{ content: results.data }]);
        },
      });
    }
  };

  const handleTagChange = (fileIndex, rowIndex, value) => {
    const key = `${fileIndex}-${rowIndex}`;
    setSelectedTags((prevTags) => {
      const newTags = prevTags[key] ? [...prevTags[key], value] : [value];
      return {
        ...prevTags,
        [key]: newTags,
      };
    });
  };

  const removeTag = (fileIndex, rowIndex, tagToRemove) => {
    const key = `${fileIndex}-${rowIndex}`;
    setSelectedTags((prevTags) => {
      const newTags = prevTags[key].filter((tag) => tag !== tagToRemove);
      return {
        ...prevTags,
        [key]: newTags,
      };
    });
  };

  useEffect(() => {
    fetchFilesFromDB();
  }, []);

  return (
    <div className={`w-full h-[1272px] flex flex-col sm:items-center ${mode ? 'bg-[#fafafa] text-black' : 'bg-[#161616] text-white'}`}>
      <div className='flex justify-between p-9 w-full'>
        <div className='flex sm:hidden'>
          <button onClick={() => { onBlockSelect(true) }}>
            <FaBars color={mode ? 'black' : 'white'} size={32} />
          </button>
          <div className={`bg-[#605BFF] ml-10 sm:ml-0 rounded-full w-8 h-8 mr-2 `}>
            <SlGraph className='transform rotate-180' size={32} />
          </div>
          <h1 className='font-semibold text-xl'>{mode ? 'Base' : 'Base'}</h1>
        </div>
        <h1 className={`text-2xl font-semibold hidden sm:block ${mode ? 'text-black' : 'text-white'}`}>Upload CSV</h1>
        <div className='flex'>
          <IoIosNotificationsOutline color={mode ? 'black' : 'white'} size={32} />
          <img src="photo1.png" alt="profile pic" className={`w-9 h-9 ml-9 rounded-full border-2 border-gray-600 ${mode ? 'border-gray-300' : 'border-gray-600'}`} />
        </div>
      </div>
      <h1 className={`text-lg font-semibold sm:hidden ml-8 ${mode ? 'text-black' : 'text-white'}`}>Upload CSV</h1>

      <div className={`w-11/12 ml-4 sm:ml-0 sm:w-[596px] h-[367px] mt-10 flex flex-col ${mode ? 'bg-white' : 'bg-black'}`}>
        <div className={`flex flex-col w-11/12 h-3/4 m-6 border-2 border-dashed rounded-lg items-center justify-center ${mode ? 'border-gray-300' : 'border-[#ffffff] border-opacity-10'}`}>
          <RiFileExcel2Fill color={mode ? '#43ce8d' : '#43ce8d'} size={36} />
          <p className={` font-semibold ${mode ? 'text-black' : 'text-white'}`}>
            {uploadedFiles.length > 0
              ? <><button onClick={handleUploadClick}
                className='text-red-700 text-xl font-bold'>Remove
              </button></>
              : <>Drop your excel sheet here or <span className='text-[#605bff] cursor-pointer'>browse</span></>
            }
          </p>
          <input
            type="file"
            key={fileInputKey} // Dynamically change key to reset input
            accept=".xls,.xlsx,.csv"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
        </div>
        <label htmlFor="file-upload" className={`bg-[#605bff] ml-6 mr-6 mb-6 font-semibold text-center py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 flex justify-center ${mode ? 'text-white' : 'text-black'}`}>
          <MdOutlineFileUpload size={24} className='mr-4' />
          Upload
        </label>
      </div>
      <div className={`mt-20 ml-4 ${uploadedFiles.length === 0 ? 'hidden' : 'block'} `}>
        <h1 className={`text-2xl font-semibold mb-12 ${mode ? 'text-black' : 'text-white'}`}>Uploads</h1>
        <div className={`w-[1065px] h-auto rounded-xl ${mode ? 'bg-[#f5f5f5]' : 'bg-black'}`}>
          <div className={` flex justify-start pt-5 pl-5 pr-5 ${mode ? 'text-black' : 'text-white'}`}>
            <span className=' w-32 ml-4'>Si No.</span>
            <span className=' w-64'>Links</span>
            <span className=' w-32'>Prefix</span>
            <span className=' w-32 mr-16'>Add Tags</span>
            <span className=' w-64'>Selected Tags</span>
          </div>
          <div className='overflow-y-auto h-[350px] mt-4'>
            {uploadedFiles.map((file, fileIndex) => (
              <div key={file.id} className={`pl-5 pr-5 ${mode ? 'bg-gray[#f5f5f5] text-black' : 'bg-black text-white'}`}>
                {file.content.map((row, rowIndex) => (
                  <div key={rowIndex} className={`w-full flex justify-start h-14 items-center mb-2 rounded-md ${mode ? 'bg-white' : 'bg-[#161616]'}`}>
                    <span className=' ml-4 w-32'>0{rowIndex + 1}</span>
                    <a href={row['links']} target='_blank' rel='noopener noreferrer' className='text-[#605bff] w-64 truncate'>
                      {row['links']}
                    </a>
                    <span className=' w-32 truncate'>{row['prefix']}</span>

                    <div className='w-48'>
                      <select
                        value=""
                        onChange={(e) => handleTagChange(fileIndex, rowIndex, e.target.value)}
                        className={`bg-black  border border-black rounded-lg p-1 w-32 mr-16 ${mode ? 'bg-white text-black border-gray-300' : 'bg-black text-white border-black'}`}
                      >
                        <option value="" disabled>Select Tags</option>
                        {tagsOptions.map((tag, tagIndex) => (
                          <option key={tagIndex} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='text-white w-auto flex flex-wrap'>
                      {selectedTags[`${fileIndex}-${rowIndex}`]?.map((tag, tagIndex) => (
                        <div key={tagIndex} className={`bg-[#605bff]  px-2 py-1 rounded-md mr-2 mb-2 flex items-center ${mode ? 'text-white' : 'text-black'} `}>
                          <span>{tag}</span>
                          <button
                            className={`ml-2 text-black ${mode ? 'text-white' : 'text-black'}`}
                            onClick={() => removeTag(fileIndex, rowIndex, tag)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
