import React from 'react'
import './Navbar.css'
import menu from '../../assets/menu.png'
import logo from '../../assets/icons8-youtube-48.png'
import search from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import usericon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { APIKEY } from '../../data'

function Navbar({setSidebar,searchQuery,setSearchQuery,data,setData,setSearchState}) {
  console.log(data);
  
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div '>
        <img className='menu-icon' src={menu} alt="menu"  onClick={()=>setSidebar(prev=>prev===false?true:false)}/>
        <Link to="/"><img className='logo' src={logo} alt="logo" onClick={()=>setSearchState(false)}/></Link>
        <h1 className='title'>YouTube</h1>
      </div>
      <div className='nav-middle flex-div'>
        <div className="search-box flex-div">
        <input type="text" placeholder='Search' onChange={(e)=>setSearchQuery(e.target.value)}/>
        <Link to="/youtube"><img src={search} alt="search" onClick={async()=>{
          const searchDetails_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&key=${APIKEY}`
           const result = await fetch(searchDetails_url).then(response=>response.json())
              const videoIds = result.items.map(item => item.id.videoId).filter(id => id); // remove undefined

  const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(",")}&key=${APIKEY}`;
  const videosRes = await fetch(videosUrl);
  const finalResult = await videosRes.json();
  setSearchState(true);
  setData(finalResult.items)}}/></Link>
        </div>
      </div>
      <div className='nav-right flex-div'>
        <img src={upload} alt="upload" />
        <img src={more} alt="more" />
        <img src={notification} alt="notifications" />
        <img className='user-icon' src={usericon} alt="profile picture" />
      </div>
    </nav>
  )
}

export default Navbar
