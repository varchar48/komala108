import React, { useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player'
import { Play } from 'lucide-react'

export default function VideoPlayer({video, capture}) {
    
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <>
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
            {!isPlaying && (
                <button className="poster-button" onClick={handlePlay} aria-label="Play video">
                <img
                    src={`/videos/${capture}`}
                    alt="Poster"
                    className="poster"
                />
                <div className="play-icon"><Play size={50} strokeWidth={1} /></div>
                </button>
            )}
            <ReactPlayer
                className="react-player"
                url={`videos/${video}`}
                controls
                playing={isPlaying}
                width="100%"
                height="100%"
                onPlay={handlePlay}
            />
        </AspectRatio>
    </>
  )
}
