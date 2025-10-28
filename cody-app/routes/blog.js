const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.execute(`
      SELECT p.*, u.username 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);
    
    res.render('home', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.render('home', { posts: [], error: 'Failed to load posts' });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const [posts] = await pool.execute(`
      SELECT p.*, u.username 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = ?
    `, [req.params.id]);

    if (posts.length === 0) {
      return res.status(404).render('404', { message: 'Post not found' });
    }

    res.render('post', { post: posts[0] });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).render('error', { error: 'Failed to load post' });
  }
});

router.get('/create', requireAuth, (req, res) => {
  res.render('create-post');
});

router.post('/create', requireAuth, async (req, res) => {
  const { title, content } = req.body;

  try {
    await pool.execute(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, req.session.user.id]
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.render('create-post', { error: 'Failed to create post', title, content });
  }
});

router.get('/edit/:id', requireAuth, async (req, res) => {
  try {
    const [posts] = await pool.execute(
      'SELECT * FROM posts WHERE id = ? AND user_id = ?',
      [req.params.id, req.session.user.id]
    );

    if (posts.length === 0) {
      return res.status(404).render('404', { message: 'Post not found or unauthorized' });
    }

    res.render('edit-post', { post: posts[0] });
  } catch (error) {
    console.error('Error fetching post for edit:', error);
    res.status(500).render('error', { error: 'Failed to load post' });
  }
});

router.post('/edit/:id', requireAuth, async (req, res) => {
  const { title, content } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?',
      [title, content, req.params.id, req.session.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).render('404', { message: 'Post not found or unauthorized' });
    }

    res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.error('Error updating post:', error);
    res.render('edit-post', { error: 'Failed to update post', post: { id: req.params.id, title, content } });
  }
});

router.post('/delete/:id', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM posts WHERE id = ? AND user_id = ?',
      [req.params.id, req.session.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.redirect('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

router.get('/my-posts', requireAuth, async (req, res) => {
  try {
    const [posts] = await pool.execute(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [req.session.user.id]
    );

    res.render('my-posts', { posts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.render('my-posts', { posts: [], error: 'Failed to load your posts' });
  }
});

module.exports = router;