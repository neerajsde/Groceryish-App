import React, { useContext, useState } from 'react';
import { IoMdClose, IoIosSave } from "react-icons/io";
import { AppContext } from '../../context/AppContext';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const UpdateProfilePic = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const { userData, isLoading, setProfilePic, setUserData, setIsLoading, updateProfilePic, setUpdateProfilePic } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSave = () => {
    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('profilePic', selectedFile);
      formData.append('id', userData.user._id);
  
      const url = `${baseUrl}/profile-pic/update`;
  
      fetch(url, {
        method: 'PUT',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setUpdateProfilePic(data.user.img);
        setUserData(data);
        toast.success('Profile picture updated successfully');
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to update profile picture. Please try again.');
      })
      .finally(() => {
        setIsLoading(false); // Move setIsLoading(false) inside finally block
      });
    } else {
      toast.error('Please select a file to upload.');
    }
  };
  

  return (
    <div className='w-full h-full backdrop-blur absolute top-0 left-0 flex flex-col items-center px-6 gap-4'>
      <div className='w-full max-w-[600px] bg-slate-200 rounded-md border-2 border-blue-500 flex flex-col items-center gap-6 pb-8 pt-4 mt-5'>
        <div className='w-full flex justify-between items-center px-4'>
          <div className='text-xl font-semibold max-sm:text-lg'>Update your profile picture</div>
          <button className='text-3xl font-bold text-black border-none p-1 rounded-full outline-dashed outline-red-500 transition duration-300 hover:scale-110 max-sm:text-xl' aria-label="Close" onClick={() => setProfilePic(false)}>
            <IoMdClose />
          </button>
        </div>

        <img src={updateProfilePic} alt="Profile Avatar" className='w-32 h-32 rounded-full border-4 border-slate-500 object-cover shadow-lg' />

        <div className='border-2 border-gray-300 py-2 px-4 rounded-md max-sm:px-2 max-sm:mx-2'>
          <input
            type='file'
            className='w-[300px] max-sm:w-full'
            onChange={handleFileChange}
          />
        </div>
        <div className='w-full flex justify-center items-center gap-4 max-sm:flex-col'>
          <button
            className='w-[200px] border-2 border-slate-700 bg-transparent py-1 flex justify-center gap-3 items-center text-slate-700 font-semibold text-xl max-sm:text-base transition duration-200 hover:bg-slate-700 hover:text-white rounded-sm'
            onClick={handleSave}
          >
            <p>Update & Save</p>
            {isLoading ? (<Spinner />) : (<IoIosSave />)}
          </button>
          <button
            className='w-[200px] border-2 border-red-500 bg-transparent py-1 text-red-500 font-semibold text-xl max-sm:text-base transition duration-200 hover:bg-red-500 hover:text-white rounded-sm'
            onClick={() => setProfilePic(false)}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePic;