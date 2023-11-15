import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
const dotenv = require("dotenv");

dotenv.config({
    path: ".env.local"
});
// import { server } from './app/mocks/server'

// // Establish API mocking before all tests.
// beforeAll(() => server.listen())

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers())

// // Clean up after the tests are finished.
// afterAll(() => server.close())