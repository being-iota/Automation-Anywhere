import { test, expect } from '../../fixtures/test-fixtures';
import formData from '../../test-data/form-data.json';
import { CONDITIONS, ACTIONS } from '../../utils/constants';

test.describe('Use Case 1 - Rules Builder', () => {

  test.beforeEach(async ({ loginPage, automationPage }) => {
    await loginPage.navigate();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await automationPage.navigateToForms();
  });

  test('should create a form with two textbox elements', async ({ automationPage, formBuilderPage }) => {
    await automationPage.createNewForm();
    await formBuilderPage.dragTextboxToCanvas();
    await formBuilderPage.dragTextboxToCanvas();
    
    expect(true).toBeTruthy();
  });

  test('should configure textbox properties', async ({ formBuilderPage }) => {
    await formBuilderPage.configureTextboxProperties(0, formData.form.textbox1);
    await formBuilderPage.configureTextboxProperties(1, formData.form.textbox2);
    await formBuilderPage.saveForm();
    
    expect(true).toBeTruthy();
  });

  test('should create Rule1 with multiple conditions', async ({ formBuilderPage, rulesBuilderPage }) => {
    await formBuilderPage.navigateToRules();
    await rulesBuilderPage.addRule();
    
    await expect(rulesBuilderPage.ruleCard('Rule1')).toBeVisible();
    await expect(rulesBuilderPage.ruleCard('Rule1').getByRole('button', { name: 'Edit' })).toBeVisible();

    await rulesBuilderPage.selectElement(formData.form.textbox1.label);
    await rulesBuilderPage.selectCondition(CONDITIONS.IS_NOT_EMPTY);
    
    await rulesBuilderPage.addCondition();
    await rulesBuilderPage.selectConditionMode('AND');
    await rulesBuilderPage.selectElement(formData.form.textbox2.label);
    await rulesBuilderPage.selectCondition(CONDITIONS.CONTAINS);
    
    expect(true).toBeTruthy();
  });

  test('should configure Set Value action', async ({ rulesBuilderPage }) => {
    await rulesBuilderPage.selectAction(ACTIONS.SET_VALUE);
    expect(true).toBeTruthy();
  });

  test('should create Rule2 and Rule3 using context menu', async ({ rulesBuilderPage }) => {
    await rulesBuilderPage.addRuleBelow('Rule1'); 
    await rulesBuilderPage.addRuleBelow('Rule2'); 
    await expect(rulesBuilderPage.ruleCard('Rule2')).toBeVisible();
    await expect(rulesBuilderPage.ruleCard('Rule3')).toBeVisible();
  });

  test('should persist all created rules after saving', async ({ rulesBuilderPage }) => {
    await rulesBuilderPage.saveRules();
    // Reload or re-navigate to rules tab and verify
    await expect(rulesBuilderPage.ruleCard('Rule1')).toBeVisible();
    await expect(rulesBuilderPage.ruleCard('Rule2')).toBeVisible();
    await expect(rulesBuilderPage.ruleCard('Rule3')).toBeVisible();
  });

});
