import getBonus from './bonusMap';
import getBestAverage from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';
import axios from 'axios'

export const bguInitial = async({ params }) => {
    const {
        'bagrutBgu': bagrut,
        'psycho': psycho,
    } = params

    const date = new Date()
    const year = date.getFullYear()
    const reqStr = `https://bgu4u.bgu.ac.il/pls/rgwp/!rg.acc_SubmitSekem/?rn_include_mitsraf=0&rn_year=${year + 1}&on_bagrut_average=${bagrut}&on_psychometry=${psycho}&on_final_sekem=`


    return axios.post(reqStr).then(res => {
/* Match regular expression for finding numbers 
in response string */
        const reg = /\d+/;
        const grade = Number(res.data.match(reg))
        return {
            value: grade
        }
    })
    .catch(err => console.log(err))
}

export const bguBargut = ({ params, values }) => {
    const {
        baseAvg,
        notRequired,
        addedArgs
    } = getBaseAvg(params, values, 'bgu', getBonus)
    
    const {
        value,
        payload
    } = getBestAverage(baseAvg, notRequired, 130, 20, addedArgs)

    const result = {
        payload: {
            ...payload,
            addedArgs
        },
        value: (value).toFixed(2)
    }
    return result
}