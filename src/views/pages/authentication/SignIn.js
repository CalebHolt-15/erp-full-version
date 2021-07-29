import React, { useEffect, useState } from 'react'
// import { useAppState } from '../Provider/AppProvider'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { useStyles } from './useStyles'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'


const eye = <FontAwesomeIcon icon={faEye} />
// Not using this one
  const SignIn = ({ history, toggleLoading }) => { 
  const classes = useStyles()
  // const { apis, appName } = useAppState()
  const [message, setMessage] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [passwordShown, setPasswordShown] = useState(false)

  const togglePasswordVisiblity = () => {
    setPasswordShown(true)
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Phone Number is required'),
    password: Yup.string().required('Password is required')
  })

  const onSubmit = async (values, onSubmitProps) => {
    console.log('values:', values)
    // toggleLoading()
      
    const options = {
      method: 'POST',
      headers: {},
      withCredentials: true,
      data: { ...values },
      url: 'https://127.0.0.1:8089/signin'
    }

    try {
      const data = await axios(options)
      console.log('data signin:', data)
      enqueueSnackbar('Welcome')
      history.push('/')

    } catch (e) {
      console.error(e)
      if (e.response.status === 401) {
        setMessage('Invalid Phone-number or password combination!')
        enqueueSnackbar(
          'Invalid Phone-number or password combination!'
        )
      }
    }
    // toggleLoading()
  }

  useEffect(() => {
    const getCsrf = async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/jsoncharset=UTF-8' },
        withCredentials: true,
        data: {},
        url: 'https://127.0.0.1:8089/'
      }
      await axios(options)
    }
    getCsrf()
  }, ['https://127.0.0.1:8089/'])
 
  return (
    <Grid
      className={classes.background}
      container
      fullWidth
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid item className={classes.logotypeContainer}>
        <Typography
          className={classes.logotypeText}
          style={{ fontSize: 20 }}
        >
          Nice Student-Connect App
        </Typography>
      </Grid>
      <div>
        <Paper>
          <Card>
            <CardContent className={classes.content}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <Box my={4}>
                        <Typography variant="h3">
                          Nice-E-Scholar
                         </Typography>
                      </Box>
                      <Typography>
                        Welcome, Please Login in order to continue
                      </Typography>
                      <Typography color="error">{message}</Typography>
                      <Field
                        component={TextField}
                        name="email"
                        type="text"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <div className={classes.passWrapper}>
                        {/* <Field
                          component={TextField}
                          name="password"
                          type={passwordShown ? 'text' : 'password'}
                          label="Password"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        /> */}
                        <Field
                          name="password"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        >
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta
                          }) => (
                            <div>
                              <input
                                type={
                                  passwordShown ? 'text' : 'password'
                                }
                                placeholder="Password"
                                {...field}
                              />

                              {field.value.length > 0 && (
                                <i
                                  className={classes.i}
                                  onClick={togglePasswordVisiblity}
                                >
                                  {eye}
                                </i>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Box my={2}>
                        <Button
                          type="submtit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={
                            !formik.isValid || formik.isSubmitting
                          }
                        >
                          Login
                        </Button>
                      </Box>
                      <Divider />
                      <Box my={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => history.push('/auth/signup')}
                        >
                          New User? Create new Account
                        </Button>
                      </Box>
                    </Form>
                  )
                }}
              </Formik>
            </CardContent>
          </Card>
        </Paper>
      </div>
    </Grid>
  )
}

export default SignIn
