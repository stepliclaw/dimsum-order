<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0
Modified principles: (template placeholders) → 4 new principles
  - I. Code Quality (NON-NEGOTIABLE)
  - II. Testing Standards (NON-NEGOTIABLE)
  - III. User Experience Consistency
  - IV. Performance Requirements
Added sections:
  - Code Quality Standards
  - Performance Requirements
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ Constitution Check section aligns
  - .specify/templates/spec-template.md: ✅ No changes needed
  - .specify/templates/tasks-template.md: ✅ No changes needed
  - .specify/templates/checklist-template.md: ⚠ pending (verify gates)
Follow-up TODOs: None
-->

# dimsum-order Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

All code MUST adhere to established quality standards before merge:

- **Linting & Formatting**: All code MUST pass linting and formatting checks with zero warnings
- **Type Safety**: Strict type checking MUST be enabled; no `any` or untyped code in production paths
- **Code Reviews**: Every change requires at least one review from a team member
- **Documentation**: Public APIs, functions, and complex logic MUST have inline documentation
- **DRY Principle**: No code duplication; extract reusable logic into shared modules
- **Single Responsibility**: Each function, class, and module MUST have a single, well-defined purpose

**Rationale**: Consistent code quality reduces technical debt, improves maintainability, and enables faster onboarding.

### II. Testing Standards (NON-NEGOTIABLE)

All features MUST be covered by automated tests before deployment:

- **Test-First Development**: Write tests before or alongside implementation; tests MUST fail before code is written
- **Unit Tests**: All business logic MUST have unit tests with minimum 80% code coverage
- **Integration Tests**: All API endpoints, database operations, and external service integrations MUST have integration tests
- **Contract Tests**: All public interfaces and inter-service communications MUST have contract tests
- **Test Independence**: Each test MUST be independently runnable; no test dependencies or ordering requirements
- **CI Gate**: All tests MUST pass in CI before any merge to main branch

**Rationale**: Comprehensive testing ensures reliability, enables confident refactoring, and prevents regressions.

### III. User Experience Consistency

All user-facing features MUST maintain consistent experience patterns:

- **Error Messages**: All errors MUST follow a standard format with clear, actionable messages
- **Loading States**: All async operations MUST display consistent loading indicators
- **Response Formats**: All API responses MUST follow standardized JSON schemas
- **Input Validation**: All user inputs MUST validate with consistent, helpful error feedback
- **Accessibility**: All UI components MUST meet WCAG 2.1 AA standards
- **Naming Conventions**: Consistent terminology MUST be used across all user-facing text

**Rationale**: Consistency builds user trust, reduces cognitive load, and creates a professional product experience.

### IV. Performance Requirements

All features MUST meet defined performance thresholds:

- **API Response Time**: All endpoints MUST respond within 200ms at p95 under normal load
- **Database Queries**: All queries MUST complete within 50ms; slow queries MUST be logged and optimized
- **Memory Usage**: Services MUST stay within defined memory limits; leaks MUST be addressed immediately
- **Frontend Load Time**: Initial page load MUST complete within 2 seconds on 3G networks
- **Concurrency**: System MUST handle expected concurrent users without degradation (defined per feature)
- **Performance Budget**: All new features MUST include performance impact assessment

**Rationale**: Performance directly impacts user satisfaction, system costs, and scalability.

## Code Quality Standards

**Purpose**: Define specific, measurable quality gates for all code changes.

### Mandatory Checks

- **Static Analysis**: All code MUST pass static analysis (e.g., ESLint, Pylint, clippy) with zero errors
- **Type Checking**: Strict mode MUST be enabled; all types MUST be explicit (no implicit any)
- **Formatting**: Automated formatter (e.g., Prettier, Black, rustfmt) MUST be run before commit
- **Security Scanning**: All dependencies MUST be scanned for vulnerabilities; critical issues MUST be resolved

### Code Review Requirements

- **Review Checklist**: All PRs MUST include completed review checklist
- **Approval**: Minimum one approval from senior engineer required
- **Size Limit**: PRs exceeding 400 lines require justification and may be split
- **Test Evidence**: PRs MUST include test results and coverage reports

### Documentation Standards

- **API Documentation**: All public endpoints MUST have OpenAPI/Swagger documentation
- **Code Comments**: Complex algorithms MUST have explanatory comments
- **README Updates**: Feature changes MUST update relevant documentation
- **Changelog**: All user-facing changes MUST be documented in CHANGELOG.md

## Performance Requirements

**Purpose**: Establish measurable performance standards and monitoring requirements.

### Backend Performance

- **Response Time**: p95 < 200ms for all API endpoints
- **Throughput**: System MUST support minimum 1000 requests/second per instance
- **Database**: Query time < 50ms; connection pool MUST be properly sized
- **Caching**: Frequently accessed data MUST be cached; cache hit rate > 80%

### Frontend Performance

- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3.5 seconds
- **Bundle Size**: JavaScript bundle MUST be < 500KB gzipped
- **Core Web Vitals**: All metrics MUST meet "Good" thresholds

### Monitoring & Alerts

- **APM**: Application Performance Monitoring MUST be enabled in all environments
- **Dashboards**: Performance dashboards MUST be maintained and reviewed weekly
- **Alerts**: Performance degradation > 20% MUST trigger alerts
- **Budget Reviews**: Performance budget MUST be reviewed monthly

## Governance

**Purpose**: Define how this constitution is maintained and enforced.

### Amendment Process

1. **Proposal**: Any team member may propose amendments via PR
2. **Review**: Amendments require review and approval from team leads
3. **Documentation**: All changes MUST include rationale and migration plan if needed
4. **Versioning**: Semantic versioning (MAJOR.MINOR.PATCH) MUST be used:
   - MAJOR: Backward-incompatible changes or principle removals
   - MINOR: New principles or material expansions
   - PATCH: Clarifications and non-semantic refinements

### Compliance Enforcement

- **PR Validation**: All PRs MUST be validated against constitution principles
- **Automated Gates**: CI/CD pipelines MUST enforce testable principles
- **Quarterly Review**: Constitution compliance MUST be reviewed quarterly
- **Violation Tracking**: Violations MUST be logged and addressed within sprint

### Versioning Policy

- Version follows MAJOR.MINOR.PATCH format
- Each amendment MUST update version and LAST_AMENDED_DATE
- Historical versions MUST be preserved in git history

**Version**: 1.0.0 | **Ratified**: 2026-03-05 | **Last Amended**: 2026-03-05
