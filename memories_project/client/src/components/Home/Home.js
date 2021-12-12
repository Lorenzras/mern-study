import {
  Grow, Container, Grid,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

export default function Home() {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignContent="stretch"
          spacing={2}
          direction="row"
        >
          <Grid item xs={12} sm={7}>
            <Posts {...{ setCurrentId }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form {...{ currentId, setCurrentId }} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
