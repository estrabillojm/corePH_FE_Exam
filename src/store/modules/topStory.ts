import { apiStory } from "@/api"

interface storyState {
    topStories: []|number[]
}

const topStory = {
    namespaced: true,
    state:<storyState> {
        topStories: []
    },
    mutations: {
        FETCH_TOP_STORIES: (state:any, payload:number[]) => {
            // RESET topStories STATE WHEN FETCH_TOP_STORIES MUTATION WAS COMMIT IN THE fetchTopStories ACTION
            state.topStories = [] 
            // ARRAY OF INCLUDED INDEX OF TOP STORY ID
            let selectedIndexStories:number[] = []
            // KEEP LOOPING UNTIL IT COMPLETE THE 10 RANDOM TOP STORY WITHOUT REDUDUNCIES
            while(state.topStories.length < 10){
                // GENERATE A RANDOM NUMBER WHICH IS USED AS AN INDEX TO SELECT A RANDOM STORY ID
                let randomIndex = Math.floor(Math.random() * payload.length) 
                // CHECK IF THE TOPSTORY ID INDEX IS ALREADY EXISTED TO AVOID REDUNDANT ID
                if(!selectedIndexStories.includes(randomIndex)){ 
                    state.topStories.push(payload[randomIndex])
                    selectedIndexStories.push(randomIndex)
                }
            }
        }
    },
    actions: {
        fetchTopStories: ({ commit }:any) => {
            return apiStory.get('/').then(res => {
                commit('FETCH_TOP_STORIES', res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
export default topStory