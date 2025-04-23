const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanban.controller');
const verifyFirebaseToken = require('../middleware/firebaseAuth');

router.use(verifyFirebaseToken);

// Get all boards for user
router.get('/', kanbanController.getBoards);

// Get single board
router.get('/:boardId', kanbanController.getBoard);

// Create new board
router.post('/', kanbanController.createBoard);

// Update board
router.put('/:boardId', kanbanController.updateBoard);

// Delete board
router.delete('/:boardId', kanbanController.deleteBoard);

module.exports = router;