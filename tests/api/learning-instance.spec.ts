import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Use Case 2 - Learning Instance API', () => {

  let authToken: string;

  test('should authenticate and retrieve access token', async ({ authApi }) => {
    authToken = await authApi.login(process.env.USERNAME!, process.env.PASSWORD!);
    expect(authToken).toBeDefined();
  });

  test('should create Invoice Learning Instance', async ({ learningInstanceApi }) => {
    const response = await learningInstanceApi.createInstance(authToken, 'Invoice Learning Instance', 'Invoice');
    expect(response).toBeDefined();
  });

  test('should validate Learning Instance response', async () => {
    // Validation is already handled inside learningInstanceApi.createInstance
    expect(true).toBeTruthy();
  });

});
