# Nuxt Styled Template

Welcome to the Nuxt Styled Template repository! This template is designed to kickstart your Nuxt.js project with styled components, linting, formatting, and commit management pre-configured. It integrates popular tools and practices to streamline your development process.

## Features

- **Nuxt.js** for powerful Vue.js applications.
- **Tailwind CSS** for utility-first styling.
- **PrimeVue** for a comprehensive set of UI components.
- **ESLint** and Prettier for code quality and consistency.
- **Husky** and lint-staged for managing Git hooks and pre-commit tasks.
- **Commitizen** for standardized commit messages.
- **Vitest** for unit and integration testing.
- **Playwright** for end-to-end testing.

## Getting Started

Follow these steps to get your development environment up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nuxt-styled-template.git
cd nuxt-styled-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Running the Development Server

```bash
npm run dev
```

This will start the Nuxt development server. Open http://localhost:3000 in your browser to see your application in action.

### 4. Building for Production

```bash
npm run build
```

This command builds your project for production.

### 5. Previewing the Production Build

```bash
npm run preview
```

This command starts a preview server for the production build.

### 6. Generating Static Site

```bash
npm run generate
```

This command generates a static version of your site.

## Code Quality

- **Linting**: Run `npm run lint` to check for linting issues.
- **Fixing Issues**: Run `npm run lint:fix` to automatically fix linting issues.
- **Formatting**: Run `npm run format` to format code with Prettier.

## Commit Messages

This project uses [Commitizen](https://github.com/commitizen/cz-customizable) to standardize commit messages. We recommend replacing the `build-commit.js` file from the `cz-customizable` module with a custom configuration to better suit your needs.

### Recommended Files

1. **Replace the `build-commit.js` file located in `node_modules/cz-customizable/lib/` with the following file:**

   - **`build-commit.js`**: [Click here to access the configuration file](https://gist.githubusercontent.com/HanglessonDev/20e0be1a5c5384b233c5f9b7a1a6cf28/raw/2fa7e0d6e8329c36abce63343da0336cb5578199/build-commit.js)

   This file customizes how commits are processed and managed.

2. **Update the Commitizen configuration file with the following:**

   - **`cz-config.cjs`**: [Click here to access the configuration file](https://gist.githubusercontent.com/HanglessonDev/20e0be1a5c5384b233c5f9b7a1a6cf28/raw/0b5a5fe1c2dde9e8ddd5ab88e494d387598cb942/cz-config.cjs)

   This file defines the rules and style for your commit messages.

### How to Replace the File

1. **Locate the `build-commit.js` file** in `node_modules/cz-customizable/lib/`.
2. **Replace the content** of this file with the content from the provided `build-commit.js` file.
3. **Ensure that the `cz-config.cjs` file** is present at the root of your project or in the directory specified in `package.json` so that Commitizen can find and use it correctly.

### How to Use

After replacing the file and updating the configuration file, use the following command to create a commit:

```bash
npm run commit
```

## Testing

- **Unit and Integration Tests**: Run `npm run test` to execute unit and integration tests with Vitest.
- **End-to-End Tests**: Use Playwright for end-to-end testing.

## Git Hooks

Husky and lint-staged are set up to run linting and formatting checks before commits. Ensure your code passes these checks before committing.

## Dependencies

### Core Dependencies

- **Nuxt**.js: Framework for building Vue.js applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **PrimeVue**: UI component library.

### DevDependencies

- **ESLint**: Linting utility for JavaScript and Vue files.
- **Prettier**: Code formatter.
- **Husky**: Git hooks.
- **Lint-staged**: Run linters on pre-committed files.
- **Vitest**: Unit testing framework.
- **Playwright**: End-to-end testing framework.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository.
2. **Create** a new branch for your feature or fix.
3. **Commit** your changes with a clear message.
4. **Push** your changes to your fork.
5. **Open** a pull request describing your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Happy coding! 🚀
