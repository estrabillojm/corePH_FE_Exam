<template>
  <div class="home"> 
    <v-loader v-if="!itemAuthorDetails.length"/>
    <v-layout v-else>
      <div>
        <v-card :itemAuthorDetails="itemAuthorDetails"/>
      </div>
    </v-layout>
  </div>
</template>
<script lang="ts">

// Vue, Hooks, Store (Vuex 4)
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'

// Typescript Types
import itemInterface from '@/types/item/ItemInterface'
import authorInterface from '@/types/author/authorInterface'
import ItemAuthorInterface from '@/types/ItemAuthorInterface'

// Components
import Layout from '@/components/dumb/Layout.vue'
import Loader from '@/components/dumb/Loader.vue'
import Card from '@/components/smart/Card.vue'

// 3rd Party Libraries
import moment from 'moment'

  export default{
      // component lists
      components: { 'v-layout': Layout, 'v-card': Card, 'v-loader': Loader },

      setup(){
        const store = useStore()
        const dataToShow = ref<number>(10)
        const userStories = computed(() => store.state.topStory.topStories)
        const items = computed(() => store.state.item.items)
        const authorDetails = computed(() => store.state.author.authorDetails)
        const authorIds = ref<string[]>([])
        const itemAuthorDetails = ref<ItemAuthorInterface[]>([]) // mapped object of authorids and items

        const mapAuthorDetailToItem = () => {
          itemAuthorDetails.value = items.value.map((item:itemInterface, index:number) => {
            return {
              ...item,
              authorDetails: authorDetails.value.filter((author:authorInterface) => author.id === item.by)[0],
              time: moment(item.time).format('LLL'),
              urlSpliced:  item.url ? `${item.url.slice(0,50)}...` : 'URL not provided',
              staticImg:  () => require(`@/assets/img/img-${index+1}.jpg`)
            }
          }).sort((a:itemInterface, b:itemInterface) => a.score - b.score)
        }

        const getAllAuthor = (payload:string[]) => { // run this 
          payload.forEach(author => {
            store.dispatch('author/fetchAuthors', author)
            .then(() => {
              if(authorDetails.value.length === dataToShow.value) mapAuthorDetailToItem() // run this function when authors are all in the array
            })
          })
        }

        // Start onMounted Hooks
        onMounted(() => {
          // used multiple nested .then() promise instead of async/await
          // because dispatch method always run asynchronously even using async/await
          // The 3 dispatch method must run synchronously because they are all relevant to each other 
          // topStories -> Items -> Users
          store.dispatch('topStory/fetchTopStories') // dispatch a action in topStory Module - Vuex 4
          .then(() => { 
            userStories.value.forEach((userStoryID:number) => {
              store.dispatch('item/fetchItems', userStoryID)
              .then(() => {
                if(items.value.length === dataToShow.value){
                  authorIds.value = items.value.map((item:itemInterface) => item.by) 
                  // run this function when items are all in the array then pass as params in the getAllAuthor function
                  getAllAuthor(authorIds.value) 
                }
              })
            })
          })
        })
        // End onMounted Hooks

        return {
          itemAuthorDetails
        }
        
      }
  }
</script>
