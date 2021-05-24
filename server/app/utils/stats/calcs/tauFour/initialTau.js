const knowledge = 289
const analytic = 233

const initialTau = params => {
    const {
        knowledge,
        analytic
    } = params
    const knowledgeCoef1 = knowledge >= 341 ? 211 : 0
    const knowledgeCoef2 = knowledge >= 306 ? 106 : 107
    const stdKnowledge =  knowledge - (knowledgeCoef1 + knowledgeCoef2)

    const calc = stdKnowledge*0.6 + analytic *0.4
    return calc
}