# DoseSpot Integration Demo

Simple demonstration of integrating with the DoseSpot e-Prescribing platform. It showcases how to programmatically create clinicians via the DoseSpot API and perform Single Sign-On (SSO) to launch the DoseSpot UI.

## Features

- **Clinician Management**: Add new clinicians to your DoseSpot clinic using the Web API v2.
- **Single Sign-On (SSO)**: Securely authenticate and redirect users to the DoseSpot portal.
- **Fastify Backend**: A lightweight and efficient Node.js server.
- **Simple UI**: Clean HTML interfaces for testing the integration flow.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- DoseSpot Staging Credentials:
  - `Base URL`
  - `Clinic ID`
  - `Clinic Key`
  - `Subscription Key`

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dosespot-integration-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and fill in your DoseSpot credentials:

```env
DOSESPOT_BASE_URL=https://my.staging.dosespot.com
DOSESPOT_CLINIC_ID=your_clinic_id
DOSESPOT_CLINIC_KEY=your_clinic_key
DOSESPOT_SUBSCRIPTION_KEY=your_subscription_key
DOSESPOT_ADMIN_USER_ID=your_default_user_id
```

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `server.js`: The main entry point and API route definitions.
- `utils/`: Core integration logic.
  - `auth.js`: Handles OAuth2 token retrieval for the DoseSpot API.
  - `clinician.js`: Contains the logic for creating clinicians via API.
  - `sso.js`: Implements the DoseSpot SSO algorithm for secure login.
- `views/`: HTML templates for the demo frontend.

## Integration Details

### Clinician Creation

The demo uses the `POST /webapi/v2/api/clinicians` endpoint. It demonstrates passing required fields such as NPI number and personal details.

### SSO Flow

The SSO implementation follows DoseSpot's security requirements, generating a unique phrase and hashing it with the Clinic Key to create a `SingleSignOnCode` and `SingleSignOnUserIdVerify`.
