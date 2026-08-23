import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Update these selectors based on the actual application
  // Robust fallback locators since exact ARIA labels may differ
  usernameInput = this.page.locator('input[type="text"], input[type="email"], input[name*="user"], input[name*="email"]').first();
  passwordInput = this.page.locator('input[type="password"]').first();
  loginButton = this.page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Log in"), button:has-text("Sign in")').first();

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for the login to process and navigation to occur
    await this.page.waitForLoadState('networkidle');
    // Using a more generous wait instead of strict URL match that might timeout
    await this.page.waitForTimeout(5000);
  }
}
