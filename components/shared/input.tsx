
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
    textColor?: string
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
    textColor
}:PInputProps<Type>)  {
    return (
        <div className={classNames(className)}>
            <label className={`block text-sm  ${textColor ? textColor : "text-gray-dark"}`}>{label}</label>
            <div className='relative flex items-center mt-1'>
                <input
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="block w-full  invalid:border-blood-red text-gray-dark placeholder-gray-light px-3 py-2 min-h-12 bg-light-gray border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register(name, {
                        valueAsNumber,
                        required: required
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

export default PInput;
