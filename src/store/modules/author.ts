import { apiAuthor } from "@/api"
import authorInterface from "@/types/author/authorInterface"
import authorState from "@/types/author/authorState"
const author = {
    namespaced: true,
    state:<authorState> {
        authorDetails:[]
    },
    mutations: {
        FETCH_AUTHORS: (state:any, payload:authorInterface) => {
            state.authorDetails.push(payload)
            // console.log(payload)
        }
    },
    actions: {
        fetchAuthors:({ commit }:any, payload:string)  => {
            return apiAuthor.get(`/${payload}.json`).then(res => {
                commit('FETCH_AUTHORS', res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
export default author