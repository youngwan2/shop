export interface ItemsType {
    id: number,
    title: string,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number
    },
    description: string,
    category: string
}