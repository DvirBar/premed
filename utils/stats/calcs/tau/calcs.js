import getBonus from './bonusMap';
import getBestAverage  from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';
import axios from 'axios';
import qs from 'querystring';

export const tauInitial = async(params) => {
    const {
        'bagrutTau': bagrut,
        'psycho': psycho,
    } = params

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
        }
    }

    return axios.post('https://www.ims.tau.ac.il/md/ut/Sikuim_T.aspx', 
            qs.stringify(body), 
            config)
    .then(res => {
        const regFindTags = new RegExp(`<\s*td[^>]*>((.|\n)[^(td)]*?)<\s*\/\s*td><\s*td[^>]*>(&nbsp;ציון התאמה<span style='color:red'> ללא מור<\/span> ביה"ס )[^<]`)
        const tagContainers = res.data.match(regFindTags).toString()
        const regFindGrade = /\d{3}[.\d]*/;
        const grade = Number(tagContainers.match(regFindGrade))

        return {
            value: grade
        }
    })
    .catch(err => console.log(err))
}

export const tauBargut = (params, values) => {
    const {
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'tau', getBonus)

    let result = getBestAverage(baseAvg, notRequired, 117, 20, getBonus)

    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}