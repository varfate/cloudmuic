const API_URL = 'http://musicapi.duapp.com/api.php'
const API_URL2 = 'https://api.imjad.cn/cloudmusic/'
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return API_URL + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit
  },
  getLrc (id) {
    return API_URL2 + '?type=lyric&id=' + id
  },
  getSong (id) {
    return API_URL + '?type=url&id=' + id
  },
  getPlayListDetail (id) {
    return API_URL2 + '?type=playlist&id=' + id
  },
  getMv (id) {
    return API_URL2 + '?type=mv&id=' + id
  },
  search (words) {
    return API_URL2 + '?type=search&s=' + words
  }
}
