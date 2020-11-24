import { bagrut } from '../dataGroups';

const args = {
    psycho: {
        id: 'psycho',
        type: 'field'
    },
    mor: {
        id: 'mor',
        type: 'field'
    },
    bagrut: bagrut.map(item => ({
        id: item.id,
        type: 'group'
    })),
    bagrutHuji: {
        id: 'bagrutHuji',
        type: 'calcs'
    }
}

export default args;