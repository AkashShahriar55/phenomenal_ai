"use client";
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';

interface TextareaWithCountProps {
    maxLength: number;
    onNonEmptyInput?: (text:string) => void;
  }

const TextareaWithCount:React.FC<TextareaWithCountProps> = ({ maxLength, onNonEmptyInput }) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  useEffect(() => {
    if (onNonEmptyInput) {
        onNonEmptyInput(text);
    }
  }, [text, onNonEmptyInput]);

  return (
    <div className="relative w-full h-full">
      <textarea
        className="w-full h-full p-4 placeholder:italic text-sm bg-darker-gray text-white border border-transparent rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={maxLength}
        value={text}
        onChange={handleTextChange}
        rows={6}
        placeholder="Type your text here..."
      />
      <div className="absolute bottom-5 right-5 text-sm text-white">
        <span className='text-blood-red'>{text.length}</span> / {maxLength}
      </div>
    </div>
  );
};

export default TextareaWithCount;
