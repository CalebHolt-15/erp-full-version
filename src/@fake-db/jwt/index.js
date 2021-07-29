import mock from "../mock"
import jwt from "jsonwebtoken"
import axios from "axios"

const data = {
  users: [
    {
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      password: "admin",
      avatar: require("@src/assets/images/portrait/small/avatar-s-11.jpg")
        .default,
      email: "admin@demo.com",
      role: "admin",
      ability: [
        {
          action: "manage", 
          subject: "all"
        }
      ],
      extras: {
        eCommerceCartItemsCount: 5
      }
    },
    {
      id: 2,
      fullName: "Jane Doe",
      username: "janedoe",
      password: "client",
      avatar: require("@src/assets/images/avatars/1-small.png").default,
      email: "client@demo.com",
      role: "client",
      ability: [
        {
          action: "read",
          subject: "ACL"
        },
        {
          action: "read",
          subject: "Auth"
        }
      ],
      extras: {
        eCommerceCartItemsCount: 5
      }
    }
  ]
}

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
  refreshTokenSecret: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
  expireTime: "10m",
  refreshTokenExpireTime: "10m"
}

// SIGN IN use Login.js NOT this mock
mock.onPost("/jwt/login").reply((request) => {
  const { email, password } = JSON.parse(request.data)
  console.log("82.request.data", request.data)
  const userDataSignin = request.data
  console.log("84.userDataSignin:", userDataSignin)

  let error = {
    email: ["Something went wrong"]
  }
  const user = data.users.find(u => u.email === email && u.password === password)
  console.log("120.users", user)//with all details

  if (user) {
    try {
      const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {expiresIn: jwtConfig.expireTime})
      const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime
      })
      console.log('134.accessToken', accessToken)
      console.log('135.refreshToken', refreshToken)

      const userData = { ...user }
      console.log("136.Userdata Signin:", userData)// all details
        //go to Login.js => .then
      delete userData.password

      const response = {
        userData,
        accessToken,
        refreshToken
      }

      return [200, response]
    } catch (e) {
      error = e
    }
  } else {
    error = {
      email: ["Email or Password is Invalid"]
    }
  }

  return [400, { error }]
})
// REGISTER
mock.onPost("/jwt/register").reply((request) => {
  console.log("request.data", request.data)
  console.log("request", request)

  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = data.users.find(user => user.email === email)
    const isUsernameAlreadyInUse = data.users.find(user => user.username === username)
    const error = {
      email: isEmailAlreadyInUse ? "This email is already in use." : null,
      username: isUsernameAlreadyInUse ? "This username is already in use." : null
    }

    if (!error.username && !error.email) {
      const userData = {
        email,
        password,
        username,
        fullName: "",
        avatar: null,
        role: "admin",
        ability: [
          {
            action: "manage",
            subject: "all"
          }
        ]
      }

      //SIGN UP
      const onSignUp = async () => {
        console.log("onSignUp")
        const options = {
          method: "POST",
          headers: {},
          withCredentials: true,
          data: userData,
          url: "https://127.0.0.1:8089/signup"
        }
        try {
          const data = await axios(options)
          console.log("onSignUp data", data)
        } catch (e) {
          console.error(e)
          // if (e.response.status === 400) {
          //   enqueueSnackbar(
          //     'User with provided phone-number already exists'
          //   );
          //   setMessage('User with provided phone-number already exists');
          //   toggleLoading();
          // }
        }
      }
      //
      // Add user id
      const length = data.users.length
      let lastIndex = 0
      if (length) {
        lastIndex = data.users[length - 1].id
      }
      userData.id = lastIndex + 1

      // data.users.push(userData)
      console.log("userData", userData)
      onSignUp()

      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expireTime
      })

      const user = Object.assign({}, userData)
      delete user["password"]
      const response = { user, accessToken }

      return [200, response]
    } else {
      return [200, { error }]
    }
  }
})

mock.onPost("/jwt/refresh-token").reply(request => {
  console.log("/jwt/refresh-token")
  const { refreshToken } = JSON.parse(request.data)

  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const userData = { ...data.users.find(user => user.id === id) }

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
    const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpireTime
    })

    delete userData.password
    const response = {
      userData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }

    return [200, response]
  } catch (e) {
    const error = "Invalid refresh token"
    return [401, { error }]
  }
})
