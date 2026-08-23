import { Page } from '@playwright/test';

export class RulesBuilderPage {
  constructor(private page: Page) {}

  addRuleButton = this.page.getByRole('button', { name: 'Add rule' });
  saveButton = this.page.getByRole('button', { name: 'Save' });

  async addRule() {
    await this.addRuleButton.click();
  }

  async selectElement(elementName: string) {
    // Condition selection element dropdown
    await this.page.getByText('Select element').first().click();
    await this.page.getByRole('option', { name: elementName }).click();
  }

  async selectCondition(condition: string) {
    // Condition operator selection, usually another dropdown that appears after selecting element
    // Assuming it's the next combobox
    await this.page.locator('.condition-operator-dropdown, [role="combobox"]').nth(1).click();
    await this.page.getByRole('option', { name: condition }).click();
  }

  async addCondition() {
    await this.page.getByRole('button', { name: 'Add condition' }).click();
  }

  async selectConditionMode(mode: 'AND' | 'OR') {
    // AND / OR toggle logic, typically a radio button or select
    await this.page.getByRole('radio', { name: mode }).click();
  }

  async selectAction(action: string) {
    // Action selection logic
    // The "Then perform the following actions" section has a dropdown saying "Select element" initially or "Select action"
    await this.page.getByText('Select element').last().click();
    await this.page.getByRole('option', { name: action }).click();
  }

  async addRuleBelow(ruleName: string) {
    // Context menu -> Add Rule Below
    const ruleMenu = this.ruleCard(ruleName).locator('button').last(); // Usually the 3 dots menu is the last button
    await ruleMenu.click();
    await this.page.getByText('Add rule below', { exact: true }).click();
  }

  ruleCard(ruleName: string) {
    // The rule card has a warning icon and the text "Rule1"
    return this.page.locator('div').filter({ hasText: ruleName }).first(); // Generic fallback
  }

  async saveRules() {
      await this.saveButton.click();
  }
}
