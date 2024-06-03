import classNames from 'classnames';
import React, { useState } from 'react';

interface ReactQuestionProps {
    className?: string;
    question: string;
    questionNo: string;
    totalQuestion: string;
    onReact: (level: string) => void;
    onClose: () => void;
}


const ReactionQuestion: React.FC<ReactQuestionProps> = ({ className, question, questionNo, totalQuestion, onReact, onClose }) => {


    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

    return (
        <div className={classNames("bg-darker-gray rounded p-5 flex flex-col gap-4", className)}>
            <div className="flex justify-between">
                <p>Help us improve</p>
                <button className='cursor-pointer' onClick={onClose}>
                    <img src="/images/cross-icon.svg" alt="cross" className="" />
                </button>

            </div>
            <p>{question}</p>
            <div className="flex flex-row justify-between items-end ">
                <div className="flex gap-3" >
                    <button className="aspect-square hover:border-2 rounded p-2.5 max-h-10 max-w-10 bg-[#E40513] cursor-pointer" onClick={() => { onReact("very_bad"); setSelectedReaction("very_bad") }}>
                        <img src="/images/level-1-icon.svg" alt="cross" className="" />
                    </button>
                    <button className="aspect-square  hover:border-2 rounded p-2.5 max-h-10 max-w-10 bg-[#FA9006] cursor-pointer" onClick={() => { onReact("bad"); setSelectedReaction("bad") }}>
                        <img src="/images/level-2-icon.svg" alt="cross" className="" />
                    </button>
                    <button className="aspect-square  hover:border-2  rounded p-2.5 max-h-10 max-w-10 bg-[#F4CA07] cursor-pointer" onClick={() => { onReact("average"); setSelectedReaction("average") }}>
                        <img src="/images/level-3-icon.svg" alt="cross" className="" />
                    </button>
                    <button className="aspect-square  hover:border-2 rounded p-2.5 max-h-10 max-w-10 bg-[#ADD805] cursor-pointer" onClick={() => { onReact("good"); setSelectedReaction("good") }}>
                        <img src="/images/level-4-icon.svg" alt="cross" className="" />
                    </button>
                    <button className="aspect-square  hover:border-2 rounded p-2.5 max-h-10 max-w-10 bg-[#28A738] cursor-pointer" onClick={() => { onReact("very_good"); setSelectedReaction("very_good") }}>
                        <img src="/images/level-5-icon.svg" alt="cross" className="" />
                    </button>
                </div>
                <p className="">{questionNo}/{totalQuestion}</p>
            </div>
        </div>
    );
};

export default ReactionQuestion;