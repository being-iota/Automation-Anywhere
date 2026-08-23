import { APIRequestContext } from '@playwright/test';
import { ENDPOINTS } from '../utils/constants';

export class AuthAPI {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string): Promise<string> {
    const response = await this.request.post(ENDPOINTS.AUTH, {
      data: {
        username,
        password,
      },
    });

    if (response.status() !== 200) {
      throw new Error(`Failed to authenticate. Status: ${response.status()}`);
    }

    const body = await response.json();
    return body.token; // Ensure this matches the actual response schema
  }
}
