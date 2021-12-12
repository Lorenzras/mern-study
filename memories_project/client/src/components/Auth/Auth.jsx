import {
  Avatar, Container, Grid, Paper, Typography,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';

export default function Auth() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    handleShowPassword(false);
  };

  // Configure at https://console.cloud.google.com/

  const googleSuccess = async (res) => {
    console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccesful. Try Again Later');
  };

  return (

    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" onChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" onChange={handleChange} type="email" />
            <Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />}

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                clientId="1073118856950-q3ue54nicprvq19rfllqr4aoo4oipo7l.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="contained"
                  >
                    Google Sign In

                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign up"}
                </Button>
              </Grid>

            </Grid>
          </Grid>

        </form>
      </Paper>
    </Container>
  );
}

/** Issues and resolution
 * 1. SSO: Popup closed by user
 * - Wait for new settings to propagate, or recreate the OAuth Cliend ID
 *  */
