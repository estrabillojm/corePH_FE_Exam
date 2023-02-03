import axios from 'axios'

export const apiStory = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/topstories.json'
})

export const apiItem = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/item'
})

export const apiAuthor = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/user'
})

