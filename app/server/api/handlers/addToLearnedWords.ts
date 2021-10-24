import { Request, Response } from 'express';

import { IAddToLearnedWordsRequestParams } from 'common/types/requests/addToLearnedWords';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function addToLearnedWords(
  req: Request<unknown, unknown, IAddToLearnedWordsRequestParams, unknown>,
  res: Response,
) {
  const { userLogin, wordIndex } = req.body;

  const db = await getDB();

  const user = db.users.find((u) => u.login === userLogin);

  if (!user) {
    return res.status(404);
  }

  user.learnedCardIndexes.push(wordIndex);

  await writeDB(db);
}
