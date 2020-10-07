import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InlineSelect from '../../common/InlineSelect'
import AddQuestionGroup from './AddQuestionGroup'
import QuestionGroupsList from './QuestionGroupsList'


function Questions() {
    // Path Select
    const paths = useSelector(state => state.paths.paths)
    const [selPath, setSelPath] = useState({})
    const [pathOptions, setPathOptions] = useState([])

    useEffect(() => {
        setPathOptions([{ name: 'כללי', value: undefined },
        ...paths.map(path => ({
            name: path.name,
            value: path._id
        }))])
    }, [paths])

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
