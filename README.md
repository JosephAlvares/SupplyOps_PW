
# SupplyOps - Playwright Automation Framework

## 1. Project Overview
SupplyOps is a web-based supply chain management application.
This project automates application workflows using Playwright
with JavaScript.

## 2. Technologies Used
- JavaScript
- Node.js
- Playwright
- Playwright Test
- Git and GitHub
- Jenkins
- HTML Reporting

## 3. Framework Architecture
The framework follows the Page Object Model (POM).

Main components:
- Pages: Page Object Model classes
- Tests: Automation test scripts
- Fixtures: Custom Playwright fixtures
- Utils: Reusable utilities and test hooks
- Test Data: External test data
- Reports: Playwright HTML reports

## 4. Test Categories
- Smoke Testing
- Integration Testing
- System Testing
- End-to-End Testing

## 5. Execution Commands

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Run all tests:

npx playwright test

Run smoke tests:

npx playwright test --grep "@smoke"

Run integration tests:

npx playwright test --grep "@integration"

Run system tests:

npx playwright test --grep "@system"

Run tests in headed mode:

npx playwright test --headed

## 6. Environment Configuration
Application credentials are maintained through environment
variables in the .env file.

Never commit actual credentials to GitHub.

## 7. CI/CD Integration
Jenkins is configured to execute Playwright automation tests.

The pipeline includes:
- Checkout
- Install dependencies
- Install Playwright browsers
- Execute automation tests
- Publish HTML reports

## 8. Reporting
Playwright HTML reports are generated to review:
- Test execution status
- Passed tests
- Failed tests
- Execution details
- Screenshots and traces where configured

## 9. Version Control
GitHub is used for source code management.

The team follows feature branching and Pull Request
reviews before merging changes into main.
