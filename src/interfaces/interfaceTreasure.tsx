
export interface Treasure{
    location: number[],
    hint?: {
        image_url: string,
        text:string
    },
    found?: {
        proof:string,
        user_id: string
    }[]

}