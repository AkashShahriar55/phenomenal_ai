
import { SignUpData } from '@/lib/types';
import classNames from 'classnames';
import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";


interface PInputProps<Type extends FieldValues> {
    className?: string;
    label: string;
    maxLength?: number;
    type: string;
    placeholder: string;
    name: Path<Type>,
    register: UseFormRegister<Type>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    info?: string;
    endIconSrc?: string;
    onEndIconClicked?: () => void;
    required?:boolean,
    textColor?: string,
    bgColor?:string,
    borderColor?:string,
    onChange?: (event:any) => void
}



function PInput<Type extends FieldValues>({
    className,
    label,
    maxLength,
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    info,
    endIconSrc,
    onEndIconClicked,
    required,
    textColor = "text-gray-dark",
    bgColor = "bg-light-gray",
    borderColor = "bg-darker-gray",
    onChange
}:PInputProps<Type>)  {
    return (
        <div className={classNames(className)}>
            <label className={`block text-sm  ${textColor}`}>{label}</label>
            <div className='relative flex items-center mt-1'>
                <input
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`block w-full  invalid:border-blood-red ${textColor} placeholder-gray-light px-3 py-2 min-h-12 ${bgColor} border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:${borderColor} sm:text-sm`}
                    {...register(name, {
                        valueAsNumber,
                        required: required,
                        onChange: onChange 
                    })}
                    aria-invalid={error?.message ? "true" : "false"}
                />

                {endIconSrc && <button className='cursor-pointer absolute right-3' type='button' onClick={onEndIconClicked}>
                    <img src={endIconSrc} className='' />
                </button>}
            </div>

            {info && <p className={`text-xs ${textColor} mt-1 italic`}>
                It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>}
            <p className='text-xs text-blood-red mt-1'>{error?.message}</p>
        </div>
    );
};

export default PInput;




export function SInput<Type extends FieldValues>({
    className,
    label,
    maxLength,
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    info,
    endIconSrc,
    onEndIconClicked,
    required,
    textColor,
    onChange
}:PInputProps<Type>)  {
    return (
        <div className={classNames(className)}>
            <div className='relative flex items-center mt-1'>
                <input
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="block w-full  italic invalid:border-blood-red text-white placeholder-[#555555] px-3 py-2 min-h-12 bg-transparent border-0 border-b border-[#888888]  shadow-sm focus:border-0  sm:text-sm"
                    {...register(name, {
                        valueAsNumber,
                        required: required,
                        onChange: onChange 
                    })}
                    aria-invalid={error?.message ? "true" : "false"}
                />

                {endIconSrc && <button className='cursor-pointer absolute right-3' type='button' onClick={onEndIconClicked}>
                    <img src={endIconSrc} className='' />
                </button>}
            </div>

            {info && <p className={`text-xs ${textColor ? textColor : "text-gray-normal"} mt-1 italic`}>
                It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>}
            <p className='text-xs text-blood-red mt-1'>{error?.message}</p>
        </div>
    );
};
