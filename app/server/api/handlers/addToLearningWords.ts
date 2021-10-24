import { Request, Response } from 'express';

import { IAddToLearningWordsRequestParams } from 'common/types/requests/addToLearningWords';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function addToLearningWords(
  req: Request<unknown, unknown, IAddToLearningWordsRequestParams, unknown>,
  res: Response,
) {
  const { userLogin, wordIndex } = req.body;

  const db = await getDB();

  const user = db.users.find((u) => u.login === userLogin);

  if (!user) {
    return res.status(404);
  }

  user.learningCardIndexes.push(wordIndex);

  await writeDB(db);
}
