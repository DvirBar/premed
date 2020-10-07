import React, { useState, Fragment } from 'react';
import Section from '../../common/Section';
import DropdownMenu from '../../common/DropdownMenu';
import QuestionsList from './QuestionsList';
import AddQuestion from './AddQuestion';
import EditQuestionGroup from './EditQuestionGroup';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteQuestGroup } from '../../../redux/actions/questgroups';

function QuestionGroupItem({ group }) {
    // Dropdown Menu
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);

    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleDelete = toggle => {
        setDisplayDelete(toggle)
    }

    const options = [
        {
            name: "הוספת שאלה",
            action: () => toggleAdd(true)
        },
        {
            name: "עריכת קבוצה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחיקת קבוצה",
            action: () => toggleDelete(true)
        }
    ]
    return (
        <div className="question-groups-item">
            <Section>
                <Section.Title>
                    <span>{group.name}</span>
                </Section.Title>
                <Section.Header>
                    <i 
                    className="material-icons group-menu"
                    onClick={() => toggleMenu(!displayMenu)}>
                        more_vert
                    </i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </Section.Header>
                <Section.Body>
                    <QuestionsList group={group} />
                </Section.Body>
            </Section>

            <AddQuestion
            group={group}
            display={displayAdd}
            toggleModal={toggleAdd} />

            <EditQuestionGroup
            group={group} />

            <VerifyDelete
            callback={deleteQuestGroup}
            values={[group._id]}
            display={displayDelete}
            toggleModal={toggleDelete} />
        </div> 
    )
}

export default QuestionGroupItem
