import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../common/Section';
import DropdownMenu from '../../common/DropdownMenu';
import Modal from '../../layout/Modal';
import AddTopic from '../topics/AddTopic';
import EditSubpage from './EditSubpage';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteSubpage } from '../../../redux/actions/pages';
import SubpageTopics from './SubpageTopics';
import LinksList from './LinksList';

function SubpageItem({ pageId, subpage }) {
    const [displaySection, setDisplaySection] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)

    const [topics, setTopics] = useState([])
    const selTopics = useSelector(state => state.topics)
    const loadTopics = selTopics.loading;

    useEffect(() => { // Bind selector to local state
        setTopics(selTopics.topics.filter(topic => 
            topic.subpage === subpage._id))
    }, [selTopics])

    const toggleMenu = (open, event) => {
        if(event) {
            event.stopPropagation();
        }
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
        <Fragment>
             <Section className="subpage-item">
                <Section.Title>
                    {subpage.name}
                </Section.Title>
                <Section.Header>
                    <div className="inline-menu">
                        <i className="material-icons"
                        onClick={e => toggleMenu(!displayMenu, e)}>more_vert</i>
                        <DropdownMenu
                        display={displayMenu}
                        toggleMenu={toggleMenu}
                        options={options} />
                    </div>
                </Section.Header>
                <Section.Body>
                    <LinksList 
                    subpage={subpage}
                    pageId={pageId} />

                    <SubpageTopics 
                    loading={loadTopics}
                    topics={topics} />
                </Section.Body>
            </Section>

            <AddTopic
            subpageId={subpage._id}
            topics={topics} 
            display={displayAdd}
            toggle={toggleAdd}
            title={"הוסף נושא"}/> 

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
        </Fragment>
    )
}

SubpageItem.propTypes = {
    pageId: PropTypes.string.isRequired,
    subpage: PropTypes.object.isRequired
}

export default SubpageItem
