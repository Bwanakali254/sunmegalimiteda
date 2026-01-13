import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";



const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

    const [Name,setName] = useState('');
    const [Description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('Batteries');
    const [subCategory,setSubCategory] = useState('high-voltage-battery');
    const [brand,setBrand] = useState('');
    const [quantity,setQuantity] = useState('');
    const [bestseller,setBestseller] = useState(false);

    const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
          const formData = new FormData();

          formData.append('name',Name);
          formData.append('description',Description);
          formData.append('price',price);
          formData.append('category',category);
          formData.append('subCategory',subCategory);
          formData.append('brand',brand);
          formData.append('quantity',quantity);
          formData.append('bestseller',bestseller);

          image1 && formData.append('image1',image1);
          image2 && formData.append('image2',image2);
          image3 && formData.append('image3',image3);
          image4 && formData.append('image4',image4);

          const response = await axios.post(backendUrl + '/api/product/add', formData,{headers:{token}})

          if (response.data.success) {
            toast.success(response.data.message);
            setName('');
            setDescription('');
            setImage1(false);
            setImage2(false);
            setImage3(false);
            setImage4(false);
            setPrice('');
            setBrand('');
            setQuantity('');
          }else {
            toast.error(response.data.message);
          }

      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
         <label htmlFor="image1">
            <img className="w-20 cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20 cursor-pointer" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20 cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20 cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={Name}
          className="w-full max-w-170 px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={Description}
          className="w-full max-w-170 px-3 py-2"
          type="text"
          placeholder="write Content Here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className="w-full px-3 py-2">
            <option value="Batteries">Batteries</option>
            <option value="Controllers">Controllers</option>
            <option value="Converters">Converters</option>
            <option value="Energy Storage Systems">
              Energy Storage Systems
            </option>
            <option value="Inverters">Inverters</option>
            <option value="Portable Power">Portable Power</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2">
            <option value="high-voltage-battery">high voltage battery</option>
            <option value="stack-battery-pack">stack battery pack</option>
            <option value="main-controller">main controller</option>
            <option value="power-converter">power converter</option>
            <option value="grid-tie-inverter">grid tie inverter</option>
            <option value="portable-outdoor-power-supply">
              portable outdoor power supply
            </option>
            <option value="single-phase-hybrid-inverter">
              single phase hybrid inverter
            </option>
            <option value="three-phase-hybrid-inverter">
              three phase hybrid inverter
            </option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price}
            className="w-full px-3 py-2 sm:w-30"
            type="Number"
            placeholder="100"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Brand</p>
        <input onChange={(e)=>setBrand(e.target.value)} value={brand}
          className="w-full max-w-125 px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      
        <div className="flex items-center gap-2">
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
          <label className="cursor-pointer" htmlFor="bestseller">
           Add to Bestseller
          </label>
        </div>

        <div className="flex-1 sm:flex-none">
          <p className="mb-2">In Stock</p>
          <input onChange={(e)=>setQuantity(e.target.value)} value={quantity}
            className="w-full px-3 py-2 sm:w-40"
            type="number"
            placeholder="10"
          />
        </div>
     
       
      <button type="submit" className="w-28 py-3 mt-4 bg-green-600 text-white cursor-pointer hover:bg-amber-500">Add Product</button> 

    </form>
  );
};

export default Add;
