import React, { useContext, useState } from 'react';
import { IoMdClose, IoIosSave } from "react-icons/io";
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const UpdateProfilePic = () => {
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
  
      const url = 'https://groceyish-app-backend.onrender.com/api/v1/profile-pic/update';
  
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
      <div className='w-full flex justify-between items-center mt-4'>
        <Logo />
        <button className='text-3xl font-bold text-white border-2 border-blue-500 p-1 rounded-full outline-dashed outline-red-500 transition duration-300 hover:scale-110' aria-label="Close" onClick={() => setProfilePic(false)}>
          <IoMdClose />
        </button>
      </div>
      <div className='w-full max-w-[700px] bg-slate-200 rounded-md border-2 border-blue-500 flex flex-col items-center gap-6 py-8'>
        <div className='text-xl font-semibold mb-4'>Update your profile picture</div>

        <img src={updateProfilePic} alt="Profile Avatar" className='w-32 h-32 rounded-full border-4 border-slate-500 object-cover shadow-lg' />

        <div className='border-2 border-gray-300 py-2 px-4 rounded-md'>
          <input
            type='file'
            className='w-[300px]'
            onChange={handleFileChange}
          />
        </div>
        <div className='w-full flex justify-center items-center gap-4'>
          <button
            className='w-[200px] border-2 border-slate-700 bg-transparent py-1 flex justify-center gap-3 items-center text-slate-700 font-semibold text-xl transition duration-200 hover:bg-slate-700 hover:text-white rounded-sm'
            onClick={handleSave}
          >
            <p>Update & Save</p>
            {isLoading ? (<Spinner />) : (<IoIosSave />)}
          </button>
          <button
            className='w-[200px] border-2 border-red-500 bg-transparent py-1 text-red-500 font-semibold text-xl transition duration-200 hover:bg-red-500 hover:text-white rounded-sm'
            onClick={() => setProfilePic(false)}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePic;