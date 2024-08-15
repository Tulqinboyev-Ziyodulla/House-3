import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import { data } from 'autoprefixer'


const API_URL = "https://dummyjson.com"
// fetch -> axios

const Main = () => {
  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [selectCategory, setSelectCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(1)
  const limit = 3

  useEffect(()=>{
    axios
    .get(`${API_URL}/products/category-list`)
    .then(res => setCategories(res.data))
    .catch(err => console.log(err)
    )
  }, [])

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`${API_URL}/products`, {
        params: {
          limit: limit * offset
        }
      })
      .then(res => {
        console.log(res.data);
        setTotal(res.data.total)
        setProducts(res.data.products)
      })
      .catch(err => console.log(err))
      .finally(()=> setLoading(false))
  },[offset, selectCategory])

  const skeletonItems = new Array(3).fill().map((product, idx) => (
    <div className="p-4 border" key={idx}>
      {" "}
      <div className="w-full h-64 object-contain bg-slate-200"></div>
      <div className="h-4 bg-slate-200 w-full mt-3 rounded"></div>{" "}
      <div className="w-[350px] h-4 bg-slate-200 rounded mt-3"></div>{" "}
      <div className="w-[200px] h-4 bg-slate-200 mt-3 rounded"></div>
    </div>
  ));
  
  const productItem = products?.map((product)=> (
    <div key={product.id} className='w-96 p-4 border'>
      <Link to={`/product/${product.id}`}>
      <img src={product.images[0]} alt="" className='w-full cursor-pointer h-64 object-contain h64 bg-gray-200'/>
      </Link>
      <h3 className='text-xl mt-10 text-black font-sans'>{product.title}</h3>
      <p className=''>{product.description} $</p>
      <p className='text-2xl mt-10 text-black font-bold'>{product.price} $</p>
      <Link to={`/product/${product.id}`}>
      <button className='lg:py-[10px] bg-[#ff8a1e] cursor-pointer rounded-[32px] text-[#fff] lg:px-[50px] border py-[5px] mt-[20px]'>Buy</button>
      </Link>
    </div>
  ))

  const categoryItems = categories?.map(item => (
    <option key={item} value={`/category/${item}`}>{item}</option>
  ))

  return (
    <div>
      <select className=' cursor-pointer ml-20 bg-slate-300 text-center outline-none text-xl' value={selectCategory} onChange={e => setSelectCategory(e.target.value)} name="" id="">
        <option value="">All</option>
        {categoryItems}
      </select>
      <div className='flex gap-3 mt-10 flex-wrap justify-center'>
        {productItem}
        {loading && skeletonItems}
      </div>
      {
        limit * offset <= total &&
        <button onClick={()=> setOffset(p => p + 1)} className='py-2 px-20 cursor-pointer font-sans text-xl text-black bg-slate-400 borde rounded-md block mx-auto mt-10 mb-10'>See more</button>
      }
    </div>
  )
}

export default Main