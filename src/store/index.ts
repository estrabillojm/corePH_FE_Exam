import { createStore } from 'vuex'
import topStory from './modules/topStory'
import item from './modules/item'
import author from './modules/author'

export default createStore({
  modules: {
    topStory,
    item,
    author
  }
})
