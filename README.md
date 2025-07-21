# Playwright Runner

A nextjs project with bun to run playwright test commands from the browser and visualize the commands in the embedded browser.

## Getting Started

### 📋 Requirements
- Node.js (version 16 or higher)
- Package manager: bun, npm, or yarn
- Docker (version 20.10 or higher)

### Quick Start
**Note: Docker must be running for the quick start to work.**

```bash
git clone https://github.com/suyash5053/playwright-browser-runner.git && cd playwright-browser-runner && docker compose up --build
```

### Installation

Installation will take time for the first time as two docker images are built and the next time it will be faster. **Note: Docker must be running for the installation to work.**

### 🚀 Docker Installation (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/suyash5053/playwright-browser-runner.git
```

2. Navigate to the project directory:
```bash
cd playwright-browser-runner
```

3. Build the Docker image:
```bash
docker-compose up --build
```

4. Open http://localhost:3000 in your browser to see the application.

### 🛠️ Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/suyash5053/playwright-browser-runner.git
```

2. Navigate to the project directory:
```bash
cd playwright-browser-runner
```

3. Install dependencies:
```bash
bun install
```

4. Start the development server:
```bash
bun run dev
```

NOTE: You might face an error called as there is no docker network found. To fix this run the following command and run the 4th step again.
```bash
docker network create app-network-global
```


5. Open http://localhost:3000 in your browser to see the application.


## 📚 Usage

1. Open http://localhost:3000 in your browser to see the application.

2. Enter the site url in the input field and click on the `Open Browser` button or `Close Ports` button if prompted and then click on the `Open Browser` button.

3. Wait for the embedded browser to open the page.

4. Enter the playwright test command in the input field and click on the `Execute Command or Ctrl+Enter or Cmd+Enter` to run the test.

5. Visualize the command execution in the embedded browser.

6. Command will be saved in the history.


## Future Improvements

- Creating a production version of the app.
- Adding better UI for the embedded browser.
- Adding a way to show logs as well as errors in the UI.
- Adding a click event to run the command from the history.
- Adding a way to save the history to a file.
- Better error handling and diagnostics.

## 🤝 Contributing

- Fork the repository
- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
## 🐛 Issues
If you encounter any issues, please report them on the GitHub Issues page.
## ⭐ Support
If you find this project helpful, please consider giving it a star on GitHub!
