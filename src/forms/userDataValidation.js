import * as validators from './validators';

export default function validateForm(value, fieldValids) {
    let error = '';
    for(let valid of fieldValids) {
        const validate = validators[valid.validType];
        error = validate(value, valid)      
        
        if(error && error.length !== 0) break;
    }

    return error
};