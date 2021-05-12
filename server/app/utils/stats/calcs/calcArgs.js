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
        type: 'calc'
    },
    bagrutTau: {
        _id: 'bagrutTau',
        type: 'calc'
    },
    bagrutTech: {
        _id: 'bagrutTech',
        type: 'calc'
    },
    bagrutBgu: {
        _id: 'bagrutBgu',
        type: 'calc'
    },
    initialTau: {
        _id: 'initialTau',
        type: 'calc'
    },
    finalTau: {
        _id: 'finalTau',
        type: 'calc'
    },
    initialHuji: {
        _id: 'initialHuji',
        type: 'calc'
    },
    finalHuji: {
        _id: 'finalHuji',
        type: 'calc'
    },
    initialTech: {
        _id: 'initialTech',
        type: 'calc'
    },
    initialBgu: {
        _id: 'initialBgu',
        type: 'calc'
    }
}

export default args;