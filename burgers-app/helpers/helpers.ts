import { IReview } from "@/interfaces/interfaces"

export function calculateAverage (numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}

export function calculateAverageRating(reviews: IReview[]): number {
    const ratings = reviews.map(review => review.rating);
    return calculateAverage(ratings);
}

