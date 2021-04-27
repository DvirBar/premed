import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../../../redux/selectors/paths'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import LinkItem from './LinkItem/LinkItem'
import BarChart from '../../../common/icons/BarChart/BarChart'
import Bubbles from '../../../common/icons/Bubbles/Bubbles'
import School from '../../../common/icons/School/School'
import Home from '../../../common/icons/Home/Home'
import Qna from '../../../common/icons/Qna/Qna'


function MainLinks() {
    const paths = useSelector(getAllPaths)
    console.log(paths);
    const links = [
        {
            name: "בית",
            url: "/",
            icon: ({outlined}) => <Home
                    color="#fff" 
                    width="4rem" 
                    height="4rem" 
                    outlined={outlined} />
        },
        {
            name: "תהליך הקבלה",
            url: `/steps/${paths[0]?._id}`,
            icon: ({outlined}) => <Bubbles 
                    color="#fff" 
                    width="4rem" 
                    height="4rem" 
                    outlined={outlined} />
        },
        {
            name: "הספרייה",
            url: `/library/${paths[0]?._id}`,
            icon: ({outlined}) => <School 
                    color="#fff"
                    outlined={outlined}
                    width="4rem"
                    height="4rem" />
        },
        {
            name: "נתונים",
            url: '/stats',
            icon:  ({outlined}) => <BarChart 
                    color="#fff" 
                    width="4rem" 
                    height="4rem" 
                    outlined={outlined} />
        },
        {
            name: "שאלות נפוצות",
            url: `/qna/${paths[0]?._id}`,
            icon: ({ outlined }) => <Qna 
                    color="#fff"
                    secondaryColor="#486974" 
                    width="4rem" 
                    height="4rem" 
                    outlined={outlined}  />
        }
    ]
    
    return (
        <li className="navbar__main-links">
            <ul className="navbar__main-links__wrapper">
                {links.map(link => 
                    <LinkItem
                    key={link.url}
                    link={link} />
                )}
            </ul>
        </li>
    )
}

export default MainLinks
