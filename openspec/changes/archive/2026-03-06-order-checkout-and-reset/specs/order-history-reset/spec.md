## ADDED Requirements

### Requirement: Order history reset functionality
The system SHALL provide ability to clear all order history.

#### Scenario: Reset button display
- **WHEN** checkout modal is open
- **THEN** "Start Over" / "重新開始" button is visible in modal

#### Scenario: Reset all orders
- **WHEN** user clicks "Start Over" / "重新開始" button
- **THEN** all orders are cleared from order history

#### Scenario: Return to empty state
- **WHEN** all orders are cleared
- **THEN** order history page displays empty state message

#### Scenario: Modal closes after reset
- **WHEN** orders are cleared via "Start Over" button
- **THEN** checkout modal closes automatically

#### Scenario: Sidebar button hidden after reset
- **WHEN** all orders are cleared
- **THEN** order history button in sidebar is hidden (no orders exist)

### Requirement: Reset confirmation and feedback
The system SHALL provide clear feedback when orders are reset.

#### Scenario: Immediate reset execution
- **WHEN** user clicks "Start Over" button
- **THEN** orders are cleared immediately without confirmation dialog

#### Scenario: Visual feedback
- **WHEN** orders are cleared
- **THEN** UI updates immediately to show empty state

#### Scenario: Grand total bar removal
- **WHEN** orders are cleared
- **THEN** grand total bar at bottom is hidden (no orders to total)
