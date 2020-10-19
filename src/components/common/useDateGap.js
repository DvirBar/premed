import React from 'react'

function useDateGap() {
    const dateGap = (dateStr) => {
        const date = new Date(dateStr)
        const curDate = new Date()

        const diff = curDate.getTime() - date.getTime() 

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 28));
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor(diff / (1000));

        console.log(diff);

        if(seconds < 60) {
            return 'הרגע'
        }

        if(mins < 60 ) {
            if(mins === 1) 
                return 'לפני דקה'

            return `לפני ${mins} דקות`
        }

        if(hours < 24) {
            switch(hours) {
                case 1:
                    return 'לפני שעה';

                case 2:
                    return 'לפני שעתיים';

                default:
                    return `לפני ${hours} שעות`
            }
        } 

        if(days < 7) {
            switch(days) {
                case 1:
                    return 'אתמול';

                case 2:
                    return 'שלשום';

                default:
                    return `לפני ${days} ימים`
            } 
        }

        if(weeks < 4) {
            switch(weeks) {
                case 1:
                    return 'לפני שבוע';

                case 2:
                    return 'לפני שבועיים';

                default:
                    return `לפני ${weeks} שבועות`
            } 
        }

        if(months < 12) {
            switch(weeks) {
                case 1:
                    return 'לפני חודש';

                case 2:
                    return 'לפני חודשיים';

                default:
                    return `לפני ${months} חודשים`
            } 
        }

        if(months >= 12) {
            switch(weeks) {
                case 1:
                    return 'לפני שנה';

                case 2:
                    return 'לפני שנתיים';

                default:
                    return `לפני ${years} שנים`
            } 
        }
    }

    return dateGap;
    
}

export default useDateGap
