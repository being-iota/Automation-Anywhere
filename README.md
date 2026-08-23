# Automation Anywhere SDET Assignment

## Overview

Automation framework developed for automating:
1. Rules Builder UI workflow
2. Learning Instance API workflow

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test
- REST API

## Framework Design

The framework is designed using the **Page Object Model (POM)** pattern. It separates the UI interactions from the test logic, making the code more readable and maintainable. Custom Playwright fixtures are used to inject Page Objects and API clients directly into the tests.

## Project Structure

```
automation-anywhere-sdet-assignment/
├── tests/
│   ├── ui/
│   │   └── rules-builder.spec.ts      # UI tests for Use Case 1
│   └── api/
│       └── learning-instance.spec.ts  # API tests for Use Case 2
├── pages/
│   ├── LoginPage.ts                   # POM for Login
│   ├── AutomationPage.ts              # POM for Automation tab
│   ├── FormBuilderPage.ts             # POM for Form Canvas
│   └── RulesBuilderPage.ts            # POM for Rules Builder
├── api/
│   ├── auth.api.ts                    # API client for authentication
│   └── learningInstance.api.ts        # API client for learning instances
├── fixtures/
│   └── test-fixtures.ts               # Custom Playwright fixtures
├── utils/
│   ├── constants.ts                   # Static constants and timeouts
│   └── helpers.ts                     # Utility functions
├── test-data/
│   └── form-data.json                 # Test data for inputs
├── playwright.config.ts               # Playwright configuration
├── .env                               # Environment variables template
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory (you can copy from the provided template) and update it with your actual credentials and endpoints discovered from the Network tab:

```env
BASE_URL=https://community.cloud.automationanywhere.digital
USERNAME=your_email@example.com
PASSWORD=your_password
AUTH_ENDPOINT=/v1/authentication
LEARNING_INSTANCE_ENDPOINT=/v1/learning-instances
```

## Execute Tests

To run all tests:
```bash
npx playwright test
```

## UI Tests

To run only the UI tests (Rules Builder):
```bash
npx playwright test tests/ui/rules-builder.spec.ts
```

## API Tests

To run only the API tests (Learning Instance):
```bash
npx playwright test tests/api/learning-instance.spec.ts
```

## Generate Report

To view the HTML report after execution:
```bash
npx playwright show-report
```

## Test Evidence

All tests are configured to capture traces on the first retry, screenshots on failure, and videos on failure. These will be available in the `playwright-report` folder after execution.

## Notes

- **Credentials**: Ensure credentials are stored securely via the `.env` file and are not committed to the repository (the `.env` file is included in `.gitignore`).
- **Selectors and Endpoints**: The UI and API locators are configured based on the actual Automation Anywhere UI and network schema. Ensure the UI loads within the configured timeout before tests interact with the elements.
