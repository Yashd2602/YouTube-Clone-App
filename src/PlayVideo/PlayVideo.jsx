import React, { useEffect, useState } from 'react'
import "./PlayVideo.css"
import video from "../assets/video.mp4"
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import share from '../assets/share.png'
import save from '../assets/save.png'
import jack from '../assets/jack.png'
import userprofile from '../assets/user_profile.jpg'
import { APIKEY, value_converter } from '../data'
import moment from 'moment';
import { useParams } from 'react-router-dom'



function PlayVideo() {
  const {videoId} = useParams();
  const [apiData,setApiData] = useState(null);
  const [channelData,setChannelData] = useState(null);
  const [commentsData,setCommentsData] = useState([])

  const fetchVideoData = async()=>{
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&key=${APIKEY}`;
    await fetch(videoDetails_url).then(response=>response.json()).then(data =>setApiData(data.items[0]))
  }

  const fetchChannelData = async()=>{
    if(!apiData){
      return null
    }
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&maxResults=50&key=${APIKEY}`;
    await fetch(channelData_url).then(response=>response.json()).then(data =>setChannelData(data.items[0]))
  }

    const fetchCommentsData = async()=>{
    const commentsData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&maxResults=50&key=${APIKEY}`;
    await fetch(commentsData_url).then(response=>response.json()).then(data =>setCommentsData(data.items))
  }

useEffect(()=>{
  fetchVideoData();
  
},[videoId])
useEffect(()=>{
  fetchCommentsData();
  
},[apiData])
useEffect(()=>{
  fetchChannelData();
  
},[apiData])

  return (
    <div className='play-video'>
        {/* <video src={video} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
          <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} Views &bull;{apiData?moment(apiData.snippet.publishedAt).fromNow():"2 months ago"}</p>
          <div>
            <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"Likes"}</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span>
          </div>
        </div>
        <hr />
        <div className="publisher">
          <img src={channelData?channelData.snippet.thumbnails.default.url:null } alt="" />
          <div><p>{apiData?apiData.snippet.channelTitle:"User"}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):''} Subscribers</span>
          </div>
          <button>Subscibe</button>
        </div>
        <div className="vid-description">
          <p>{apiData?apiData.snippet.description.slice(0,250):"..."}</p>
          <hr />
          <h4>{apiData?value_converter(apiData.statistics.commentCount):""}</h4>
          {commentsData.map((comment,index)=>{
          return(<div className="comment" key={index}>
            <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(comment.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span></h3>
              <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
                <span>0</span>
              </div>
            </div>
          </div>)})}
        </div>
    </div>
  )
}

export default PlayVideo