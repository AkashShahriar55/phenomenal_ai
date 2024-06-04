import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import Video.js styles

interface VideoPlayerProps {
    videosrc: string;
    filename:string
}

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({ videosrc, filename }) => {

    // const videoRef = useRef(null);
    // const playerRef = useRef<videojs.Player | null>(null);

    // useEffect(() => {
    //     if (videoRef.current && !playerRef.current) {
    //         playerRef.current = videojs(videoRef.current, options, () => {
    //             console.log('Player is ready');
    //         });
    //     }

    //     return () => {
    //         if (playerRef.current) {
    //             playerRef.current.dispose();
    //             playerRef.current = null;
    //         }
    //     };
    // }, [options]);

    return (
        <div className='h-full w-full flex flex-col justify-center items-center bg-black'>

            <ReactPlayer
                width="100%"
                height="100%"
                url={videosrc}
                controls={true}
                // light is usefull incase of dark mode
                light={false}
                // picture in picture
                pip={false}
            />
            
            <source src={videosrc} type="video/mp4" />

            <a className = "absolute top-4 right-4 cursor-pointer" href={videosrc} download="filename">
                <img src="/images/download-icon.svg" alt="download" className="" />
            </a>

        </div>
    );
};

export default CustomVideoPlayer;
