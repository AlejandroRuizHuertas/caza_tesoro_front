
export interface Treasure{
    location: number[],
    hint?: {
        imageUrl: string,
        text:string
    },
    found?: {
        proof:string,
        user_id: string
    }[]

}