import React, { useState } from 'react'
import './Homepage.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import Navbar from '../../Components/Navbar/Navbar';

function Homepage({sidebar,setSidebar,searchQuery,setSearchQuery,data,setData,searchState,setSearchState}) {
  const [category,setCategory] = useState(0);
  
  return (
    <>
    <Navbar setSidebar={setSidebar} searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={data} setData={setData} setSearchState={setSearchState}/>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category} data={data} setData={setData} searchState={searchState}/>
      </div>
    </>
  )
}

export default Homepage
