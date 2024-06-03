import classNames from 'classnames';
import React, { useState } from 'react';

interface InputQuestionProps {
    className?: string;
    placeholder: string;
    questionNo:string;
    totalQuestion:string;
    onSubmit: (feedback: string) => void;
    onClose: () => void;
}


const InputQuestion: React.FC<InputQuestionProps> = ({ className, placeholder,questionNo,totalQuestion, onSubmit, onClose }) => {

    const [feedback, setFeedback] = useState<string>('');

    return (
        <div className={classNames("bg-darker-gray rounded p-5 flex flex-col gap-4", className)}>
            <div className="flex justify-between">
                <p>Help us improve</p>
                <button className='cursor-pointer' onClick={onClose}>
                    <img src="/images/cross-icon.svg" alt="cross" className="" />
                </button>
            </div>
            <div className="flex flex-row">
                <div className='w-full'>
                    <textarea
                        className="w-full h-full p-3  placeholder:italic text-sm bg-darkest-gray text-white border border-transparent rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={placeholder}
                        onChange={(e)=>{setFeedback(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col h-full ml-5 justify-between'>
                    <button
                        type="submit"
                        className="h-9 min-w-24  cursor-pointer disabled:cursor-not-allowed disabled:bg-dark-gray disabled:text-on-gray bg-white  text-gray-normal py-2 rounded-md shadow-sm font-medium"
                        disabled={feedback === ""}
                        onClick={()=>{onSubmit(feedback)}}
                    >
                        Submit
                    </button>
                    <p className="w-full text-end">{questionNo}/{totalQuestion}</p>
                </div>

            </div>
        </div>
    );
};

export default InputQuestion;