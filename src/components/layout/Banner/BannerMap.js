import Investing from "./Illustrations/Investing"

import React from 'react'
import AdventureMap from "./Illustrations/AdventureMap"
import BookLover from "./Illustrations/BookLover"
import Questions from "./Illustrations/Questions"
import Doctors from "./Illustrations/Doctors"
import Auth from "./Illustrations/Auth"
import Post from "./Illustrations/Post"
import Personal from "./Illustrations/Personal"

function BannerMap({ rootUrl }) {
    const map = {
        '/': {
            name: 'ברוכים הבאים',
            img: <Doctors />
        },
        '/steps': {
            name: 'תהליך הקבלה',
            img: <AdventureMap />
        },
        '/library': {
            name: 'הספרייה',
            img: <BookLover />
        },
        '/stats': {
            name: 'נתוני מועמדים',
            img: <Investing />
        },
        '/qna': {
            name: 'שאלות נפוצות',
            img: <Questions />
        },
        '/login': {
            name: 'התחברות',
            img: <Auth />
        },
        '/register': {
            name: 'הרשמה',
            img: <Auth />
        },
        '/announcements': {
            name: 'פרסומים',
            img: <Post />
        },
        '/profile': {
            name: 'פרופיל',
            img: <Personal />
        }    
    }

    return map[rootUrl]
}

export default BannerMap

