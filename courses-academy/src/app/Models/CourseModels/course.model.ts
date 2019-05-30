import { UserRating } from "./user-rating";

export interface Course {
    id: number,
    Title: string,
    Description: string,
    UserRatings: UserRating[],
    Participants: number[]
}