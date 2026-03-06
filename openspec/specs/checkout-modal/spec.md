## ADDED Requirements

### Requirement: Checkout modal display
The system SHALL display a checkout modal dialog when the checkout button is clicked.

#### Scenario: Modal opens on checkout button click
- **WHEN** user clicks "Check Out" / "結帳" button
- **THEN** a modal dialog appears with checkout information

#### Scenario: Welcome message display
- **WHEN** checkout modal opens
- **THEN** welcome message "歡迎光臨" (Chinese) or "Welcome" (English) is displayed

#### Scenario: Experience wish display
- **WHEN** checkout modal opens
- **THEN** experience wish "希望你有一次愉快的體驗" (Chinese) or "Hope you have a pleasant experience" (English) is displayed

#### Scenario: Payment instruction display
- **WHEN** checkout modal opens
- **THEN** payment instruction "請前往收銀處付款" (Chinese) or "Please proceed to cashier for payment" (English) is displayed

#### Scenario: Grand total display in modal
- **WHEN** checkout modal opens
- **THEN** grand total (sum of all orders) is displayed in HKD currency format

#### Scenario: Modal close behavior
- **WHEN** user clicks outside modal or close button
- **THEN** modal closes and user returns to order history page

### Requirement: Checkout button visibility
The system SHALL show the checkout button only when orders exist.

#### Scenario: Button visible with orders
- **WHEN** user has one or more orders in history
- **THEN** "Check Out" / "結帳" button is visible on order history page

#### Scenario: Button hidden without orders
- **WHEN** user has no orders in history
- **THEN** "Check Out" / "結帳" button is hidden

### Requirement: Modal bilingual support
The system SHALL display all modal text in the current UI language.

#### Scenario: Chinese UI language
- **WHEN** UI language is set to Chinese
- **THEN** all modal text displays in Chinese

#### Scenario: English UI language
- **WHEN** UI language is set to English
- **THEN** all modal text displays in English

#### Scenario: Language switching
- **WHEN** user switches language while modal is open
- **THEN** modal text updates to reflect new language
