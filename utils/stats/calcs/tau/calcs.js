import getBonus from './bonusMap';
import getBestAverage  from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';
import axios from 'axios';
import qs from 'querystring';

export const tauInitial = async(params) => {
    //M * 0.342694114 + 0.299848662 * initial +446.4705507
    
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
        notRequired,
        addedArgs
    } = getBaseAvg(params, values, 'tau', getBonus)

    const {
        value,
        payload
    } = getBestAverage(baseAvg, notRequired, 117, 20, addedArgs)

    const result = {
        payload: {
            ...payload,
            addedArgs
        },
        value: (value).toFixed(2)
    }
    return result
}