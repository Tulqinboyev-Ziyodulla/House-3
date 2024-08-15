import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const API_URL = "https://dummyjson.com";
const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(0);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products`, {
        params: {
          limit: 4,
        },
      })
      .then((res) => {
        setProducts(res.data.products.map((item) => ({ ...item, offset: 0 })));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const handleAddToCart = (id, positive = true) => {
    setProducts((prev) =>
      prev.map((item) => {
        return item.id === id
          ? { ...item, offset: positive ? item.offset + 1 : item.offset - 1 }
          : item;
      })
    );
  };
  const skeletonItems = new Array(4).fill().map((product, idx) => (
    <div className="p-4 border" key={idx}>
      {" "}
      <div className="w-full h-64 object-contain bg-slate-200"></div>
      <div className="h-4 bg-slate-200 w-full mt-3 rounded"></div>{" "}
      <div className="w-[350px] h-4 bg-slate-200 rounded mt-3"></div>{" "}
      <div className="w-[200px] h-4 bg-slate-200 mt-3 rounded"></div>
    </div>
  ));
  const productItem = products?.map((product) => (
    <div
      key={product.id}
      className="p-4 border"
    >
    <img src={product.images[0]} alt="" className='w-full cursor-pointer h-64 object-contain h64 bg-gray-200'/>
    <h3 className='text-xl mt-10 text-black font-bold'>{product.title}</h3>
    <p className=' mt-2'>{product.description} $</p>
    <p className='text-2xl mt-10 text-black font-bold'>{product.price} $</p>
    </div>
  ));
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-10 px-1 ">
        <div>
          {" "}
          <img
            className="w-[500px] m-auto mb-4 object-contain cursor-pointer h-[300px] bg-gray-200"
            src={data?.images[0]}
            alt=""
          />
          <div className="flex">
            {data?.images?.map((item, inx) => (
              <img
                className="w-[100px] h-[80px] object-contain m-auto cursor-pointer bg-gray-300"
                src={item}
                key={inx}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-[18px] font-bold">{data?.brand}</h2>
          <b className="text-[18px] font-[400] max-w-96">
            {data?.meta.createdAt}/
            <b className="text-[16px] font-[350]">{data?.description}</b>
          </b>
          <div className="flex gap-[50px]">
            <p className="text-[24px] font-bold">{data?.price} $</p>
            <div className=" ml-20">
              <button className="w-[32px] border text-[18px] rounded">-</button>
              <button className="w-[50px]">1</button>
              <button className="w-[32px] border text-[18px] rounded">+</button>
            </div>
          </div>
          <div className="flex gap-5">
            <button className="lg:py-[16px] bg-[#ff8a1e] cursor-pointer rounded-[32px] text-[#fff] lg:px-[98px] border py-[5px] px-[40px]">
              Добаить в корзину +
            </button>
          </div>
          <p className="text-[18px] font-[400] max-w-96">{data?.description}</p>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center ">
        {loading && skeletonItems}
        {productItem}
      </div>
    </div>
  );
};

export default Product;
