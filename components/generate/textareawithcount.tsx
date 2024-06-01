"use client";
import { GenerateFormData } from '@/lib/types';
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextareaWithCountProps {
    maxLength: number;
    onNonEmptyInput?: (text:string) => void;
    type: string;
    placeholder: string;
    name:ValidFieldNames,
    register: UseFormRegister<GenerateFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  }

export type ValidFieldNames =
  | "prompt";

const TextareaWithCount:React.FC<TextareaWithCountProps> = ({ 
    maxLength, 
    onNonEmptyInput,
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber
}) => {
  const [text, setText] = useState<string>('');


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
        placeholder={placeholder}
        {...register(name, { valueAsNumber, onChange: (e) => {
            console.log('Name changed:', e.target.value);
            // You can also update the value manually if needed
            setText(e.target.value);
          },})}
      />
      <div className="absolute bottom-5 right-5 text-sm text-white">
        <span className='text-blood-red'>{text.length}</span> / {maxLength}
      </div>
    </div>
  );
};

export default TextareaWithCount;
