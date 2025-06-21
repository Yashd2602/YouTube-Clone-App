import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {createBrowserRouter,Navigate,replace,RouterProvider} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Videos from './Pages/Videos/Videos'

function App() {
  const[data,setData] = useState([])
  const[searchState,setSearchState] = useState(false)
  const [sidebar,setSidebar] = useState(false);
  const [searchQuery,setSearchQuery] = useState("");
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Navigate to='/youtube' replace />
    },
    {
      path:'/youtube',
      element:<Homepage sidebar ={sidebar} setSidebar={setSidebar} searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={data} setData={setData} searchState={searchState} setSearchState={setSearchState} />
    },
    {
      path:'/video/:categoryId/:videoId',
      element:<Videos searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={data} searchState={searchState}/>
    },
  ],{basename: import.meta.env.DEV ? '/' : '/YouTube-Clone-App'})
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

