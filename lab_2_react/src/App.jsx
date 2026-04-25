import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import About from "./components/About"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Reviews from "./components/Reviews"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"

const THEME_KEY = "preferredTheme"
const DAY_START_HOUR = 7
const NIGHT_START_HOUR = 21

function getAutoTheme() {
  const currentHour = new Date().getHours()
  return currentHour >= DAY_START_HOUR && currentHour < NIGHT_START_HOUR
    ? "light"
    : "dark"
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || getAutoTheme())

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark")
    document.body.classList.add(`theme-${theme}`)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
  }

  return (
    <div className={`app-shell app-shell--${theme}`}>
      <div className="app-container">
        <Header theme={theme} onToggleTheme={handleThemeToggle} />
        <About />
        <Education />
        <Skills />
        <Reviews />
        <Footer theme={theme} />
      </div>
      <ContactForm />
    </div>
  )
}

export default App