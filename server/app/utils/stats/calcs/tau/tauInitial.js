import axios from 'axios';
import qs from 'querystring';
import { tauInitial as std } from './standardization'

const extCalcYear = 2021

const {
    bagrut: bagrutYears,
    psycho: psychoYears,
    intercept: interceptYears       
} = std

export const tauInitialMain = ({ bagrut, psycho, year}) => {
    if(year === extCalcYear) {
        return tauInitialCalc({ bagrut, psycho, year })
    }

    return auxTauInitial({ bagrut, psycho, year })
}

async function tauInitialCalc({ bagrut, psycho, year }) {
    const body = {
        txtBagrut:bagrut,
        txtPsicho:psycho,
        facs: '01',
        'Enter.x': 49,
        'Enter.y': 4
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    }

    try {
        const res = await axios.post('https://www.ims.tau.ac.il/md/ut/Sikuim_T.aspx', 
            qs.stringify(body), 
            config)

        const regFindTags = new RegExp(`<\s*td[^>]*>((.|\n)[^(td)]*?)<\s*\/\s*td><\s*td[^>]*>(&nbsp;ציון התאמה<span style='color:red'> ללא מור<\/span> ביה"ס )[^<]`)
        const tagContainers = res.data.match(regFindTags).toString()
        const regFindGrade = /\d{3}[.\d]*/;
        const grade = Number(tagContainers.match(regFindGrade))

        if(!grade) {
            return auxTauInitial({ bagrut, psycho, year })
        }

        return grade
    }
    
    catch(err) {
        console.log(err)
        return auxTauInitial({ bagrut, psycho, year })
    }
}

function auxTauInitial({ bagrut, psycho, year }) {
    return psychoYears[year]*psycho + bagrutYears[year]*bagrut + interceptYears[year]
}

// Reverse calcs
export function tauInitialRevBagrut({ psycho, initial, year }) {
    const psyCof = psychoYears[year]
    const bagCof = bagrutYears[year]
    const intCof = interceptYears[year]

    return (initial - intCof - psyCof*psycho) / bagCof
}

export function tauInitialRevPsycho({ bagrut, initial, year }) {
    const psyCof = psychoYears[year]
    const bagCof = bagrutYears[year]
    const intCof = interceptYears[year]

    return (initial - intCof - bagCof*bagrut) / psyCof
}

