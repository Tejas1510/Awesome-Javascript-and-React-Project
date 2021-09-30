const db = require('../models');

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find().populate('user', ['username', 'id']);
    // .populate('voted', ['username', 'id']);

    return res.status(200).json(polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.usersPolls = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await db.User.findById(id).populate('polls');

    return res.status(200).json(user.polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createPoll = async (req, res, next) => {
  const { id } = req.decoded;
  const { question, options } = req.body;
  try {
    const user = await db.User.findById(id);
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({ option, votes: 0 })),
    });
    user.polls.push(poll._id);
    await user.save();

    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.vote = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  const { answer } = req.body;
  try {
    if (answer) {
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option,
      );

      console.log('VOTE: USERID ', userId);
      console.log('VOTE: poll.voted ', poll.voted);
      console.log(
        'VOTE: vote filter',
        poll.voted.filter(user => user.toString() === userId).length,
      );

      if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        return res.status(202).json(poll);
      } else {
        throw new Error('Already voted');
      }
    } else {
      throw new Error('No Answer Provided');
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await db.Poll.findById(id).populate('user', [
      'username',
      'id',
    ]);
    // .populate('voted', ['username', 'id']);
    if (!poll) throw new Error('No poll found');

    return res.status(200).json(poll);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deletePoll = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  try {
    let user = await db.User.findById(userId)
    if(user.polls) { // not sure if necessary either...
      user.polls = user.polls.filter(userPoll => {
        return userPoll._id.toString() !== pollId.toString() // not sure if necessary to use toString()
      })
    }
    
    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error('No poll found');
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }
    await user.save()
    await poll.remove();
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
