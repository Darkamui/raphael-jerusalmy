# ----- STEP 1: Build stage -----
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Install deps
    COPY package.json package-lock.json ./
    RUN npm install
    
    # Copy all files
    COPY . .
    
    # Build the Next.js app
    RUN npm run build
    
    # ----- STEP 2: Production image -----
    FROM node:18-alpine AS runner
    WORKDIR /app
    
    # Install only production deps
    COPY package.json package-lock.json ./
    RUN npm install --omit=dev
    
    # Copy built app
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.ts ./next.config.ts
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/node_modules ./node_modules
    
    
    EXPOSE 3002
    CMD ["npm", "start"]
    