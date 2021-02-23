import './Backdrop.css'

const Backdrop = ({ showSideBar, setShowSideBar }) => {
  const toggleSideBar = () => {
    setShowSideBar(false)
  }

  return showSideBar && <div className="backdrop" onClick={toggleSideBar}></div>
}

export default Backdrop
