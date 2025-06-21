import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { APIKEY, value_converter } from '../../data';
import moment from 'moment';
import { throttle } from 'lodash';

function Feed({ category, data, setData, searchState }) {
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${APIKEY}`;
    const res = await fetch(url);
    const result = await res.json();
    setData(result.items);
    setNextPageToken(result.nextPageToken || null);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    if (!nextPageToken || loading) return;
    setLoading(true);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&pageToken=${nextPageToken}&key=${APIKEY}`;
    const res = await fetch(url);
    const result = await res.json();
    setData(prev => [...prev, ...result.items]);
    setNextPageToken(result.nextPageToken || null);
    setLoading(false);
  };

  useEffect(() => {
    if (!searchState) {
      fetchInitialData();
    }
  }, [category, searchState]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom && nextPageToken && !loading && !searchState) {
        fetchMoreData();
      }
    }, 300); // throttled to fire at most once every 300ms

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPageToken, loading, searchState]);

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

