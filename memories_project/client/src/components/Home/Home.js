import {
  Grow, Container, Grid, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

export default function Home() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignContent="stretch"
          spacing={2}
          direction={isSmallDevice ? 'column-reverse' : 'row'}
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
