import * as validators from './validators';

export default function validateForm(value, fieldValids) {
    let error = '';
    
    if(fieldValids.length !== 0) {
        for(let valid of fieldValids) {
            const validate = validators[valid.value];
            error = validate(value, valid)      
            
            if(error && error.length !== 0) break;
        }
    }

    return error
};