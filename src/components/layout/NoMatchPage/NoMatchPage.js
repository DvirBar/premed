import React from 'react'
import { Link } from 'react-router-dom'
import PageNotFound from '../Banner/Illustrations/PageNotFound'
import ContentContainer from '../Containers/ContentContainer/ContentContainer'

function NoMatchPage() {
    return (
        <ContentContainer>
            <div className="no-match-page">
            <div className="no-match-page__text">
                    אופס.. הדף שחיפשתם לא נמצא או שהוא נמחק
                </div>
                <Link to="/">חזרה לדף הבית</Link>
                <div className="no-match-page__illustration">
                    <PageNotFound />
                </div>
            </div>
        </ContentContainer>
    )
}

export default NoMatchPage
