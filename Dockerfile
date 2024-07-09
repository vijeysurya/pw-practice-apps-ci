FROM mcr.microsoft.com/playwright:v1.45.1-jammy

RUN mkdir -p /appyyy
WORKDIR /appyyy
COPY . /appyyy

RUN npm install --legacy-peer-deps
RUN npx playwright install
