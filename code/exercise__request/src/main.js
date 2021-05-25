/**
 * login & logout
 */

import { login, logout } from './api'

login({
  username: 'up366',
  password: '123456'
}).then(res => {
  const { data, result } = res
  if (result.code === 0 && data) {
    console.log(data.username, data.password)
  }
})

logout().then(res => res.result.code === 0 && console.log('logout'))
