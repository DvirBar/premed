export async function getQuestionGroupByPath(pathId) {
    return this.find({ path: pathId })
}

export async function getQuestionByIdOrFail(groupId, questId) {
    const group = this.findByIdOrFail(groupId)

    const question = group.questions.id(questId)

    if(!question) {
        throw 'Could not find requested question'
    }

    return {group, question}
}