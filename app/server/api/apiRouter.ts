import express from 'express';
import bodyParser from 'body-parser';

import getUser from 'server/api/handlers/getUser';
import addToLearningWords from 'server/api/handlers/addToLearningWords';
import addToLearnedWords from 'server/api/handlers/addToLearnedWords';

const apiRouter = express.Router();

apiRouter
  .use(bodyParser.json())
  .get('/user', getUser)
  .post('/word/addToLearning', addToLearningWords)
  .post('/word/addToLearned', addToLearnedWords);

export default apiRouter;
