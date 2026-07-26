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
Every time the input changes, React re-renders the component instantly to reflect updated time calculations without needing a page refresh.

### 3. Calculation Logic

Assuming a benchmark target lifespan of **90 years**, the underlying arithmetic converts the remaining years into days, weeks, and months:

```text
Years Remaining = 90 - Current Age
Days Left        = Years Remaining × 365
Weeks Left       = Years Remaining × 52
Months Left      = Years Remaining × 12
```

> **Note:** The calculations are approximate and are intended for visualization purposes. Leap years and exact birth dates are not currently considered.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Styling:** CSS3 (`App.css`, `index.css`)
- **Linter:** Oxlint

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js (v16 or higher)** installed on your system.

### Installation & Local Setup

1. Clone the repository:

```bash
git clone https://github.com/Divyansh-7787/Life-in-Weeks.git
```

2. Navigate to the project directory:

```bash
cd Life-in-Weeks
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:5173
```

---

## 📁 Repository Structure

```text
Life-in-Weeks/
├── public/                # Static assets (favicons, SVG icons)
├── src/
│   ├── assets/            # Project images and graphics
│   ├── App.css            # Component styles
│   ├── App.jsx            # Main React component & business logic
│   ├── index.css          # Global styling rules
│   └── main.jsx           # React application entry point
├── index.html             # HTML template
├── package.json           # Project dependencies & scripts
├── vite.config.js         # Vite configuration
└── .oxlintrc.json         # Oxlint configuration
```

---

## 🔮 Future Improvements

Planned enhancements for future releases include:

- 🎨 **Interactive Life Grid** — Display a **90 × 52** grid representing every week of a 90-year life, highlighting completed and remaining weeks.
- 📅 **Date of Birth Picker** — Perform precise calculations using the user's exact birth date, including leap years.
- 🎯 **Custom Life Expectancy** — Allow users to choose their own target lifespan (e.g., 80, 85, or 100 years).
- 📝 **Life Milestones** — Let users annotate significant events such as graduation, career changes, marriage, or travel.
- 🌙 **Dark / Light Theme** — Add a theme switcher using CSS variables and system preferences.
- 📤 **Export & Share** — Download or share a personalized life grid as a high-resolution PNG image.

---

## 🤝 Contributing

Contributions are always welcome!

If you'd like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

You can also open an issue to report bugs, suggest improvements, or request new features.

---

## ⭐ Support

If you found this project helpful or inspiring, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future development.

---

## 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it in accordance with the license terms.
