import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import ProductCard from "./../../components/ProductCard";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //   .then(res => res.json())
  //   .then(data => setProducts(data.data))
  // }, [dispatch]);

  ///-------- Mount when the page change -------
  // const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery(null, { refetchOnMountOrArgChange: true });

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  const products = data?.data;

  const activeClass = "text-white bg-indigo-500 border-white";

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong.</p>
  }



  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${activeClass} `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrands("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${activeClass}`}>
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrands("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${activeClass}`}>
          Intel
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold`}>
          clear filters
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {
          products.map(product => <ProductCard key={product.model} product={product} />)
          // content
        }
      </div>
    </div>
  );
};

export default Home;
