import {
  IGetUserRequestParams,
  IGetUserResponse,
} from 'common/types/requests/getUser';
import { IAddToLearningWordsRequestParams } from 'common/types/requests/addToLearningWords';
import { IAddToLearnedWordsRequestParams } from 'common/types/requests/addToLearnedWords';

class HttpClient {
  async get(url: string, params?: any) {
    const rawResponse = await fetch(`${url}?${new URLSearchParams(params)}`);

    return rawResponse.json();
  }

  async post(url: string, params?: any) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return await rawResponse.json();
  }

  async getUser(params: IGetUserRequestParams): Promise<IGetUserResponse> {
    return this.get('/api/user', params);
  }

  async addToLearningWords(
    params: IAddToLearningWordsRequestParams,
  ): Promise<void> {
    return this.post('/api/word/addToLearning', params);
  }

  async addToLearnedWords(
    params: IAddToLearnedWordsRequestParams,
  ): Promise<void> {
    return this.post('/api/word/addToLearned', params);
  }
}

const httpClient = new HttpClient();

export default httpClient;
