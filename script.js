// Parse the repo URL to extract useful hints
function parseRepoUrl(url) {
    const urlLower = url.toLowerCase();
    const parts = url.split('/');
    const repoName = parts[parts.length - 1] || '';
    const owner = parts[parts.length - 2] || '';
    
    return {
        repoName: repoName,
        owner: owner,
        fullUrl: urlLower,
        // Extract keywords from URL
        hasTodo: urlLower.match(/todo|task|checklist/),
        hasNotes: urlLower.match(/note|markdown|editor/),
        hasApi: urlLower.match(/api|rest|graphql|backend|server/),
        hasGame: urlLower.match(/game|play|puzzle/),
        hasChat: urlLower.match(/chat|message|social/),
        hasBlog: urlLower.match(/blog|cms|content/),
        hasDocker: urlLower.match(/docker|container|compose|kubernetes|k8s/),
        hasCli: urlLower.match(/cli|command|terminal|tool/),
        hasBot: urlLower.match(/bot|automation|scraper/),
        hasDashboard: urlLower.match(/dashboard|analytics|chart|viz/),
        hasAuth: urlLower.match(/auth|login|jwt|oauth/),
        hasDb: urlLower.match(/database|db|sql|mongo|postgres|mysql/),
        hasTest: urlLower.match(/test|testing|jest|pytest/),
        hasStarter: urlLower.match(/starter|template|boilerplate|example/),
        hasFullstack: urlLower.match(/fullstack|full-stack|mern|mean/),
    };
}

// Detect project type from URL and description
function detectProjectType(url, description) {
    const urlHints = parseRepoUrl(url);
    const descLower = description.toLowerCase();
    
    // Check URL first, then description
    if (urlHints.hasTodo || descLower.match(/todo|task|checklist/)) return 'todo';
    if (urlHints.hasNotes || descLower.match(/note|markdown|editor|writing/)) return 'notes';
    if (urlHints.hasApi || descLower.match(/api|rest|graphql|endpoint|server|backend/)) return 'api';
    if (urlHints.hasGame || descLower.match(/game|play|puzzle|arcade/)) return 'game';
    if (urlHints.hasChat || descLower.match(/chat|message|social|forum/)) return 'social';
    if (urlHints.hasBlog || descLower.match(/blog|cms|content/)) return 'blog';
    if (urlHints.hasDashboard || descLower.match(/dashboard|analytics|chart|graph|visualization/)) return 'dashboard';
    if (urlHints.hasCli || descLower.match(/cli|command|terminal|tool/)) return 'cli';
    if (urlHints.hasBot || descLower.match(/bot|automation|script|scraper/)) return 'bot';
    if (urlHints.hasStarter) return 'starter';
    if (descLower.match(/library|package|framework|sdk/)) return 'library';
    if (descLower.match(/mobile|app|ios|android/)) return 'mobile';
    return 'general';
}

// Main function that analyzes the repository
function generateAnalysis(input) {
    const { url, language, description } = input;
    
    // Parse URL for hints
    const urlHints = parseRepoUrl(url);
    const repoName = urlHints.repoName || 'this project';
    
    // Detect project type using both URL and description
    const projectType = detectProjectType(url, description);
    
    // Initialize result arrays
    const summary = [];
    const tasks = [];
    const readmeTips = [];
    const architecture = [];
    const learningPath = [];
    const extensions = [];
    
    // Build all sections
    buildSummary(summary, language, projectType, repoName, description, urlHints);
    buildCategorizedTasks(tasks, language, projectType, urlHints);
    buildDetailedReadmeTips(readmeTips, language, projectType, urlHints);
    buildArchitectureInsight(architecture, language, projectType, urlHints);
    buildLearningPath(learningPath, language, projectType, urlHints);
    buildPotentialExtensions(extensions, language, projectType, urlHints);
    
    return { summary, tasks, readmeTips, architecture, learningPath, extensions };
}

// Build the project summary with elevator pitch
function buildSummary(summary, language, projectType, repoName, description, urlHints) {
    // Create elevator pitch
    let pitch = '';
    if (description && description.trim()) {
        pitch = `"${repoName}" is a ${language} project that ${description.trim().toLowerCase()}`;
    } else {
        // Infer from URL and project type
        pitch = `"${repoName}" is a ${language}`;
        if (projectType === 'todo') {
            pitch += ' todo list application for managing tasks and tracking completion';
        } else if (projectType === 'notes') {
            pitch += ' note-taking app for organizing thoughts and documents';
        } else if (projectType === 'api') {
            pitch += ' backend API providing RESTful endpoints and data services';
        } else if (projectType === 'game') {
            pitch += ' game with interactive gameplay and user controls';
        } else if (projectType === 'cli') {
            pitch += ' command-line tool for developers';
        } else if (projectType === 'dashboard') {
            pitch += ' dashboard for visualizing data and metrics';
        } else if (projectType === 'social' || projectType === 'chat') {
            pitch += ' social platform for communication and interaction';
        } else if (projectType === 'bot') {
            pitch += ' bot for automation and task execution';
        } else if (projectType === 'starter') {
            pitch += ' starter template or boilerplate for quick project setup';
        } else {
            pitch += ' project';
        }
    }
    
    // Add context about what makes it interesting
    if (projectType === 'todo') {
        pitch += '. Perfect for learning CRUD operations, state management, and filtering logic!';
    } else if (projectType === 'api') {
        pitch += '. Great for understanding backend architecture, routing, and data handling!';
    } else if (projectType === 'game') {
        pitch += '. Excellent for exploring game loops, rendering, and input handling!';
    } else if (projectType === 'dashboard') {
        pitch += '. Ideal for learning data visualization and real-time updates!';
    } else if (projectType === 'cli') {
        pitch += '. Great way to learn command parsing and building developer tools!';
    } else if (projectType === 'starter') {
        pitch += '. Useful template to understand project structure and best practices!';
    } else {
        pitch += '. A solid project to expand your coding skills!';
    }
    
    summary.push(pitch);
    
    // Add Docker/containerization info if detected
    if (urlHints.hasDocker) {
        summary.push('This project uses Docker for containerization. You\'ll find Dockerfile and possibly docker-compose.yml for orchestrating services.');
    }
    
    // Add auth info if detected
    if (urlHints.hasAuth) {
        summary.push('Authentication is a key feature here. Look for JWT tokens, session management, or OAuth integration.');
    }
    
    // Add database info if detected
    if (urlHints.hasDb) {
        summary.push('Database integration is central to this project. Check for schema definitions, migrations, and ORM usage.');
    }
    
    // Language-specific ecosystem info
    if (language === 'Python') {
        summary.push('Python projects use virtual environments (venv/virtualenv) to isolate dependencies. Package management via pip, poetry, or conda.');
        if (projectType === 'api') {
            summary.push('Likely uses Flask (lightweight), FastAPI (modern), or Django (full-featured) as the web framework.');
        } else if (projectType === 'cli') {
            summary.push('CLI tools often use Click or argparse for command parsing. Check setup.py or pyproject.toml for entry points.');
        }
    } else if (language === 'JavaScript') {
        summary.push('JavaScript projects rely on npm or yarn. The package.json file maps out scripts, dependencies, and project metadata.');
        if (projectType === 'api') {
            summary.push('Node.js APIs commonly use Express (minimal), Fastify (fast), or NestJS (structured with TypeScript).');
        } else if (urlHints.hasFullstack || projectType === 'dashboard' || projectType === 'todo') {
            summary.push('Frontend likely uses React, Vue, or Svelte with a bundler like Vite, Webpack, or Parcel.');
        }
    } else if (language === 'Java') {
        summary.push('Java projects use Maven (pom.xml) or Gradle (build.gradle). Source code lives in src/main/java/.');
        if (projectType === 'api') {
            summary.push('Spring Boot is the standard for Java APIs. Look for @RestController, @Service, and application.properties.');
        }
    } else if (language === 'C' || language === 'C++') {
        summary.push('C/C++ requires compilation. Look for Makefile, CMakeLists.txt, or build scripts defining the build process.');
    }
}


// Build categorized tasks with URL-aware specifics
function buildCategorizedTasks(tasks, language, projectType, urlHints) {
    // === SETUP TASKS ===
    tasks.push('[Setup] Clone the repository: git clone <repo-url>');
    
    if (urlHints.hasDocker) {
        tasks.push('[Setup] Install Docker and Docker Compose if not already installed');
        tasks.push('[Setup] Run docker-compose up to start all services (database, backend, etc.)');
        tasks.push('[Setup] Check docker-compose.yml to understand service dependencies');
    } else if (language === 'Python') {
        tasks.push('[Setup] Create virtual environment: python -m venv venv');
        tasks.push('[Setup] Activate: source venv/bin/activate (Mac/Linux) or venv\\Scripts\\activate (Windows)');
        tasks.push('[Setup] Install dependencies: pip install -r requirements.txt');
    } else if (language === 'JavaScript') {
        tasks.push('[Setup] Install dependencies: npm install (or yarn install)');
        tasks.push('[Setup] Check package.json for scripts: "dev", "start", "build", "test"');
    } else if (language === 'Java') {
        tasks.push('[Setup] Ensure correct JDK version is installed (check README)');
        tasks.push('[Setup] Build: mvn clean install (Maven) or gradle build (Gradle)');
    } else if (language === 'C' || language === 'C++') {
        tasks.push('[Setup] Install required libraries and compilers (see README/INSTALL)');
        tasks.push('[Setup] Compile: make (or cmake . && make)');
    }
    
    if (urlHints.hasDb && !urlHints.hasDocker) {
        tasks.push('[Setup] Set up the database (PostgreSQL, MySQL, MongoDB, etc.) locally');
        tasks.push('[Setup] Run migrations to create tables/collections');
    }
    
    if (urlHints.hasAuth) {
        tasks.push('[Setup] Create a .env file with auth secrets (JWT_SECRET, API_KEY, etc.)');
    }
    
    tasks.push('[Setup] Start the application and verify it runs without errors');
    
    // === EXPLORATION TASKS ===
    tasks.push('[Explore] Find the main entry point (main.py, index.js, Main.java, main.c)');
    
    if (projectType === 'todo') {
        tasks.push('[Explore] Test creating, editing, completing, and deleting tasks');
        tasks.push('[Explore] Find where task state is managed (Redux, Context, Vuex, etc.)');
        tasks.push('[Explore] Look for filtering logic (all, active, completed tasks)');
    } else if (projectType === 'api') {
        tasks.push('[Explore] Map out all API endpoints (GET, POST, PUT, DELETE routes)');
        tasks.push('[Explore] Trace one request from route → controller → service → database');
        tasks.push('[Explore] Test endpoints with curl, Postman, or Insomnia');
    } else if (projectType === 'game') {
        tasks.push('[Explore] Play the game and note all features and mechanics');
        tasks.push('[Explore] Find the game loop (update/render cycle)');
        tasks.push('[Explore] Identify input handling (keyboard, mouse, touch)');
    } else if (projectType === 'dashboard') {
        tasks.push('[Explore] See how data is fetched (API calls, WebSockets, static)');
        tasks.push('[Explore] Check charting libraries (Chart.js, D3, Recharts)');
    } else if (projectType === 'cli') {
        tasks.push('[Explore] Run the CLI with --help to see all commands');
        tasks.push('[Explore] Trace how arguments are parsed and validated');
    } else if (projectType === 'notes') {
        tasks.push('[Explore] Create and edit notes to understand the data flow');
        tasks.push('[Explore] Check if markdown rendering or rich text is supported');
    }
    
    if (urlHints.hasDocker) {
        tasks.push('[Explore] Inspect Dockerfile to see how the image is built');
        tasks.push('[Explore] Check environment variables in docker-compose.yml');
    }
    
    tasks.push('[Explore] Run tests if available: npm test, pytest, mvn test, make test');
    
    // === CONTRIBUTION TASKS ===
    tasks.push('[Contribute] Read CONTRIBUTING.md or contribution guidelines');
    tasks.push('[Contribute] Look for "good first issue" labels on GitHub Issues');
    tasks.push('[Contribute] Review recent pull requests to see contribution patterns');
    
    if (projectType === 'todo') {
        tasks.push('[Contribute] Add a new filter option (e.g., "due today", "priority")');
        tasks.push('[Contribute] Improve UI/UX with better styling or animations');
    } else if (projectType === 'api') {
        tasks.push('[Contribute] Add tests for endpoints lacking coverage');
        tasks.push('[Contribute] Improve error handling and validation');
    } else if (projectType === 'game') {
        tasks.push('[Contribute] Add a new level, character, or power-up');
        tasks.push('[Contribute] Fix bugs or improve game balance');
    } else if (projectType === 'cli') {
        tasks.push('[Contribute] Add a new command or flag');
        tasks.push('[Contribute] Improve help text and error messages');
    }
    
    tasks.push('[Contribute] Write or improve documentation for unclear parts');
}


// Build detailed README tips
function buildDetailedReadmeTips(readmeTips, language, projectType, urlHints) {
    readmeTips.push('Add a "What is this?" section with a one-sentence description and key features list.');
    readmeTips.push('Include a "Tech Stack" section listing language, frameworks, libraries, and tools.');
    
    if (urlHints.hasDocker) {
        readmeTips.push('Document Docker setup: how to build images, run containers, and use docker-compose.');
        readmeTips.push('Explain environment variables needed in .env file for Docker services.');
    }
    
    if (language === 'Python') {
        readmeTips.push('Specify Python version: "Requires Python 3.8+" with installation link.');
        readmeTips.push('Show venv setup, activation, and pip install steps clearly.');
    } else if (language === 'JavaScript') {
        readmeTips.push('State Node.js version: "Node 16+ required" and npm/yarn preference.');
        readmeTips.push('List all npm scripts with descriptions: "npm run dev - Start dev server".');
    } else if (language === 'Java') {
        readmeTips.push('Document JDK version and build tool: "JDK 11+, Maven 3.6+".');
    } else if (language === 'C' || language === 'C++') {
        readmeTips.push('List dependencies and installation for Linux, macOS, Windows.');
    }
    
    if (projectType === 'api') {
        readmeTips.push('Add "API Endpoints" table: Method, Path, Description, Example Request/Response.');
        readmeTips.push('Document environment variables in a table with descriptions and examples.');
    } else if (projectType === 'game') {
        readmeTips.push('Add gameplay screenshots or GIFs to attract contributors.');
        readmeTips.push('Document controls: "Arrow keys move, Space jumps, P pauses".');
    } else if (projectType === 'todo' || projectType === 'dashboard') {
        readmeTips.push('Include UI screenshots showing different states and features.');
    } else if (projectType === 'cli') {
        readmeTips.push('Show example commands with real use cases and output.');
    }
    
    readmeTips.push('Add "Architecture Overview" explaining how components interact.');
    readmeTips.push('Include "How to Run Tests" with commands and coverage info.');
    readmeTips.push('Create "Contributing" section: bug reports, feature requests, PR process.');
    readmeTips.push('Add badges for build status, coverage, license, version (shields.io).');
}


// Build architecture insight
function buildArchitectureInsight(architecture, language, projectType, urlHints) {
    if (urlHints.hasDocker) {
        architecture.push('Containerized architecture using Docker for consistent dev/prod environments.');
        if (urlHints.hasDb) {
            architecture.push('Multi-container setup: application container + database container orchestrated via docker-compose.');
        }
    }
    
    if (projectType === 'api') {
        if (language === 'JavaScript') {
            architecture.push('Node.js backend with Express/Fastify handling HTTP requests and routing.');
        } else if (language === 'Python') {
            architecture.push('Python backend using Flask/FastAPI with RESTful endpoint structure.');
        } else if (language === 'Java') {
            architecture.push('Spring Boot application with layered architecture: Controller → Service → Repository.');
        }
        
        if (urlHints.hasDb) {
            architecture.push('Database layer with ORM/ODM for data persistence and query abstraction.');
        }
        
        if (urlHints.hasAuth) {
            architecture.push('Authentication middleware protecting routes with JWT tokens or session management.');
        }
    } else if (projectType === 'todo' || projectType === 'dashboard') {
        if (language === 'JavaScript') {
            architecture.push('Frontend built with React/Vue/Svelte using component-based architecture.');
            architecture.push('State management via Redux, Context API, or Vuex for global app state.');
        }
        architecture.push('Client-side routing for navigation between views without page reloads.');
        if (urlHints.hasApi || urlHints.hasDb) {
            architecture.push('Backend API integration for data persistence and synchronization.');
        } else {
            architecture.push('Local storage or in-memory state for data persistence.');
        }
    } else if (projectType === 'game') {
        architecture.push('Game loop architecture: input → update → render cycle running at 60 FPS.');
        architecture.push('Entity-component system or object-oriented design for game objects.');
        architecture.push('Collision detection and physics calculations in the update phase.');
    } else if (projectType === 'cli') {
        architecture.push('Command-line interface with argument parser and command dispatcher.');
        architecture.push('Modular command structure where each command is a separate function/class.');
    } else if (urlHints.hasFullstack) {
        architecture.push('Full-stack architecture: frontend (React/Vue) + backend (Node/Python) + database.');
        architecture.push('RESTful API connecting frontend and backend with JSON data exchange.');
    } else {
        architecture.push('Modular code structure with separation of concerns (UI, logic, data).');
        architecture.push('Entry point bootstraps the application and initializes core components.');
    }
    
    if (urlHints.hasTest) {
        architecture.push('Test suite with unit tests, integration tests, and possibly E2E tests.');
    }
}

// Build learning path
function buildLearningPath(learningPath, language, projectType, urlHints) {
    learningPath.push('Step 1: Read the README thoroughly and understand the project goals and features.');
    learningPath.push('Step 2: Set up the development environment following installation instructions.');
    
    if (urlHints.hasDocker) {
        learningPath.push('Step 3: Study docker-compose.yml to understand service dependencies and ports.');
        learningPath.push('Step 4: Run docker-compose up and observe logs to see startup sequence.');
    } else {
        learningPath.push('Step 3: Install dependencies and run the application locally.');
        learningPath.push('Step 4: Interact with the app to understand user-facing features.');
    }
    
    if (projectType === 'api') {
        learningPath.push('Step 5: Map out all API endpoints and test them with curl or Postman.');
        learningPath.push('Step 6: Trace one endpoint from route definition to database query.');
    } else if (projectType === 'todo' || projectType === 'dashboard') {
        learningPath.push('Step 5: Explore the component tree and understand how data flows.');
        learningPath.push('Step 6: Make a small UI change (color, text) to see the hot-reload in action.');
    } else if (projectType === 'game') {
        learningPath.push('Step 5: Play the game and identify all mechanics and features.');
        learningPath.push('Step 6: Find the game loop and add a console.log to see update frequency.');
    } else if (projectType === 'cli') {
        learningPath.push('Step 5: Run the CLI with different commands and flags to see behavior.');
        learningPath.push('Step 6: Trace how a command is parsed and executed in the code.');
    } else {
        learningPath.push('Step 5: Identify the main entry point and trace code execution.');
        learningPath.push('Step 6: Make a small change and rebuild to understand the workflow.');
    }
    
    learningPath.push('Step 7: Run the test suite and read test cases to understand expected behavior.');
    learningPath.push('Step 8: Pick a "good first issue" and try implementing a fix or feature.');
}

// Build potential extensions
function buildPotentialExtensions(extensions, language, projectType, urlHints) {
    if (projectType === 'todo') {
        extensions.push('Add priority levels (high, medium, low) with color coding.');
        extensions.push('Implement due dates and reminders for tasks.');
        extensions.push('Add categories or tags for organizing tasks.');
        extensions.push('Create a search/filter feature to find tasks quickly.');
        extensions.push('Add dark mode toggle for better user experience.');
        extensions.push('Implement drag-and-drop reordering of tasks.');
    } else if (projectType === 'api') {
        extensions.push('Add pagination for list endpoints to handle large datasets.');
        extensions.push('Implement rate limiting to prevent API abuse.');
        extensions.push('Add API versioning (v1, v2) for backward compatibility.');
        extensions.push('Create comprehensive API documentation with Swagger/OpenAPI.');
        extensions.push('Add caching layer (Redis) for frequently accessed data.');
        extensions.push('Implement webhooks for real-time event notifications.');
    } else if (projectType === 'game') {
        extensions.push('Add sound effects and background music.');
        extensions.push('Create multiple difficulty levels or game modes.');
        extensions.push('Implement a high score leaderboard with persistence.');
        extensions.push('Add power-ups or special abilities for the player.');
        extensions.push('Create additional levels or procedurally generated content.');
        extensions.push('Add multiplayer support (local or online).');
    } else if (projectType === 'dashboard') {
        extensions.push('Add real-time data updates using WebSockets.');
        extensions.push('Implement customizable dashboard layouts (drag widgets).');
        extensions.push('Add data export features (CSV, PDF, Excel).');
        extensions.push('Create user preferences for chart types and colors.');
        extensions.push('Add date range filters and comparison views.');
        extensions.push('Implement alerts/notifications for threshold breaches.');
    } else if (projectType === 'notes') {
        extensions.push('Add rich text formatting (bold, italic, lists).');
        extensions.push('Implement note categories and nested folders.');
        extensions.push('Add search functionality across all notes.');
        extensions.push('Create note sharing with public links.');
        extensions.push('Add markdown preview mode.');
        extensions.push('Implement note versioning and history.');
    } else if (projectType === 'cli') {
        extensions.push('Add interactive mode with prompts for user input.');
        extensions.push('Implement configuration file support (.config.json).');
        extensions.push('Add progress bars for long-running operations.');
        extensions.push('Create shell completion scripts (bash, zsh).');
        extensions.push('Add verbose/debug mode with detailed logging.');
        extensions.push('Implement plugin system for extensibility.');
    } else {
        extensions.push('Add comprehensive error handling and user-friendly messages.');
        extensions.push('Implement logging for debugging and monitoring.');
        extensions.push('Add configuration options via environment variables or config files.');
        extensions.push('Create automated tests for critical functionality.');
        extensions.push('Add CI/CD pipeline for automated testing and deployment.');
        extensions.push('Improve documentation with examples and tutorials.');
    }
}


// Get form and result elements
const form = document.getElementById('analyzeForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const repoUrlInput = document.getElementById('repoUrl');
const languageSelect = document.getElementById('language');
const descriptionInput = document.getElementById('description');
const repoUrlError = document.getElementById('repoUrlError');
const languageError = document.getElementById('languageError');
const summaryList = document.getElementById('summaryList');
const tasksList = document.getElementById('tasksList');
const readmeTipsList = document.getElementById('readmeTipsList');
const architectureList = document.getElementById('architectureList');
const learningPathList = document.getElementById('learningPathList');
const extensionsList = document.getElementById('extensionsList');

// Clear error message when user starts typing
repoUrlInput.addEventListener('input', function() {
    repoUrlError.textContent = '';
    repoUrlInput.classList.remove('error');
});

languageSelect.addEventListener('change', function() {
    languageError.textContent = '';
    languageSelect.classList.remove('error');
});

// Validate form inputs
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    repoUrlError.textContent = '';
    languageError.textContent = '';
    repoUrlInput.classList.remove('error');
    languageSelect.classList.remove('error');
    
    // Validate repo URL
    const url = repoUrlInput.value.trim();
    if (!url) {
        repoUrlError.textContent = 'Please enter a GitHub repository URL.';
        repoUrlInput.classList.add('error');
        isValid = false;
    } else if (!url.includes('github.com')) {
        repoUrlError.textContent = 'Please enter a valid GitHub URL.';
        repoUrlInput.classList.add('error');
        isValid = false;
    }
    
    // Validate language
    const language = languageSelect.value;
    if (!language) {
        languageError.textContent = 'Please select a programming language.';
        languageSelect.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Render results to the page
function renderResults(results) {
    // Clear all lists
    summaryList.innerHTML = '';
    tasksList.innerHTML = '';
    readmeTipsList.innerHTML = '';
    architectureList.innerHTML = '';
    learningPathList.innerHTML = '';
    extensionsList.innerHTML = '';
    
    // Display summary
    results.summary.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        summaryList.appendChild(li);
    });
    
    // Display tasks
    results.tasks.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        tasksList.appendChild(li);
    });
    
    // Display README tips
    results.readmeTips.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        readmeTipsList.appendChild(li);
    });
    
    // Display architecture
    results.architecture.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        architectureList.appendChild(li);
    });
    
    // Display learning path
    results.learningPath.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        learningPathList.appendChild(li);
    });
    
    // Display extensions
    results.extensions.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        extensionsList.appendChild(li);
    });
}

// Handle form submission
form.addEventListener('submit', function(event) {
    // Prevent page reload
    event.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('loading');
    
    // Get input values
    const url = repoUrlInput.value.trim();
    const language = languageSelect.value;
    const description = descriptionInput.value.trim();
    
    // Create input object
    const input = {
        url: url,
        language: language,
        description: description
    };
    
    // Simulate processing time for better UX
    setTimeout(function() {
        // Call the analysis function
        const results = generateAnalysis(input);
        
        // Render results
        renderResults(results);
        
        // Remove loading state
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('loading');
        
        // Scroll to results smoothly
        const resultsSection = document.getElementById('results');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
});
