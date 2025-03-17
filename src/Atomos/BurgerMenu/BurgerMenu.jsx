import './BurgerMenu.modules.css'

export const BurgerMenu = ({ onclick }) => {
  return (
    <label className="burger" onClick={onclick}>
      <input type="checkbox" id="burger" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  )
}
