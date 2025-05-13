# Truco Scorer

## Description

This is a Truco scorer developed with Vue.js.

The project is my first approach to the web world, following the same idea that brought me to Android more than 12 years ago.

## Features

* **Two Teams:** Allows managing the names of two teams (Team 1 and Team 2), which can be edited.
* **Score:**
    * Adds and subtracts points to each team.
    * Allows playing to 15 or 30 points.
    * Validates that the score does not exceed the established limit (15 or 30 points).
    * When the point limit is reached, an animation is shown indicating the winning team.
* **History:** Records the points that are added and subtracted during the game. 
* **User Interface:**
    * Reactive and clean interface.
    * Responsive design.
* **Tests:** Unit tests that cover the logic and validations of the application.
* **State Management:** Uses Pinia for application state management.
* **Internationalization:** Support for multiple languages (currently includes Spanish).

## Technologies Used

* Vue.js 3
* Pinia
* Vue Router
* vue-i18n
* Vite
* Vitest
* TypeScript

## Configuration

1.  **Clone the repository:**

    \`\`\`bash
    git clone <URL del repositorio>
    cd <nombre del repositorio>
    \`\`\`
2.  **Install dependencies:**

    \`\`\`bash
    npm install
    \`\`\`
3.  **Compile and hot-reload for development:**

    \`\`\`bash
    npm run dev
    \`\`\`
4.  **Compile for production:**

    \`\`\`bash
    npm run build
    \`\`\`
5.  **Execute unit tests:**

    \`\`\`bash
    npm run test:unit
    \`\`\`


## Tests

Unit tests have been implemented to ensure the correct functioning of the components and application logic. The tests cover aspects such as component rendering, user interaction, game validations, and state management.

## Credits

Created by Matias Sieff