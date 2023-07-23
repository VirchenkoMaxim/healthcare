# Healthcare Service

![License](https://img.shields.io/badge/License-MIT-blue.svg)


## Installation Guide

This installation guide provides step-by-step instructions for setting up.

### Prerequisites

Before proceeding with the installation, ensure that you have the following prerequisites:
  
   - Yarn: Version 1.22.0 or higher
   - Git: Installed and configured on your system

### Installation Steps

1. Clone the repository:

   ```shell
   git clone https://github.com/VirchenkoMaxim/healthcare.git

2. Navigate to the project directory:

   ```shell
   cd healthcare

3. Create a `.env` file for environment variables:

   ```shell
   cp .env.example .env

4. Open the `.env` file and configure the necessary environment variables. Make sure to set the appropriate values for your setup.
   <br><br>
5. Run service:
   ```shell
   yarn dev

6. This component exposes swagger documentation: `http://localhost:{API_PORT}/api/docs`