import React, {useState, useEffect} from 'react'
import axios from 'axios'

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

  const skeletonItems = new Array(4).fill().map((_, inx)=> (
    <div key={inx} className='w-96 bg-slate-500 p-4 border'><div className='w-full h64 bg-gray-400'></div></div>
  ))
  
  const productItem = products?.map((product)=> (
    <div key={product.id} className='w-96 p-4 border'>
      <img src={product.images[0]} alt="" className='w-full cursor-pointer h-64 object-contain h64 bg-gray-200'/>
      <h3 className='text-xl mt-10 text-black font-sans'>{product.title}</h3>
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