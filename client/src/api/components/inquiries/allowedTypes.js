export const statusTypes = {
    'sent': {
        name: 'נשלח',
        default: true
    },
    'inProgress': {
        name: 'בתהליך'
    },
    'completed': {
        name: 'הושלם',
        finalStage: true
    },
    'rejected': {
        name: 'נדחה',
        finalStage: true,
        requireNote: true
    }
}
 

export const inquiryTypes = {
    'suggestion': {
        name: 'הצעה'
    },
    'bug': {
        name: 'תקלה'
    },
    'driveSuggest': {
        name: 'הצעת חומר'
    },
    'falseInfo': {
        name: 'מידע שגוי'
    },
    'falseCalc': {
        name: 'שקלול שגוי'
    },
    'commentReport': {
        name: 'דיווח על תגובה'
    }
} 