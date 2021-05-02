import validator from 'validator';
import { validAdd } from '../redux/actions/datafields';

export function isRequired(value, message) {
    if(!value)
        return message
}

export function atLeastFour(value, message) {
    if(value.length < 4) {
        return message
    }
}

export function isRequiredArray(values, message) {
    if(values.length === 0)
        return message
}

export function isNotEmail(value, message) {
    if(!validator.isEmail(value))
        return message;
}

export function isNotHebName(value, message) {
    const pattern = new RegExp("^[א-ת']+[-]*[א-ת']+$")
    if(!pattern.test(value)) {
        return message
    }
}

export function isNotUsername(value, message) {
    const pattern = RegExp('^[a-zA-Z0-9]+[_.-]*[a-zA-Z0-9]+$')
    if(!pattern.test(value)) {
        return message
    }
}

export function isNotValidName(value, message) {
    const pattern = RegExp('^[a-zA-Zא-ת]+$')
    if(!pattern.test(value)) 
        return message
}

export function isPosNum(value) {
    const message = 'הערך חייב להיות מספר חיובי'

    if(isNaN(value) || value <= 0) {
        return message;
    }  
}

export function isInt(value) {
    const message = 'הערך חייב להיות שלם'

    if(!Number.isInteger(Number(value))) {
        return message
    }
}

export function numRange(value, valid) {
    const min = Number(valid.min);
    const max = Number(valid.max);

    const message = "הערך חייב להיות בין " + min + " ל- " + max

    if(value < min || value > max) {
        return message
    }
}

