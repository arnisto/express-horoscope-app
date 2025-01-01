# HoroscopeCode

## Overview

A Node.js Express application that determines zodiac signs based on birthdates and generates horoscopes using the horoscope library.

## Features

- RESTful API endpoint for zodiac sign determination
- Horoscope generation using the `horoscope` npm package
- Docker support for containerized deployment
- Secure input validation and error handling
- Comprehensive test suite
- Automated builds via GitHub Actions

## Prerequisites

- Node.js (v16 or higher)
- Docker
- Git

## Installation

git clone https://github.com/your-username/horoscope-code.git
cd horoscope-code
npm install

## Usage

### Local Development

npm run start

Access the API at: `http://localhost:3000/api/v1/horoscope?birthdate=YYYY-MM-DD`

### Docker

Build and run the container:

docker build -t horoscope-code .
docker run -p 3000:3000 horoscope-code

## API Endpoints

### GET /horoscope

Parameters:

- `birthdate`: Date in YYYY-MM-DD format

Response:

{
"zodiacSign": "Leo",
"horoscope": "Today is your lucky day..."
}

## Testing

Run the test suite:

npm test

## Docker Support

The application includes a Dockerfile for containerization:

FROM node:16-alpine
WORKDIR /app
COPY package\*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

## GitHub Actions

The repository includes automated CI/CD workflows:

- Runs tests on pull requests
- Builds and pushes Docker image on main branch commits
- Security scanning of dependencies

## Security Features

- Input validation and sanitization
- Rate limiting
- Helmet.js for HTTP headers
- Dependencies security scanning

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details
