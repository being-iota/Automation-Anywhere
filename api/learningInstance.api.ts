import { APIRequestContext, expect } from '@playwright/test';
import { ENDPOINTS } from '../utils/constants';

export class LearningInstanceAPI {
  constructor(private request: APIRequestContext) {}

  async createInstance(token: string, name: string, documentType: string) {
    const start = Date.now();
    const response = await this.request.post(ENDPOINTS.LEARNING_INSTANCE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        documentType,
      },
    });
    const duration = Date.now() - start;
    console.log(`Learning Instance API response time: ${duration} ms`);

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    
    // Assertions on the response body schema
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('status');
    expect(body.name).toBe(name);

    return body;
  }
}
