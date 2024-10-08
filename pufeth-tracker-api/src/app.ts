// Import required modules
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

// Configure environment variables
dotenv.config();

// Create an Express application
const app = express();

// Define a port for the server to listen on, with a type for process.env.PORT
const PORT: string | undefined = process.env.PORT;

// Basic route handler for the home page
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello, World!'); // Placeholder message for the root route
});

// Check if PORT is defined and start the server
if (PORT) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.error('Error: PORT is not defined in the environment variables');
  process.exit(1); // Exit if PORT is not defined
}
