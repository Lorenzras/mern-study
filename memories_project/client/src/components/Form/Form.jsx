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
  const post = useSelector(
    (state) => (currentId ? state.posts.find((p) => p._id === currentId) : null),
  );

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '', title: '', message: '', tags: '', selectedFile: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{`${currentId ? 'Edting' : 'Creating'} a Memory`}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, ...{ creator: e.target.value } })} />
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
