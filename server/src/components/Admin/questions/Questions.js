import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, useHistory, useParams, useRouteMatch } from 'react-router'
import { getAllPaths } from '../../../redux/selectors/paths'
import InlineSelect from '../../common/InlineSelect'
import ContentContainer from '../../layout/Containers/ContentContainer/ContentContainer'
import QuestionsProvider from '../../questions/QuestionsContext'
import QuestionsRouter from '../../questions/QuestionsRouter'


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

    const { path } = useRouteMatch()

    const { pathId } = useParams()
    const history = useHistory()
    const selectPathOptions = pathItem => {
        const url = generatePath(path, { pathId: pathItem.value })

        history.push(url)
    }

    return (
        <div className="admin-questions-admin">
            <InlineSelect
            selected={pathId}
            selectOption={selectPathOptions}
            options={pathOptions} />
            
            <ContentContainer>
                <QuestionsProvider isAdmin={true}>
                    <QuestionsRouter />
                </QuestionsProvider>
            </ContentContainer>
        </div>
    )
}

export default Questions
