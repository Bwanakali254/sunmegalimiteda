import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [List, setList] = useState([]);

  const fetchLists = async () => {
     try {

     const response = await axios.get(backendUrl + '/api/product/list')
     if (response.data.success){
      setList(response.data.products);
     }
     else {
      toast.error(response.data.message);
     }

     } catch (error) {
      console.error(error);
      toast.error(error.message);
     }
  }

  const removeProduct = async (id) => {
    try {
     
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}});

      if (response.data.message) {
        toast.success(response.data.message)
        await fetchLists();
      }else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        
        {/* List Table Title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-green-200 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Actions</b>
        </div>

        {/* product List */}

        {
          List.map((item,index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border border-green-600 text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>
            </div>
          ))
        }

        </div>  
    </>
  )
}

export default List