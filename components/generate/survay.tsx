import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import ReactionQuestion from "@/components/generate/reactionquestion";
import InputQuestion from './inputquestion';
import FeedbackReceived from './feedbackreceived';

enum SurvayState {
    Q1,
    Q2,
    Q3,
    Submitted,
    Closed
}


const Survay = () => {

    const [survayState, setSurvayState] = useState<SurvayState>(SurvayState.Q1);
    console.log(survayState)

    switch (survayState) {
        case SurvayState.Q1:
            return (<>
                <ReactionQuestion
                    className=""
                    question="Did the video accurately represent the prompt you provided?"
                    onClose={() => { setSurvayState(SurvayState.Closed) }}
                    onReact={(level) => {
                        setSurvayState(SurvayState.Q2)
                    }}
                    questionNo='03'
                    totalQuestion='03'

                />
            </>)
            break;

        case SurvayState.Q2:
            return (<>
                <ReactionQuestion
                    className=""
                    question="⁠How would you rate the quality of the video?"
                    onClose={() => { setSurvayState(SurvayState.Closed) }}
                    onReact={(level) => {
                        setSurvayState(SurvayState.Q3)
                    }}
                    questionNo='03'
                    totalQuestion='03'
                />
            </>)
            break;

        case SurvayState.Q3:
            return (<>
                <InputQuestion
                    className=''
                    placeholder="⁠Any additional comment of feedback?"
                    onClose={() => { setSurvayState(SurvayState.Closed) }}
                    onSubmit={(feedback) => {
                        setSurvayState(SurvayState.Submitted)
                    }}
                    questionNo='03'
                    totalQuestion='03'
                />
            </>)
            break;

        case SurvayState.Submitted:
            return (<>
                <FeedbackReceived className='' onClose={() => { setSurvayState(SurvayState.Closed) }} />
            </>)
            break;

        case SurvayState.Closed:
            return (<><div></div></>)
            break;

        default:
            break;
    }

};

export default Survay;