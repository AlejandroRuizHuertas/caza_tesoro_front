
export interface Treasure{
    location: number[],
    hint: {
        imageUrl: string,
        text:string
    },
    found?: {
        proof:string,
        userId: string
    }[]

}