import React from 'react';
import classNames, { Argument } from "classnames";

const FeedbackReceived = ({ className,onClose }: { className: string,onClose:() => void }) => {
    return (
        <div className={classNames("bg-darker-gray rounded p-5 relative", className)}>
            <div className="flex py-8">
                <img src="/images/done-icon.svg" alt="cross" className="bg-positive-green w-10 h-10 p-3 rounded" />
                <div className='pl-5'>
                    <p className='text-positive-green'>Feedback received!</p>
                    <p>Thank you. Your feedback has been successfully received!</p>
                </div>
            </div>
            <button className='cursor-pointer absolute top-5 right-5 cursore-pointer' onClick={onClose}>
                    <img src="/images/cross-icon.svg" alt="cross" className="" />
                </button>
        </div>
    );
};

export default FeedbackReceived;