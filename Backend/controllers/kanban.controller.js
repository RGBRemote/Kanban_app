const KanbanBoard = require('../models/KanbanBoard');

exports.createBoard = async (req, res) => {
  try {
    const { title, description, tasks, attachments } = req.body;
    
    const newBoard = new KanbanBoard({
      title,
      description: description || '',
      tasks: tasks || [],
      attachments: attachments || [],
      userId: req.user.uid
    });

    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (err) {
    res.status(500).json({ 
      error: 'Error creating board',
      details: err.message 
    });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await KanbanBoard.find(
      { userId: req.user.uid },
      { title: 1, updatedAt: 1 }
    ).sort({ updatedAt: -1 });
    
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching boards' });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await KanbanBoard.findOne({ 
      _id: req.params.boardId, 
      userId: req.user.uid 
    });
    
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching board' });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { title, description, tasks, attachments } = req.body;
    
    const updatedBoard = await KanbanBoard.findOneAndUpdate(
      { _id: req.params.boardId, userId: req.user.uid },
      { 
        title,
        description,
        tasks,
        attachments,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedBoard) return res.status(404).json({ error: 'Board not found' });
    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(500).json({ 
      error: 'Error updating board',
      details: err.message 
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await KanbanBoard.findOneAndDelete({
      _id: req.params.boardId,
      userId: req.user.uid
    });
    
    if (!deletedBoard) return res.status(404).json({ error: 'Board not found' });
    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting board' });
  }
};