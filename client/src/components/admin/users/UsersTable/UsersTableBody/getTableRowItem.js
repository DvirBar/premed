import moment from 'moment'

export default function getTableRowItem(value, type) {
    switch(type) {
        case 'bool':
            if(value === true)
                return 'כן'
            else return ''
        
        case 'date':
            return moment(value).format('DD/MM/YYYY')

        default:
            return value
    }
} 