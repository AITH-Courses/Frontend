interface ICreatedFeedback{
    feedback_id: string
}
interface IFeedback{
    id: string
    text: string
    is_author: boolean
    liked_by_user: boolean
    disliked_by_user: boolean
    date: string
    reputation: number
}
export {ICreatedFeedback, IFeedback}