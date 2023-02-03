<template>
    <div v-for="(item, index) in itemAuthorDetails" :key="item.id" :class="index%2==0 ? 'cards card-even' : 'cards card-odd' ">
        <div class="card-details">
          <div class="card-white">
            <h3>{{ `${index+1}. ${item.title}` }}</h3>
            <p class="date">{{  item.time }} by <span class="author-name">{{ item.by }}</span></p>
            <div class="card-footer">
              <div class="score-and-karma">
                <p>Story Score : {{  item.score }}</p>
                <p>Author Karma : {{  item.authorDetails.karma.toLocaleString() }}</p>
              </div>
              <div class="url-container">
                <a :href="item.url" target="_blank" class="url">{{ item.urlSpliced }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="img-container">
          <div class="bg-img"></div>
          <img class="img" :src="item.staticImg()"/>
        </div>
      </div>
</template>
<script lang="ts">
    export default {  
        props: {
            itemAuthorDetails: {
                type: Array,
                required: true
            }
        }
    }
</script>
<style scoped>
  @import '@/assets/styles/card/card.css'
</style>