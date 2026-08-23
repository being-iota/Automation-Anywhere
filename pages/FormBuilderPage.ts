import { Page } from '@playwright/test';

export class FormBuilderPage {
  constructor(private page: Page) {}

  canvas = this.page.locator('.form-canvas'); // Needs actual stable selector, assuming canvas area
  textboxTool = this.page.getByText('Text Box', { exact: true });

  saveButton = this.page.getByRole('button', { name: 'Save' });
  rulesTab = this.page.getByRole('tab', { name: /Form rules/i });

  async dragTextboxToCanvas() {
    const sourceBox = await this.textboxTool.boundingBox();
    const targetBox = await this.canvas.boundingBox();

    if (!sourceBox || !targetBox) {
      throw new Error('Unable to locate drag/drop elements');
    }

    await this.page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 10 }
    );
    await this.page.mouse.up();
  }

  async configureTextboxProperties(
    index: number,
    props: { label: string; minLength: string; maxLength: string; hint: string; tooltip: string; defaultValue: string }
  ) {
    // Click the specific text box on the canvas to open properties. 
    // Assuming the newly dropped text box has the default label "TextBox"
    await this.page.getByText('TextBox').nth(index).click();

    await this.page.getByLabel('Element label').fill(props.label);
    await this.page.getByLabel('Default value').fill(props.defaultValue);
    await this.page.getByLabel('Min').fill(props.minLength);
    await this.page.getByLabel('Max').fill(props.maxLength);
    await this.page.getByLabel('Hint below field').fill(props.hint);
    await this.page.getByLabel('Tool tip').fill(props.tooltip);
  }

  async saveForm() {
    await this.saveButton.click();
  }

  async navigateToRules() {
    await this.rulesTab.click();
  }
}
