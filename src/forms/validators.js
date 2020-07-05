import validator from 'validator';

export function isRequired(value, message) {
    if(!value)
        return message
}

export function isNotEmail(value, message) {
    if(!validator.isEmail(value))
        return message;
}

export function isNotValidName(value, message) {
    const pattern = RegExp('[a-zA-Z]+')
    if(!pattern.test(value)) 
        return message
}