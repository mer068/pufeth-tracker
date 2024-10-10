# pufETH Conversion Rate Tracker

## Overview

pufETH Conversion Rate Tracker is a web application designed to track and display pufETH conversion rate changes over time. The project is composed of three main components:
- A PostgreSQL database for storing conversion rates.
- A Node.js backend for handling data fetching and processing.
- A React frontend for visualizing conversion rates.

## Prerequisites

- Docker and Docker Compose must be installed on your system.

## Running the Project

The project is fully containerized and can be run using Docker. To start the application:

1. Clone the repository.
2. Run the following command to start the services:
   ```bash
   docker-compose up
   
This will start the PostgreSQL database, Node backend, and React frontend.

## Development Profile

By default, the project will run in the dev profile. In this mode:
- The database will be seeded with mock data for the last 3 days.
- The fetching of conversion rates will be mocked.
- This can be changed by switching to production profile.

