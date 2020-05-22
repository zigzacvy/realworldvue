import axios from 'axios'

const apiClient = new axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(page, perPage) {
    return apiClient.get('/events?_page=' + page + '&_limit=' + perPage)
  },
  getEvent(id) {
    return apiClient.get('events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
