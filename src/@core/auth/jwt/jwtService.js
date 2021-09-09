import axios from "axios"
import Cookies from "universal-cookie"
import jwtDefaultConfig from "./jwtDefaultConfig"

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = {...jwtDefaultConfig}

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig}

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage

        // const accessToken = localStorage.getItem("token") //this.getToken()
        const accessToken = new Cookies().get("payload") //this.getToken()

        console.log("22.accessToken", accessToken)
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          console.log("24.if accesstoken:", accessToken)
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },

      (error) => Promise.reject(error)
    )

    console.log("34.here:")

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const {config, response} = error
        const originalRequest = config

        console.log("45.here")
        // ** if (status === 401) {
        if (response && response.status === 401) {
          console.log("48.here")
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false

              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise((resolve) => {
            console.log("62.here")
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    console.log("onAccessTokenFetched")
    this.subscribers = this.subscribers.filter((callback) => {
      callback(accessToken)
    })
  }

  addSubscriber(callback) {
    console.log("addSubscriber")
    this.subscribers.push(callback)
  }

  getToken() {
    console.log("getToken")
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    console.log("getRefreshToken")
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    console.log("setToken")
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    console.log("setRefreshToken")
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    console.log("login")
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    console.log("register")
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    console.log("128.refreshToken")
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
