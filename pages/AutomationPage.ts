import { Page } from '@playwright/test';

export class AutomationPage {
  constructor(private page: Page) {}

  // Update selectors based on actual UI
  createFormButton = this.page.getByRole('button', { name: /create form/i });

  async navigateToForms() {
    // Logic to navigate to Automation -> Forms
    await this.page.getByRole('link', { name: /automation/i }).click();
    // Wait for the automation page to load
  }

  async createNewForm() {
    await this.createFormButton.click();
    // Wait for form builder to be ready
  }
}
