function Header({ theme, onToggleTheme }) {
  return (
    <header className="hero-card">
      <div className="hero-card__top">
        <div>
          <p className="hero-card__eyebrow">Portfolio / Lab 4</p>
          <h1 className="hero-card__title">Alina Shpynta</h1>
          <p className="hero-card__subtitle">3rd Year Student · Cybersecurity</p>
        </div>

        <button className="theme-button" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>

      <div className="hero-card__contacts">
        <span>Lviv, Ukraine</span>
        <a href="mailto:alina.shpynta.kb.2023@lpnu.ua">alina.shpynta.kb.2023@lpnu.ua</a>
      </div>
    </header>
  )
}

export default Header