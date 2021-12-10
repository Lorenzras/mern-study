import express from 'express';
import {
  createPost, getPosts, updatePost, deletePost, likePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', likePost);

export default router;
