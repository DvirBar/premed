import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../../redux/selectors/paths'
import InlineSelect from '../../common/InlineSelect'
import AddQuestionGroup from './AddQuestionGroup'
import QuestionGroupsList from './QuestionGroupsList'


function Questions() {
    // Path Select
    const paths = useSelector(getAllPaths)
    const [pathOptions, setPathOptions] = useState([])

    useEffect(() => {
        setPathOptions(paths.map(path => ({
            name: path.name,
            value: path._id
        })))
    }, [paths])

    const [selPath, setSelPath] = useState(pathOptions[0] || {})

    const selectPathOptions = path => {
        setSelPath(path)
    }


    return (
        <div className="questions-admin">
            <InlineSelect
            selected={selPath}
            selectOption={selectPathOptions}
            options={pathOptions} />

            <AddQuestionGroup
            pathId={selPath.value} />

            <QuestionGroupsList pathId={selPath.value} />
        </div>
    )
}

export default Questions
