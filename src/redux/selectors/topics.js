export const getPageTopics = (topicState, pageId) => {
    return topicState.topics.filter(topic => topic.page === pageId)
} 