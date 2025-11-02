# MSP Guardian

MSP Guardian is an AI-powered cybersecurity command center designed specifically for Managed Service Providers (MSPs). It provides a unified dashboard to proactively monitor, manage, and respond to security threats across all client environments. The platform leverages generative AI to deliver predictive insights, automate incident response, and streamline security operations, enabling MSPs to work smarter and keep their clients secure.

## Core Features

-   **Dashboard Overview**: Get a real-time, at-a-glance view of key security metrics, active threats, compliance status, and AI-powered insights across all managed clients.
-   **Real-Time Threat Detection**: A live, filterable feed of detected threats, detailing the client, threat type, severity, source, and current status.
-   **AI-Powered Insights**: Leverage generative AI to discover hidden patterns, predict potential attacks, and receive proactive recommendations to address vulnerabilities before they are exploited.
-   **Client Risk Scoring**: Automatically calculate and visualize a risk score for each client based on a variety of security factors, enabling technicians to prioritize their efforts.
-   **Automated Threat Response**: Define and execute automated playbooks to respond to threats. Features AI-powered triage to categorize alerts and create tickets in integrated PSA/RMM platforms like SuperOps.
-   **Compliance Monitoring**: Track client compliance against major industry frameworks like HIPAA, SOX, GDPR, and PCI-DSS, with clear visualizations and event logging.
-   **Centralized Client Management**: A comprehensive table view of all managed clients with sortable columns for risk score, active threats, compliance, and asset count.

## Architecture & Tech Stack

MSP Guardian is built with a modern, high-performance tech stack designed for scalability and a rich user experience.

-   **Frontend**:
    -   **Framework**: Next.js (with App Router)
    -   **Language**: TypeScript
    -   **UI**: React, ShadCN UI Components
    -   **Styling**: Tailwind CSS
-   **Generative AI**:
    -   **Toolkit**: Google's Genkit is used for creating and managing AI flows.
    -   **Models**: Leverages Google's Gemini models for complex reasoning, summarization, and predictive insights.
-   **Backend & Hosting**:
    -   The application is designed to be deployed on **Firebase App Hosting**.
    -   Serverless functions for AI and backend logic are managed via Genkit flows.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or a compatible package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd msp-guardian
    ```

2.  **Install dependencies:**
    All necessary packages are listed in `package.json`.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add any necessary environment variables (e.g., Firebase configuration keys, API keys for Genkit).
    ```
    # See .env.example or documentation for required variables
    ```

### Running the Application

1.  **Start the development server:**
    This command starts the Next.js application in development mode.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Start the Genkit development server (for AI flows):**
    In a separate terminal, run this command to start the Genkit development server, which allows you to test and debug your AI flows.
    ```bash
    npm run genkit:watch
    ```
    The Genkit inspection UI will be available at `http://localhost:4000`.
