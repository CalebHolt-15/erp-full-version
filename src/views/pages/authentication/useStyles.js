import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'https://thumbs.dreamstime.com/b/autumn-fall-nature-scene-autumnal-park-beautiful-77869343.jpg'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  ht: {
    minWidth: '100%'
  },
  formContainer: {
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%'
    }
  },
  form: {
    width: 520
  },
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0
    // flexGrow: 1,
  },
  logotypeText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down('md')]: {
      fontSize: 48
    }
  },

  logotypeContainer: {
    backgroundColor: theme.palette.secondary.main,
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  passWrapper: {
    position: 'relative',
    display: 'flex',
    marginBottom: '14px'
  },
  i: {
    position: 'absolute',
    top: '40%',
    right: '4%',
    fontSize: '20px',
    '&:hover': {
      color: '#0099ff',
      cursor: 'pointer'
    }
  }
}))
