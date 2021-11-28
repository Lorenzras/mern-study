import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';

import useStyles from './styles';

export default function Posts() {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  console.log(posts, 'posts');
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          // eslint-disable-next-line no-underscore-dangle
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )

  );
}
