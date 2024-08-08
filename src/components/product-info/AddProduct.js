import React, { useContext, useState, useRef, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { AppContext } from '../../context/AppContext';
import { MdAddPhotoAlternate, MdAddAPhoto, MdCamera } from "react-icons/md";
import Spinner from '../Spinner'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const { setIsSellProduct, isLoading,setIsLoading, userData, setCartItem, cartData, setCartData } = useContext(AppContext);
    const [isActiveAddtoCartBtn, setIsActiveAddtoCartBtn] = useState(false);
    const [isActiveSendMail, setIsActiveSendMail] = useState(true);
    const [isUploadedImg, setIsUploadedImage] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [productData, setProductdata] = useState({
        file:null,
        category:'Vegitables',
        name:'',
        product_title:'',
        quantity:'',
        quantity_scale:'N',
        description:'',
        product_title:'',
        currency:'IND',
        price:'',
        offer:'',
        discount:'',
    });

    function inputHandler(event){
        setProductdata((prevData) => ({
            ...prevData,
            [event.target.name]:event.target.value
        }));
    }

    useEffect(() => {
        document.title = 'Upload a product';
    },[]);

    const product_category = ['Vegitables','Fruits', 'Coffe & teas','Baby', 'Beauty', 'Gift Cards', 'Toys & Gaming'];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setIsUploadedImage(true);
                setProductdata((prevData) => ({
                    ...prevData,
                    file: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const openCamera = async () => {
        setIsCameraOpen(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };

    const captureImage = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setImage(imageData);
        setIsUploadedImage(true);
        setProductdata((prevData) => ({
            ...prevData,
            file: imageData
        }));
        closeCamera();
    };

    const closeCamera = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
            track.stop();
        });

        videoRef.current.srcObject = null;
        setIsCameraOpen(false);
    };

    const validateForm = () => {
        const requiredFields = ['file', 'category', 'name', 'product_title', 'quantity', 'quantity_scale', 'description', 'currency', 'price', 'offer'];

        for (let field of requiredFields) {
            if (!productData[field] || productData[field] === 'Choose') {
                toast.error(`Please fill out the ${field} field`);
                return false;
            }
        }
        return true;
    };

    const submitNewProduct = async () => {
        if(!validateForm()){
            return;
        }
        const formData = new FormData();
        formData.append('file', productData.file);
        formData.append('user_id', userData.user._id);
        formData.append('category', productData.category);
        formData.append('title', productData.product_title);
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('offer', productData.offer);
        formData.append('quantity', productData.quantity + productData.quantity_scale);
        formData.append('add_to_cart', isActiveAddtoCartBtn);
        formData.append('send_mail', isActiveSendMail);
    
        if (!productData.file) {
            return toast.error('Please upload product image');
        }
    
        try {
            setIsLoading(true);
            const url = `${baseUrl}/product/add`;
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                if(isActiveAddtoCartBtn){
                    const updatedCart = [...cartData, data.product];
                    setCartData(updatedCart);
                    setCartItem(updatedCart.length);
                    navigate('/cart');
                }
                setIsSellProduct(false);
                toast.success(data.message);
            } else {
                toast.error(data.error  || data.message);
            }
            setIsLoading(false);
        } catch (err) {
            toast.error('An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className='absolute top-0 left-0 w-full min-h-screen backdrop-blur-md flex justify-center items-start p-4 max-lg:h-auto z-20'>
            <div className='w-full bg-white flex flex-col rounded-lg p-4 shadow-gray-300 shadow-lg border border-gray-300 gap-4 max-lg:h-auto'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold login text-gray-500 max-sm:text-base'>Sell Your Product</h2>
                    <div
                        className='w-[40px] h-[40px] bg-red-300 rounded-full flex justify-center items-center text-3xl text-slate-700 cursor-pointer hover:bg-red-400 transition duration-300 ease-linear max-sm:w-[30px] max-sm:h-[30px] max-sm:text-xl'
                        onClick={() => setIsSellProduct(false)}>
                        <IoClose />
                    </div>
                </div>
                <div className='w-full flex justify-between signup-text border border-slate-400 max-md:flex-col'>
                    <div className='w-[33%] flex flex-col p-4 gap-2 max-md:w-full'>
                        <h3 className='text-lg text-gray-500 font-medium'>Upload Product Image</h3>
                        <div className='w-full flex justify-center'>
                            {isUploadedImg ? (
                                <div className='w-full flex flex-col items-center gap-2'>
                                    <img src={image} alt="Image Uploaded Successfully" className='h-[280px] object-cover' />
                                    <button
                                        className='w-[300px] border-2 border-slate-800 text-xl bg-slate-500 rounded-md py-1'
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                    >Change Image</button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            ) : (
                                <div className='w-full flex flex-col justify-center gap-3'>
                                    <div
                                        className='w-full border border-gray-300 rounded-md flex flex-col justify-center items-center gap-4 py-4 cursor-pointer transition duration-200 ease-linear hover:bg-gray-100'
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                        <div className='text-8xl text-gray-300 max-sm:text-5xl'>
                                            <MdAddPhotoAlternate />
                                        </div>
                                        <div className='text-base font-semibold text-gray-400 uppercase'>image</div>
                                    </div>
                                    <div
                                        className='w-full border border-gray-300 rounded-md flex flex-col justify-center items-center gap-4 py-4 cursor-pointer transition duration-200 ease-linear hover:bg-gray-100'
                                        onClick={openCamera}
                                    >
                                        <div className='text-8xl text-gray-300 max-sm:text-5xl'>
                                            <MdAddAPhoto />
                                        </div>
                                        <div className='text-base font-semibold text-gray-400 uppercase'>camera</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-[1px] bg-slate-400 rounded-full'></div>

                    <div className='w-[66%] flex flex-col gap-4 py-3 max-md:w-full'>
                        <div className='w-full text-center text-2xl font-semibold'>Product Details</div>
                        <div className='w-full flex justify-between gap-2 px-4 max-lg:flex-col max-sm:px-2'>
                            <div className='w-full flex flex-col justify-between gap-4'>
                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Category:</p>
                                    <select name='category' className='w-[230px] border-2 border-slate-300 py-1 outline-none focus:border-slate-500 rounded max-sm:w-full' onChange={inputHandler}>
                                        {product_category.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </label>
                                
                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Name:</p>
                                    <input
                                        type='text'
                                        name='name'
                                        value={productData.name}
                                        onChange={inputHandler}
                                        placeholder='brand name'
                                        className='w-[230px] border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded max-sm:w-full'
                                    />
                                </label>

                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Quantity:</p>
                                    <div className='w-[230px] flex justify-center items-center gap-1 max-sm:w-full'>
                                        <input
                                            type='number'
                                            name='quantity'
                                            value={productData.quantity}
                                            onChange={inputHandler}
                                            placeholder='e.g. 10N or 10KG'
                                            className='w-full border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded'
                                        />
                                        <select name='quantity_scale' value={productData.quantity_scale} className='w-[80px] border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded' onChange={inputHandler}>
                                            <option value={'KG'}>KG</option>
                                            <option value={'N'}>N</option>
                                        </select>
                                    </div>
                                </label>

                                <label className='w-full flex flex-col justify-center gap-2 max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Description:</p>
                                    <textarea
                                        rows="6"
                                        name='description'
                                        value={productData.description}
                                        onChange={inputHandler}
                                        placeholder='Enter into 1000 message.'
                                        className='w-full border-2 max-sm:w-full border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded'
                                    />
                                </label>
                            </div>

                            <div className='w-full px-2 flex flex-col gap-4 max-sm:px-0'>
                                <label className='w-full flex flex-col justify-between max-sm:flex-col max-sm:items-start'>
                                    <p>Product title:</p>
                                    <input
                                        type='text'
                                        name='product_title'
                                        value={productData.product_title}
                                        onChange={inputHandler}
                                        placeholder='enter product title'
                                        className='w-full border-2 border-slate-300 max-sm:w-full py-1 px-2 outline-none focus:border-slate-500 rounded'
                                    />
                                </label>

                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Price:</p>
                                    <div className='w-[230px] flex justify-center items-center gap-1 max-sm:w-full'>
                                        <select name='currency' className='w-[80px] border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded' onChange={inputHandler}>
                                            <option value='IND'>IND</option>
                                            <option value='USD'>USD</option>
                                        </select>
                                        <input
                                            type='number'
                                            name='price'
                                            value={productData.price}
                                            onChange={inputHandler}
                                            placeholder='e.g. ₹10.0'
                                            className='w-full border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded'
                                        />
                                    </div>
                                </label>

                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Offer:</p>
                                    <div className='w-[230px] flex justify-center items-center gap-1 max-sm:w-full'>
                                        <input
                                            type='number'
                                            name='offer'
                                            value={productData.offer}
                                            onChange={inputHandler}
                                            placeholder='e.g. 25%'
                                            className='w-full border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded'
                                        />
                                    </div>
                                </label>

                                <label className='w-full flex justify-between items-center max-sm:flex-col max-sm:items-start'>
                                    <p className='text-lg'>Discount:</p>
                                    <div className='w-[230px] flex justify-center items-center gap-1 max-sm:w-full'>
                                        <input
                                            type='number'
                                            name='discount'
                                            value={productData.discount}
                                            onChange={inputHandler}
                                            placeholder='e.g. 100'
                                            className='w-full border-2 border-slate-300 py-1 px-2 outline-none focus:border-slate-500 rounded'
                                        />
                                    </div>
                                </label>

                                <div className='w-full flex justify-start items-center gap-2' onClick={() => setIsActiveAddtoCartBtn(!isActiveAddtoCartBtn)}>
                                    <div
                                        name='add_to_cart'
                                        id='add_to_cart'
                                        className={`w-9 h-5 rounded-full flex items-center px-1 cursor-pointer ${isActiveAddtoCartBtn ? 'justify-end bg-blue-500' : 'justify-start bg-gray-200'}`}
                                    ><div className='w-3 h-3 border-2 border-white rounded-full'></div></div>
                                    <label htmlFor='add_to_cart' className='text-lg'>Add to cart</label>
                                </div>

                                <div className='w-full flex justify-start items-center gap-2' onClick={() => setIsActiveSendMail(!isActiveSendMail)}>
                                    <div
                                        name='send_mail'
                                        id='send_mail'
                                        className={`w-9 h-5 rounded-full flex items-center px-1 cursor-pointer ${isActiveSendMail ? 'justify-end bg-blue-500' : 'justify-start bg-gray-200'}`}
                                    ><div className='w-3 h-3 border-2 border-white rounded-full'></div></div>
                                    <label htmlFor='send_mail' className='text-lg'>Send mail</label>
                                </div>

                                <button
                                    className='w-full border-2 border-green-500 py-1 uppercase font-bold flex justify-center items-center gap-4 rounded bg-green-200 transition duration-300 ease-in hover:bg-green-300'
                                    onClick={submitNewProduct}
                                >{!isLoading && (<IoMdCloudUpload className='text-2xl'/>)} upload a product {isLoading && (<Spinner/>)}</button>
                            </div>
                        </div>
                    </div>
                </div>

                {isCameraOpen && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center'>
                        <div className='relative'>
                            <video ref={videoRef} className='w-[640px] h-[480px]'></video>
                            <button
                                onClick={captureImage}
                                className='absolute bottom-4 flex justify-center items-center gap-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-bold uppercase'
                            >
                                <MdCamera className='text-2xl'/> Capture
                            </button>
                        </div>
                        <button
                            onClick={closeCamera}
                            className='absolute top-4 right-4 text-white text-3xl'
                        >
                            <IoClose />
                        </button>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
            </div>
        </div>
    );
}

export default AddProduct;
