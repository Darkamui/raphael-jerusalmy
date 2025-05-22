# Raphaël Jerusalmy – Official Website

Welcome to the source code for the official website of author **Raphaël Jerusalmy**.

---

## Table of Contents

- [Raphaël Jerusalmy – Official Website](#raphaël-jerusalmy--official-website)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
  - [Available Scripts](#available-scripts)
  - [Docker](#docker)
  - [Deployment](#deployment)
  - [Future Implementation](#future-implementation)
    - [Environment Variables](#environment-variables)
    - [Database Setup](#database-setup)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- Server-side rendering (SSR) & static site generation (SSG)
- Bilingual support (English & French)
- Containerized development & production (Docker)
- Linting with ESLint
- Continuous Integration with GitHub Actions

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router + React 18)
- [TypeScript](https://www.typescriptlang.org/)
- [i18n](https://next-intl-docs.vercel.app/) for localized content
- [ESLint](https://eslint.org/)
- [Docker](https://docker.com)

## Getting Started

### Prerequisites

- Node.js v18+
- npm, Yarn, or pnpm
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Darkamui/raphael-jerusalmy.git
   cd raphael-jerusalmy
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
- `docker build -t raphael-jerusalmy .` – Build Docker image
- `docker run -p 3000:3000 raphael-jerusalmy` – Run Docker container

## Docker

Build and run the container:

```bash
docker build -t raphael-jerusalmy .
docker run -p 3000:3000 raphael-jerusalmy
```

## Deployment

This project leverages **GitHub Actions** for CI/CD, enabling automatic build, test, and deployment of the Dockerized application directly to a private VPS via SSH.

1. **Configure SSH Access**

   - In your GitHub repository settings, add your VPS details as encrypted Secrets:

     - `VPS_HOST`
     - `VPS_USER`
     - `VPS_SSH_KEY` (your private SSH key)

2. **Workflow Setup**

   - A sample workflow file is included at `.github/workflows/deploy.yml` to:

     - Build the Docker image
     - (Optional) Push to a Docker registry
     - SSH into your VPS and update the running container

3. **Automatic Deploy**

   - On each push to the `main` branch, GitHub Actions will trigger the workflow and deploy the latest version to your private server.

## Future Implementation

> _Note: All content is currently stored locally within the app. Database integration and .env configuration below are for reference if you choose to enable them later._

### Environment Variables

Create a `.env.local` file at the project root and add any secret keys or connection strings:

```pg
# Example for PostgreSQL (if implemented)
DATABASE_URL=postgresql://username:password@localhost:5432/raphael_jerusalmy
# NEXT_PUBLIC_API_KEY=your_public_key_here
```

### Database Setup

If you opt to integrate a database, here’s a brief outline:

1. **Define your schema** using [Drizzle ORM](https://orm.drizzle.team/).
2. **Generate migrations**:

   ```bash
   npx drizzle-kit generate --out ./drizzle
   ```

3. **Apply migrations**:

   ```bash
   npx drizzle-kit push
   ```

4. **Connect** via the `DATABASE_URL` environment variable.

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: describe your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License**.
See [LICENSE](https://opensource.org/license/mit) for details.
