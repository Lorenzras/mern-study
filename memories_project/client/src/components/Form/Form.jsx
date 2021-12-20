/* eslint-disable no-underscore-dangle */
import {
  TextField, Button, Typography, Paper,
} from '@mui/material';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

export default function Form({ currentId, setCurrentId }) {
  console.log('rerendered');
  const post = useSelector(
    (state) => (currentId ? state.posts.find((p) => p._id === currentId) : null),
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '', message: '', tags: '', selectedFile: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  console.log('user?', user, user?.result);

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{`${currentId ? 'Edting' : 'Creating'} a Memory`}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, ...{ title: e.target.value } })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, ...{ message: e.target.value } })} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, ...{ tags: e.target.value.split(',') } })} />
        <div className={classes.fileInput}>

          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" type="submit" fullWidth onClick={clear}>Clear</Button>
        </div>
      </form>

    </Paper>
  );
}

Form.propTypes = {
  currentId: PropTypes.string.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};
