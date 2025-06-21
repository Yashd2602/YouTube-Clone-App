import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { APIKEY, value_converter } from '../../data';
import moment from 'moment';

function Feed({ category, data, setData, searchState }) {
  const [nextPageToken, setNextPageToken] = useState(null);

  const fetchInitialData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${APIKEY}`;
    const res = await fetch(url);
    const result = await res.json();
    setData(result.items);
    setNextPageToken(result.nextPageToken || null);
  };

  const fetchMoreData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&pageToken=${nextPageToken}&key=${APIKEY}`;
    const res = await fetch(url);
    const result = await res.json();
    setData(prev => [...prev, ...result.items]);
    setNextPageToken(result.nextPageToken || null);
  };

  useEffect(() => {
    if (!searchState) {
      fetchInitialData();
    }
  }, [category, searchState]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && nextPageToken && !searchState) {
        fetchMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPageToken, searchState]);

  return (
    <div className='feed'>
      {data.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id.videoId || item.id}`} className='card' key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt='' />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {item.statistics ? value_converter(item.statistics.viewCount) : 'N/A'} Views &bull;{' '}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
