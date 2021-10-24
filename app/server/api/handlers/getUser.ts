import { Request, Response } from 'express';

import {
  IGetUserRequestParams,
  IGetUserResponse,
} from 'common/types/requests/getUser';
import { IUser } from 'common/types/user';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function getUser(
  req: Request<unknown, unknown, unknown, IGetUserRequestParams>,
  res: Response,
) {
  const { login } = req.query;

  const db = await getDB();

  let user = db.users.find((u) => u.login === login);

  if (!user) {
    user = {
      login,
      learnedCardIndexes: [],
      learningCardIndexes: [],
    };

    await writeDB({
      ...db,
      users: [...db.users, user],
    });
  }

  const response: IGetUserResponse = {
    user,
  };

  res.send(response);
}
