import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  root: {
    '& .MuiTextField-root': {
      margin: 1,
    },
  },
  avatar: {
    margin: 1,
    backgroundColor: 'Blue',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 3,
  },

  googleButton: {
    marginBottom: 2,
  },
}));
