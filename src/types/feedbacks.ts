interface ICreatedFeedback{
    feedback_id: string
}

interface ICreateFeedback{
    text: string
    rating: number
}

interface IFeedback{
    id: string
    text: string
    rating: number
    is_author: boolean
    liked_by_user: boolean
    disliked_by_user: boolean
    date: string
    reputation: number
}
export {ICreatedFeedback, IFeedback, ICreateFeedback}