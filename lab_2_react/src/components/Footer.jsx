import { useEffect } from "react"

const SYSTEM_INFO_PREFIX = "system."

function Footer({ theme }) {
  useEffect(() => {
    const systemInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages.join(", "),
      vendor: navigator.vendor || "Unknown",
      cookieEnabled: String(navigator.cookieEnabled),
      onLine: String(navigator.onLine),
      hardwareConcurrency: String(navigator.hardwareConcurrency || "Unknown"),
    }

    Object.entries(systemInfo).forEach(([key, value]) => {
      localStorage.setItem(`${SYSTEM_INFO_PREFIX}${key}`, value)
    })
  }, [theme])

  const entries = Object.keys(localStorage)
    .sort()
    .map((key) => ({ key, value: localStorage.getItem(key) }))

  return (
    <footer className="footer-card">
      <p className="footer-copy">© 2026 Alina Shpynta</p>
      <h3 className="footer-title">LocalStorage data</h3>
      <div className="storage-grid">
        {entries.map(({ key, value }) => (
          <article className="storage-card" key={key}>
            <strong>{key}</strong>
            <span>{value}</span>
          </article>
        ))}
      </div>
    </footer>
  )
}

export default Footer