import express from 'express';
import PostModel from '../../db/moduls/postModel.js';
import UserModel from '../../db/moduls/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticate, async (req, res) => {
  const { namePost, textPost, isPublic } = req.body;
  const userId = req.user.userId;

  if (!namePost || typeof namePost !== 'string' || namePost.trim() === '') {
    return res.status(400).json({
      error: 'Post name is required and must be a non-empty string',
    });
  }

  if (!textPost || typeof textPost !== 'string' || textPost.trim() === '') {
    return res.status(400).json({
      error: 'Post text is required and must be a non-empty string',
    });
  }

  const postDataForDb = {
    name_post: namePost.trim(),
    text_post: textPost.trim(),
    is_public: !!isPublic,
    user_id: userId,
  };

  try {
    const newPost = await PostModel.create(postDataForDb);
    console.log('new post successfully created', newPost);
    res
      .status(201)
      .json({ message: 'Post was successfully created', post: newPost });
  } catch (error) {
    console.error('Error creating post', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Ошибка при получении постов:', error);
    res.status(500).json({ message: 'Не удалось получить посты' });
  }
});

router.get('/posts/:id', async (req, res) => {
  const postId = Number(req.params.id);

  if (!postId || isNaN(postId)) {
    return res
      .status(400)
      .json({ error: 'Invalid post ID provided. Must be a number.' });
  }

  try {
    const post = await PostModel.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const prevId = await PostModel.findPrevPostId(postId);
    const nextId = await PostModel.findNextPostId(postId);

    res.json({
      ...post,
      prev_post_id: prevId,
      next_post_id: nextId,
    });
  } catch (error) {
    console.error(`❌ Error fetching post with ID ${postId}:`, error);
    res.status(500).json({
      error: 'Failed to retrieve post due to server error.',
      details: error.message,
    });
  }
});

router.delete('/posts/:id', authenticate, async (req, res) => {
  const postId = Number(req.params.id);
  const userId = req.user.userId;

  if (!postId || isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID.' });
  }

  try {
    const deletedPost = await PostModel.deleteById(postId, userId);

    if (!deletedPost) {
      return res.status(403).json({
        error: 'Post not found or you are not the author.',
      });
    }

    res.status(200).json({
      message: 'Post successfully deleted.',
      deletedPost,
    });
  } catch (error) {
    console.error('Ошибка при удалении поста:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/posts/:id', authenticate, async (req, res) => {
  const postId = Number(req.params.id);
  const { namePost, textPost, isPublic } = req.body;
  const userId = req.user.userId;

  try {
    const existingPost = await PostModel.findByPk(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existingPost.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied: not your post' });
    }

    const updatedPost = await PostModel.update(postId, {
      name_post: namePost,
      text_post: textPost,
      is_public: isPublic,
    });

    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error('Ошибка при обновлении поста:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/posts/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const posts = await PostModel.findAllByUserId(user.user_id);

    res.json(posts);
  } catch (err) {
    console.error('Ошибка при получении постов пользователя:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/signup', async (req, res) => {
  console.log('Received signup data:', req.body);
  console.log('Field types:', {
    username: typeof req.body.username,
    email: typeof req.body.email,
    password: typeof req.body.password,
    confirmPassword: typeof req.body.confirmPassword,
  });

  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      console.log('Missing fields:', {
        username,
        email,
        password,
        confirmPassword,
      });
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    const existingUserByUsername = await UserModel.findUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const existingUserByEmail = await UserModel.findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const newUser = await UserModel.createUser({ username, email, password });

    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Error during user signup:', err);
    return res.status(500).json({
      message: 'Server error during registration.',
      error: err.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    const user = await UserModel.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res
      .status(500)
      .json({ message: 'Server error during login.', details: error.message });
  }
});

export default router;
