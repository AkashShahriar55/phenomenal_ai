"use client";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames, { Argument } from "classnames";
import Loader from './loader';

interface ImageUploadProps {
  className: String;
  onImageSelected?: (image:string|null) => void;
}

const ImageUpload:React.FC<ImageUploadProps> = ({ className , onImageSelected}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      setLoading(true);
    };

    reader.onload = () => {
      setUploadedImage(reader.result as string);
      if(onImageSelected){
        onImageSelected(reader.result as string)
      }
      setLoading(false);
    };

    reader.onerror = () => {
      console.error('Error reading file');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className={classNames("w-full h-full bg-darker-gray cursor-pointer focus:outline-none overflow-clip", className)}>
      {loading ? (
        <Loader className="h-10 w-10"/>
      ) : uploadedImage ? (

        <img src={uploadedImage} alt="Uploaded" className="object-cover w-full h-full" />
      ) : (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full h-full text-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-smooth text-sm">Drop the files here ...</p>
          ) : (
            <div className='flex flex-col items-center'>
              <img src="/images/image-icon.svg" alt="Uploaded" width='30' />
              <p className="mt-4 text-gray-smooth text-sm">Drag and drop an image</p>
              <p className="text-gray-smooth text-sm italic underline">Upload a file</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
