export const getPageTopics = (topics, pageId) => {
    return topics.filter(topic => topic.page === pageId)
} 

export const getPageTopTopics = (topics, pageId) => {
    return topics.filter(topic => 
        topic.page === pageId && !topic.parent)
}