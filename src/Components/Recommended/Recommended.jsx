import React, { useEffect, useState } from 'react'
import './Recommended.css'
import thumbnail1 from  '../../assets/thumbnail1.png'
import thumbnail2 from  '../../assets/thumbnail2.png'
import thumbnail3 from  '../../assets/thumbnail3.png'
import thumbnail4 from  '../../assets/thumbnail4.png'
import thumbnail5 from  '../../assets/thumbnail5.png'
import thumbnail6 from  '../../assets/thumbnail6.png'
import thumbnail7 from  '../../assets/thumbnail7.png'
import thumbnail8 from  '../../assets/thumbnail8.png'
import { APIKEY, value_converter } from '../../data'
import moment from 'moment';
import { Link } from 'react-router-dom'

function Recommended({categoryId,searchState,data}) {
    const[apiData,setApiData] = useState([]);

    useEffect(() => {
    if (searchState && data.length > 0) {
      setApiData(data);
    }
  }, [searchState, data]);
    
  useEffect(()=>{
     if (!searchState) {
      const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=50&key=${APIKEY}`;
        const res = await fetch(relatedVideo_url);
        const result = await res.json();
        setApiData(result.items);
      };
      fetchData();
    }
  }, [categoryId]);  

  return (
    
    <div className='recommended' > 
    {apiData.map((item,index)=>{
        return(
<Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channel}</p>
            <p>{value_converter(item.statistics.viewCount)}Views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </div>
    </Link>)})}
    </div>
  )
}

export default Recommended
