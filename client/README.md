# StudyIntell / Academic.OS

An academic decision intelligence platform that helps engineering students dynamically prioritize their studies, optimize workload distribution, and maintain long-term consistency.

## Prerequisites

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation & Setup

1. **Install dependencies:**
   Open a terminal in the root of the project and run:
   ```bash
   npm install
   ```

2. **Run the application:**
   You do not need to configure any environment variables for this pure frontend version.

## Running the Application

### Development Mode

To run the frontend local development server with hot-reload support:

```bash
npm run dev
```

### Production Build

To test or deploy the production version, first build the single-page application:

```bash
npm run build
```

Then preview the fully compiled production build locally:

```bash
npm run preview
```

## Key Features

- **Dashboard**: High-level overview of active semester, consistency score, and AI smart insights.
- **Planner & Timetable Import**: Navigate to the Dashboard page to upload your University Timetable (TXT/CSV). (Uses mocked processing data in this standalone version).
- **Focus Mode**: Start dedicated timers for your assigned blocks.
- **Resource Analyzer**: Get PYQ (Previous Year Question) recommendations matching your syllabus.
- **Progress Tracking**: See burnout risk and productivity charts based on your consistency.
- **Profile & Preferences**: Adjust settings, toggle Dark/Light mode, and view your academic achievements.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Framer Motion
- **Language:** TypeScript
