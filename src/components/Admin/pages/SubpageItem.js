import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DropdownMenu from '../../common/DropdownMenu';
import TopicItem from '../topics/TopicItem';
import Modal from '../../layout/Modal';
import AddTopic from '../topics/AddTopic';
import EditSubpage from './EditSubpage';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteSubpage } from '../../../redux/actions/pages';
import SubpageTopics from './SubpageTopics';

function SubpageItem({ pageId, subpage }) {
    const [displaySection, setDisplaySection] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)

    const topics = useSelector(state => 
        state.topics.topics.filter(topic => topic.subpage === subpage._id))
    const loadTopics =  useSelector(state => state.topics.loadTopics)

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleAdd = open => {
        setDisplayAdd(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "הוסף נושא",
            action: () => toggleAdd(true)
        },
        {
            name: "ערוך דף",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק דף",
            action: () => toggleVer(true)
        }
    ]
    
    return (
        <div>
            <div className="section-header">
                <span 
                className="section-title"
                onClick={() => setDisplaySection(!displaySection)}>
                    {subpage.name}
                </span>
                <div className="subpage-menu">
                    <i className="material-icons"
                    onClick={() => toggleMenu(!displayMenu)}>more_vert</i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </div>
            </div>
            <div className={displayMenu
                ? "section-content open" 
                : "section-content"}>
                <div className="section-content-holder">
                    <SubpageTopics topics={topics} />
                </div>
            </div>
            <Modal
            display={displayAdd}
            toggleModal={toggleAdd}
            title={"הוסף נושא"}>
                <AddTopic
                subpageId={subpage._id}
                topics={topics} />
            </Modal>  

            <Modal
            display={displayEdit}
            toggleModal={toggleEdit}
            title={"ערוך עמוד"}>
                <EditSubpage
                pageId={pageId}
                subpage={subpage} />
            </Modal>  

            <VerifyDelete 
            callback={deleteSubpage}
            values={[pageId, subpage._id]}
            display={displayVer}
            toggleModal={toggleVer} />

        </div>
    )
}

SubpageItem.propTypes = {
    pageId: PropTypes.string.isRequired,
    subpage: PropTypes.object.isRequired
}

export default SubpageItem
