import Vue from 'vue'
import Vuex from 'vuex'
import {BASEURL} from '@/js/config.js'
Vue.use(Vuex)

const state = {
  audio:{
    id: 0,
    name: '歌名',
    singer: '歌手',
    picUrl: BASEURL + '/static/img/logo.jpg', // 默认图片
    src:''  // 歌曲链接
  },
  isPlaying: false,  // 歌曲播放状态
  currentTime: 0, // 歌曲播放的时间
  durationTime: 0, // 歌曲总时间
  currentIndex: 0,  // 歌曲在列表中的位置
  list: [], // 当前播放列表
}

const mutations = {
  play(state) {
    state.audio.isPlaying = true
  },
  pause(state) {
    state.audio.isPlaying = false
  },
  updateList(state, list) {
    state.audio.list = list
  },
  setSrc(state, src) {
    state.audio.src = src
  },
  setCurrentTime(state, currentTime) {
    state.currentTime = currentTime
  },
  setDurationTime(state, durationTime) {
    state.durationTime = durationTime
  },
  setAudioIndex(state, index) {
    state.audio = state.list[index]
    state.currentIndex = index + 1
  },
  addToList(state, song) {

    state.list.push(song)
  },
  // 删除列表中的一首歌
  reduceList(state, id) {

  }

}

const actions = {
  updatePlayingAction({commi}) {
    commit('updatePlaying')
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
