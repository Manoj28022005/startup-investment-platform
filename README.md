
# Startup Investment Platform

A comprehensive platform for startups to create profiles, pitch to investors, and for investors to discover promising ventures. Built with Angular and JSON Forms for dynamic form generation and validation.

## Features

- **Multi-step Form Process**: Guided workflow for startups to complete their profiles
- **Comprehensive Validation**: Strict validation for all input fields ensuring data quality
- **Dynamic Form Generation**: Using JSON Forms for flexible and maintainable form structures
- **Responsive Design**: Mobile-friendly interface built with Angular Material

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manoj28022005/startup-investment-platform.git
   cd startup-investment-platform
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser

## Project Structure

- `src/app/schemas/`: Contains JSON schemas and UI schemas for form validation
  - `pitch-information.schema.ts`: Schema for startup pitch details
  - `team-information.schema.ts`: Schema for team composition details
  - `*.uischema.ts`: UI layout definitions for the forms

- `src/app/components/`: Angular components for different sections
  - `founder-details/`: Founder information form
  - `funding-requirements/`: Funding requirements form
  - `pitch-information/`: Startup pitch details form
  - `team-information/`: Team composition form
  - `team-talent/`: Team members and skills form

- `src/assets/`: JSON schema files for additional forms
  - `founder-details.schema.json`: Schema for founder details
  - `funding-requirements.schema.json`: Schema for funding requirements

## Form Validation

The platform implements comprehensive validation for all input fields:

### LinkedIn Profiles
- Personal profiles must follow format: `https://linkedin.com/in/username`
- Company profiles must follow format: `https://linkedin.com/company/companyname`

### Monetary Values
- Must use proper USD format with dollar sign and commas: `$1,000,000`

### Names
- Must use proper capitalization: First letter capitalized for each name
- Format: `First Last`

### Email Addresses
- Standard email validation with proper domain structure

### Date Fields
- Must follow YYYY-MM-DD format

### Arrays and Collections
- Minimum and maximum items enforcement
- Uniqueness validation to prevent duplicates

## JSON Schema Structure

The application uses JSON Schema for validation and structure definition. Example structure:

```json
{
  "type": "object",
  "properties": {
    "startupName": {
      "type": "string",
      "minLength": 3,
      "maxLength": 100,
      "pattern": "^[A-Za-z0-9][A-Za-z0-9 .-]*[A-Za-z0-9]$",
      "title": "Startup Name",
      "description": "Legal name of your startup",
      "errorMessage": {
        "pattern": "Name must start and end with alphanumeric characters",
        "minLength": "Name must be at least 3 characters long",
        "maxLength": "Name cannot exceed 100 characters"
      }
    }
  }
}
```

## UI Schema Structure

UI Schemas control the layout and appearance of form elements:

```typescript
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Group",
      "label": "Basic Information",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/startupName"
        }
      ]
    }
  ]
}
```

## Assumptions

1. **User Authentication**: The platform assumes a separate authentication system is in place (API calls to `/api/founders` and `/api/investors` endpoints)
2. **Data Storage**: Form data is expected to be stored via API endpoints not included in this repository
3. **Validation Requirements**: Strict validation is implemented based on industry standards for investment platforms
4. **Browser Compatibility**: The application is designed for modern browsers with ES6+ support

## Build for Production

```bash
npm run build --configuration production
```

Build artifacts will be stored in the `dist/` directory.


## Acknowledgments

- Built with [Angular](https://angular.io/)
- Forms powered by [JSON Forms](https://jsonforms.io/)
- UI components from [Angular Material](https://material.angular.io/)
=======
# startup-investment-platform

