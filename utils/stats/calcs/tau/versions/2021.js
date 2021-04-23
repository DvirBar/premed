import axios from 'axios';
import qs from 'querystring';

const auxTauInitial = ({ bagrut, psycho }) => {
    return 0.714*psycho + 2.876*bagrut - 125.722
}

export const tauInitial = async({ bagrut, psycho }) => {
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

    try {
        const res = await axios.post('https://www.ims.tau.ac.il/md/ut/Sikuim_T.aspx', 
            qs.stringify(body), 
            config)

        const regFindTags = new RegExp(`<\s*td[^>]*>((.|\n)[^(td)]*?)<\s*\/\s*td><\s*td[^>]*>(&nbsp;ציון התאמה<span style='color:red'> ללא מור<\/span> ביה"ס )[^<]`)
        const tagContainers = res.data.match(regFindTags).toString()
        const regFindGrade = /\d{3}[.\d]*/;
        const grade = Number(tagContainers.match(regFindGrade))

        if(!grade) {
            return auxTauInitial({ bagrut, psycho })
        }

        return grade
    }
    
    catch(err) {
        console.log(err)
    }
}

