import { bagrut } from '../groups/bagrut';

const args = {
    psycho: {
        _id: 'psycho',
        type: 'field'
    },
    mor: {
        _id: 'mor',
        type: 'field'
    },
    bagrut: bagrut.map(item => ({
        _id: item._id,
        type: 'group'
    })),
    bagrutHuji: {
        _id: 'bagrutHuji',
        type: 'calcs'
    }
}

export default args;