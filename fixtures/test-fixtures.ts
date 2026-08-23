import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutomationPage } from '../pages/AutomationPage';
import { FormBuilderPage } from '../pages/FormBuilderPage';
import { RulesBuilderPage } from '../pages/RulesBuilderPage';
import { AuthAPI } from '../api/auth.api';
import { LearningInstanceAPI } from '../api/learningInstance.api';

type MyFixtures = {
  loginPage: LoginPage;
  automationPage: AutomationPage;
  formBuilderPage: FormBuilderPage;
  rulesBuilderPage: RulesBuilderPage;
  authApi: AuthAPI;
  learningInstanceApi: LearningInstanceAPI;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  automationPage: async ({ page }, use) => {
    await use(new AutomationPage(page));
  },
  formBuilderPage: async ({ page }, use) => {
    await use(new FormBuilderPage(page));
  },
  rulesBuilderPage: async ({ page }, use) => {
    await use(new RulesBuilderPage(page));
  },
  authApi: async ({ request }, use) => {
    await use(new AuthAPI(request));
  },
  learningInstanceApi: async ({ request }, use) => {
    await use(new LearningInstanceAPI(request));
  },
});
export { expect } from '@playwright/test';
