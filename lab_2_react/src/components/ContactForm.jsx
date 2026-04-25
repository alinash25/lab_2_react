import { useEffect, useState } from "react"

const MODAL_KEY = "contactModalDismissed"
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xkoppedp"

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const isConfigured = !FORMSPREE_ENDPOINT.includes("REPLACE_WITH_YOUR_ENDPOINT")

  useEffect(() => {
    if (sessionStorage.getItem(MODAL_KEY) === "true") {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setIsOpen(true)
    }, 60000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    sessionStorage.setItem(MODAL_KEY, "true")
    setIsOpen(false)
  }

  return (
    <>
      <button className="feedback-open-button" type="button" onClick={handleOpen}>
        Зворотний зв'язок
      </button>

      {isOpen && (
        <div className="modal-shell" role="presentation">
          <button className="modal-overlay" type="button" aria-label="Закрити модальне вікно" onClick={handleClose} />

          <div aria-labelledby="contact-form-title" aria-modal="true" className="modal-card" role="dialog">
            <button className="modal-close" type="button" onClick={handleClose}>
              ×
            </button>

            <h2 className="section-title" id="contact-form-title">Feedback Form</h2>
            <p className="section-muted">
              Leave your contact details and message. The form is ready for Formspree integration.
            </p>

            {!isConfigured && (
              <p className="form-warning">
                Replace VITE_FORMSPREE_ENDPOINT or the placeholder URL before sending real messages.
              </p>
            )}

            <form action={FORMSPREE_ENDPOINT} className="feedback-form" method="POST">
              <label>
                Name
                <input name="name" required type="text" />
              </label>

              <label>
                Email
                <input name="email" required type="email" />
              </label>

              <label>
                Phone
                <input name="phone" required type="tel" />
              </label>

              <label>
                Message
                <textarea name="message" required rows="5" />
              </label>

              <button className="submit-button" type="submit">Відправити</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactForm