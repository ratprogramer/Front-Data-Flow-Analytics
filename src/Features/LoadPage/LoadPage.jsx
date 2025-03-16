import './LoadPage.css'

export const LoadPage = () => {
  return (
    <div className="loading">
      <svg height="131px" width="174px">
        <polyline id="back" points="0.354 53.897, 31.5 53.897, 49.146 108, 96.75 0, 112.5 54, 144 54"></polyline>
        <polyline id="front" points="0.354 53.897, 31.5 53.897, 49.146 108, 96.75 0, 112.5 54, 144 54"></polyline>
        <polyline id="front2" points="0.354 53.897, 31.5 53.897, 49.146 108, 96.75 0, 112.5 54, 144 54"></polyline>
      </svg>
    </div>
  )
}
