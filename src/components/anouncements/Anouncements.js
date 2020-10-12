import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../common/Carousel';
import { Link } from 'react-router-dom';
import AncItem from './AncItem';
import Modal from '../layout/Modal';
import AncDetails from './AncDetails';
import moment from 'moment';

function Anouncements() {
    const ancsSelector = useSelector(state => state.ancs);
    const [selAnc, setSelAnc] = useState({})
    const { ancs, loading } = ancsSelector;

    const [display, setDisplay] = useState(false);

    const toggleModal = toggle => {
        setDisplay(toggle)
    }

    const selectAnc = anc => {
        setSelAnc(anc)
        toggleModal(true)
    }

    const formatDate = moment(selAnc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")

    if(ancs) { 
        return (
            <Fragment>
                <Carousel className="anc-list">
                    {ancs.map(anc =>
                        <AncItem 
                        key={anc.id} 
                        anc={anc}
                        selectAnc={selectAnc}
                        />)}
                </Carousel>

                <Modal 
                display={display} 
                toggleModal={toggleModal}
                title={selAnc.title}
                subTitle={formatDate}>
                    <AncDetails anc={selAnc} />
                </Modal>
            </Fragment>
        )
    }
    else {
        return  (
            <div className="anc-list">
                <p>עדיין לא פורסמו עדכונים</p>
            </div>
        )
    }
}

export default Anouncements
