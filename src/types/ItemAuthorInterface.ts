import authorInterface from "./author/authorInterface"

interface ItemAuthorInterface {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string,
    authorDetails: authorInterface,
    urlSpliced: string,
    staticImg: any
}

export default ItemAuthorInterface
