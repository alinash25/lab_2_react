import { useEffect, useState } from "react"

const COMMENT_VARIANT = 26

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadReviews() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${COMMENT_VARIANT}/comments`,
        )

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const comments = await response.json()

        if (isMounted) {
          setReviews(comments)
          setStatus("success")
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message)
          setStatus("error")
        }
      }
    }

    loadReviews()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="content-card">
      <h2 className="section-title">Previous Employer Reviews</h2>

      {status === "loading" && <p className="section-muted">Loading comments from server...</p>}
      {status === "error" && <p className="section-muted">Failed to load comments: {errorMessage}</p>}

      {status === "success" && (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card__header">
                <h3 className="section-subtitle">{review.name}</h3>
                <a href={`mailto:${review.email}`}>{review.email}</a>
              </div>
              <p>{review.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Reviews