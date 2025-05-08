# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /apps/raphael-jerusalmy


################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

# Download dependencies AS a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --force

################################################################################
# Create a stage for building the application.
FROM deps AS build

# Download additional development dependencies before building, AS some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# ENV Variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS final

# Use production node environment by default.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy files from public folder
COPY --from=build /apps/raphael-jerusalmy/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# If Next config output is 'standalone'
COPY --from=build --chown=nextjs:nodejs /apps/raphael-jerusalmy/.next/standalone ./

COPY --from=build --chown=nextjs:nodejs /apps/raphael-jerusalmy/.next/static ./.next/static

USER nextjs


# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /apps/raphael-jerusalmy/node_modules ./node_modules
# COPY --from=build /apps/raphael-jerusalmy/app ./raphael-jerusalmy


# Expose the port that the application listens on.
EXPOSE 3002

# Run the application.
CMD ["npm", "start"]