import React, { Fragment, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { validError } from '../../../../../redux/actions/userdata';
import { getUniById } from '../../../../../redux/selectors/unis';
import ChatBox from '../../../../layout/ChatBox';
import { GroupsContext } from '../GroupsContext';
import AcceptCalc from './AcceptCalc';
import BlockBody from './BlockBody';
import DeclineCalc from './DeclineCalc';

function CalcBlock({ calc, value, suggestedAccepted }) {
    const uni = useSelector(getUniById(calc.uni))
    const [display, setDisplay] = useState(false)
    const toggleChatBox = toggle => {
        setDisplay(toggle)
    }

    const {
        getErrorByCalc
    } = useContext(GroupsContext)

    const validError = useSelector(getErrorByCalc(calc._id))

    return (
        <div className="calc-block">
            <ChatBox
            display={display}
            toggleChatBox={toggleChatBox}
            title={calc.name}>
                <ChatBox.Body>
                    <BlockBody
                    display={display}
                    calc={calc}
                    uniName={uni.name}
                    suggestValue={value}
                    validError={validError} />
                </ChatBox.Body>
            
                <ChatBox.Footer>
                    <div className={`calc-block-footer 
                    ${suggestedAccepted ? 'accept' : ''}`}>
                        {!validError &&
                            <Fragment>
                                <AcceptCalc 
                                calcId={calc._id}
                                value={value}
                                accepted={suggestedAccepted} />
                                <DeclineCalc
                                accepted={suggestedAccepted} />
                            </Fragment>   
                        }
                    </div>
                </ChatBox.Footer>
            </ChatBox>
        </div>
    )
}

export default CalcBlock
