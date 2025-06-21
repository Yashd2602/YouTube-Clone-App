import React from 'react'
import {useParams} from 'react-router-dom'
import './Videos.css'
import PlayVideo from '../../PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended';
import Navbar from '../../Components/Navbar/Navbar';


function Videos({searchQuery,setSearchQuery,data,searchState}) {
  const{categoryId,videoId} = useParams();
  return (<>
  <Navbar />
    <div className='play-container'>
      <PlayVideo videoId={videoId} categoryId={categoryId} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Recommended videoId={videoId} categoryId={categoryId} data={data} searchState={searchState}/>
    </div></>
  )
}

export default Videos
