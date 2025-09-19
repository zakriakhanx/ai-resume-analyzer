# ResuMatch: AI-Powered Resume Analyzer

ResuMatch is a smart, AI-powered application designed to help job seekers optimize their resumes. It provides detailed feedback, an Applicant Tracking System (ATS) score, and actionable suggestions to improve the chances of landing a dream job. The application is built on the [Puter.com](https://puter.com) platform, leveraging its AI, authentication, and storage capabilities.

![Resume Scan](/public/images/resume-scan-2.gif)

## Features

-   **AI-Powered Feedback:** Get instant, detailed feedback on your resume.
-   **ATS Scoring:** See how your resume scores against typical Applicant Tracking Systems.
-   **Actionable Suggestions:** Receive concrete tips on how to improve your resume's content and formatting.
-   **Job-Specific Analysis:** Tailor your resume for a specific job by providing the job title and description.
-   **Secure Storage:** Your resumes are securely stored in your Puter account.
-   **User-Friendly Interface:** A clean and intuitive interface for a seamless experience.

## Tech Stack

-   **Frontend:** [React](https://react.dev/), [React Router](https://reactrouter.com/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **Platform:** [Puter](https://puter.com/) (for AI, Auth, File Storage, and Key-Value Store)

## How It Works

ResuMatch is built as a "Puter App". It relies on the Puter SDK to interact with the Puter environment.

1.  **Authentication:** Users log in using their Puter account.
2.  **File Upload:** Resumes (in PDF format) are uploaded to the user's Puter filesystem.
3.  **AI Analysis:** The application sends the resume and job details to Puter's AI service for analysis.
4.  **Data Storage:** The analysis results are stored in the user's Puter Key-Value store.
5.  **Display Results:** The application retrieves the analysis and displays it in a user-friendly format, including an ATS score, a summary, and detailed feedback.

## Getting Started

### Prerequisites

-   A [Puter.com](https://puter.com) account.
-   [Node.js](https://nodejs.org/) (version 20 or higher)
-   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/ai-resume-analyzer.git
    cd ai-resume-analyzer
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`. To use the application, you will need to be logged into your Puter account in your browser.

## Project Structure

```
/
├── app/
│   ├── components/   # Reusable React components
│   ├── lib/          # Helper functions and utilities
│   ├── routes/       # Route components for different pages
│   ├── root.tsx      # The root layout of the application
│   └── app.css       # Global styles
├── public/           # Static assets (images, icons, etc.)
├── constants/        # Constant values used in the application
├── package.json      # Project dependencies and scripts
└── vite.config.ts    # Vite configuration
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t resumatch .

# Run the container
docker run -p 3000:3000 resumatch
```

The containerized application can be deployed to any platform that supports Docker.

### DIY Deployment

The built-in app server is production-ready. Make sure to deploy the output of `npm run build`:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
