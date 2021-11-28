/* eslint-disable no-unused-vars */
import {
  Container, AppBar, Typography, Grow, Grid,
} from '@mui/material';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import memories from './images/memories.jpg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Container>

      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
          <img className={classes.image} src={memories} alt="memories" height="60" />
        </Typography>

      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignContent="stretch" spacing={2}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <h1>App</h1>
    </Container>

  );
}
