import React from 'react';
import { PlayIcon } from './icons';
import './VideoCard.css';

// Accepts a bare video ID or any youtube.com / youtu.be link to one.
export function youtubeId(value) {
  if (!value) return null;
  const match = value.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live)\/)([\w-]{11})/);
  if (match) return match[1];
  return /^[\w-]{11}$/.test(value) ? value : null;
}

// "Watch the video" card at the end of an article that sets "video" in articles.json.
function VideoCard({ video, title }) {
  const id = youtubeId(video);
  if (!id) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      className="video-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="video-card-thumb">
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
        <span className="video-card-play" aria-hidden="true"><PlayIcon /></span>
      </span>
      <span className="video-card-text">
        <span className="eyebrow">Watch the video</span>
        <span className="video-card-title">{title || 'See this guide on YouTube'}</span>
        <span className="video-card-meta">A hands-on walkthrough in Sinhala on @techbulta</span>
      </span>
    </a>
  );
}

export default VideoCard;
