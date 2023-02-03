import { apiItem } from "@/api"
import itemInterface from "@/types/item/ItemInterface"
import itemState from "@/types/item/ItemState"
const item = {
    namespaced: true,
    state:<itemState> {
        items:[],
        itemAuthor: []
    },
    mutations: {
        FETCH_ITEMS: (state:any, payload:itemInterface) => {
            state.items.push(payload)
            state.itemAuthor.push(payload.by)
        }
    },
    actions: {
        fetchItems:({ commit }:any, payload:number)  => {
            return apiItem.get(`/${payload}.json`).then(res => {
                commit('FETCH_ITEMS', res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
export default item