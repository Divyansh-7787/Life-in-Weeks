# ⏳ Life in Weeks

A modern, responsive React + Vite web application designed to visualize human lifespan in days, weeks, and months. 

Inspired by Tim Urban’s famous essay *"Your Life in Weeks"* on **Wait But Why**, this interactive tool offers a clear, visual perspective on time and mortality.

---

## 🎯 Scope & Intended Target

### Scope
The scope of this project is to provide an accessible, real-time web calculator built with modern frontend tools (React and Vite). It translates raw numerical age data into visual representations of time already spent versus time remaining based on standard life expectancy benchmarks.

### Intended Target Audience
- **Individuals & Productivity Seekers:** Anyone looking for a reflective visualization of time to encourage mindfulness, intentional living, and goal prioritization.
- **Beginner Web Developers:** Students and developers exploring functional React components, state management (`useState`), and building fast frontends with Vite.

---

## 🧮 How It Works: Code & Logic for Beginners

The application is structured as a single-page React application. Here is how the inner logic operates step-by-step:

### 1. Project Architecture & Setup
- **Vite:** Acts as the build tool and development server, offering fast hot-module replacement (HMR) during development[cite: 1].
- **React (`App.jsx`):** Serves as the main component managing user interactions and calculations[cite: 1].
- **Oxlint:** Ensures code quality and consistent formatting across JS/JSX files[cite: 1].

### 2. State Management (`useState`)
When a user enters their current age into the input field, React captures this value using local state[cite: 1]:
```jsx
const [age, setAge] = useState('');
```
Every time the input changes, React re-renders the component instantly to reflect updated time calculations without needing a page refresh.3. Calculation LogicAssuming a benchmark target lifespan of 90 years, the underlying arithmetic converts the remaining years into days, weeks, and months:Years Remaining = 90 - Current Age 
Days Left = Years Remaining \times 365$$$$\text{Weeks Left} = \text{Years Remaining} \times 52$$$$\text{Months Left} = \text{Years Remaining} \times 12$$🛠️ Tech StackFrontend: React.js[cite: 1]Build Tool: Vite[cite: 1]Styling: CSS3 (App.css, index.css)[cite: 1]Linter: Oxlint[cite: 1]🚀 Getting StartedPrerequisitesEnsure you have Node.js (v16 or higher) installed on your system.Installation & Local RunClone the repository:Bashgit clone [https://github.com/Divyansh-7787/Life-in-Weeks.git](https://github.com/Divyansh-7787/Life-in-Weeks.git)
Navigate to the project directory:Bashcd Life-in-Weeks
Install dependencies:Bashnpm install
Start the local development server:Bashnpm run dev
Open http://localhost:5173 in your browser to view the application.📁 Repository StructurePlaintextLife-in-Weeks/
├── public/                # Static assets (favicons, SVG icons)[cite: 1]
├── src/
│   ├── assets/            # Project images and graphics[cite: 1]
│   ├── App.css            # Component styles[cite: 1]
│   ├── App.jsx            # Main React component & business logic[cite: 1]
│   ├── index.css          # Global styling rules[cite: 1]
│   └── main.jsx           # React DOM application entry point[cite: 1]
├── index.html             # HTML template[cite: 1]
├── package.json           # Node project scripts & dependencies[cite: 1]
├── vite.config.js         # Vite configuration[cite: 1]
└── .oxlintrc.json         # Linter rules configuration[cite: 1]
🔮 Future Improvements & New Features
Here are planned features and potential enhancements for future releases:[ ] Interactive Visual Grid: Render a 52x90 grid of boxes representing every week of a 90-year life, coloring filled boxes (past) vs. empty boxes (future).[ ] Exact Date-of-Birth Picker: Allow users to select their exact birthdate via a calendar input for precise, leap-year-aware calculations using JavaScript Date objects.[ ] Custom Target Lifespan: Allow users to adjust the default target age (e.g., set expected lifespan to 80, 85, or 100 years).[ ] Life Milestones & Annotations: Enable users to click on specific week blocks to log major personal milestones (e.g., graduation, career change, marriage).[ ] Dark / Light Theme Toggle: Implement dynamic theme switching compatible with modern CSS variables and user preferences.[ ] Export & Share Feature: Option to download a visual high-resolution PNG image of your personalized life grid poster.🤝 ContributingContributions are always welcome! If you'd like to add a feature or report a bug, feel free to open an issue or submit a pull request.
