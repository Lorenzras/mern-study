import mongoose from 'mongoose';
import express from 'express';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  console.log(post, 'success');

  const newPost = new PostMessage(
    { ...post, creator: req.userId, createdAt: new Date().toISOString() },
  );

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that id');
  console.log('success update');
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that id');
  console.log('success deletge');
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post deleted succesfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((_id) => _id !== String(req.userId));
  }

  const updatedPost = await PostMessage
    .findByIdAndUpdate(id, post, { new: true });

  return res.json(updatedPost);
};

export default router;
