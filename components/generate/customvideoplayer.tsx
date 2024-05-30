import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import Video.js styles

interface VideoPlayerProps {
    options: videojs.PlayerOptions;
}

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({ options }) => {
    const videoRef = useRef(null);
    const playerRef = useRef<videojs.Player | null>(null);

    useEffect(() => {
        if (videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, options, () => {
                console.log('Player is ready');
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div data-vjs-player className="my-4">
            <video
                ref={videoRef}
                className="video-js vjs-theme-forest vjs-big-play-centered h-full w-full"
            />
            <button className="absolute top-4 right-4">
                <img src="/images/download-icon.svg" alt="cross" />
            </button>

        </div>
    );
};

export default CustomVideoPlayer;
