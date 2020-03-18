import express from 'express';
import PostController from '../controllers/posts';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  const result = await PostController.fetchPosts();
  res.json(result);
});

router.get('/find/byId', async (req, res) => {
  const { postId } = req.query;
  if (postId) {
    const result = await PostController.findPostById(req.query);
    res.json(result);
  } else {
    res.json({
      data: 'No post ID provided',
      success: false,
    });
  }
});

router.get('/find/byUser', async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const result = await PostController.findPostByUser(req.query);
    res.json(result);
  } else {
    res.json({
      data: 'No User ID provided',
      success: false,
    });
  }
});

router.get('/find/byFriends', async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const result = await PostController.findPostByFriends(req.query);
    res.json(result);
  } else {
    res.json({
      data: 'No User ID provided',
      success: false,
    });
  }
});

router.post('/create', async (req, res) => {
  const { text, mood, authorId } = req.body;
  if (text && mood && authorId) {
    const result = await PostController.createPost(req.body);
    res.json({
      success: true,
      data: result,
    });
  } else {
    res.json({
      success: false,
      data: 'Please provide text, mood and author to create a post',
    });
  }
});

router.post('/unlike', async (req, res) => {
  const { authorId, postId } = req.body;
  if (authorId && postId) {
    try {
      const result = await PostController.unlikePost(req.body);
      res.json({
        success: typeof result === 'string' ? false : true,
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      data: 'Please provide postId and authorId to unlike a post',
    });
  }
});

router.post('/like', async (req, res) => {
  const { authorId, postId } = req.body;
  if (authorId && postId) {
    try {
      const result = await PostController.likePost(req.body);
      res.json({
        success: typeof result === 'string' ? false : true,
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      data: 'Please provide postId and authorId to like a post',
    });
  }
});

router.post('/comment/create', async (req, res) => {
  const { authorId, text, postId } = req.body;
  if (authorId && text && postId) {
    try {
      const result = await PostController.createComment(req.body);
      res.json({
        success: typeof result === 'string' ? false : true,
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      data: 'Please provide text, postId and authorId to create a comment in a post',
    });
  }
});

router.post('/comment/like', async (req, res) => {
  const { authorId, postId, commentIndex } = req.body;
  if (authorId && postId && commentIndex) {
    try {
      const result = await PostController.likeComment(req.body);
      res.json({
        success: typeof result === 'string' ? false : true,
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      data: 'Please provide authorId, postId and comment index to like a comment',
    });
  }
});
router.post('/comment/unlike', async (req, res) => {
  const { authorId, postId, commentIndex } = req.body;
  if (authorId && postId && commentIndex) {
    try {
      const result = await PostController.unlikeComment(req.body);
      res.json({
        success: typeof result === 'string' ? false : true,
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      data: 'Please provide authorId, postId and comment index to unlike a comment',
    });
  }
});

router.post('/report', async (req, res) => {
  const { authorId, postId } = req.body;
  if (authorId && postId) {
    const result = await PostController.reportPost(req.body);
    res.json({
      success: typeof result === 'string' ? false : true,
      data: result,
    });
  } else {
    res.json({
      success: false,
      data: 'Please provide authorId, postId to report a post',
    });
  }
});

router.post('/unReport', async (req, res) => {
  const { authorId, postId } = req.body;
  if (authorId && postId) {
    const result = await PostController.unReportPost(req.body);
    res.json({
      success: typeof result === 'string' ? false : true,
      data: result,
    });
  } else {
    res.json({
      success: false,
      data: 'Please provide authorId, postId to unReport a post',
    });
  }
});

export default router;
