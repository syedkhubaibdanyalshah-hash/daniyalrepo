import { useState } from 'react'
import './SubHeader.css'
import redSearchIcon from '../../assets/ic_red_search.png'

function SubHeader({ count = 30, onSearch, onAddNew, onPreferences }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <div className="subheader">
      <div className="subheader-left">
        <h1 className="subheader-title">Vouchers</h1>
        <span className="subheader-count">({count})</span>
      </div>

      <div className="subheader-right">
        <div className="subheader-search">
          <img src={redSearchIcon} alt="Search" className="subheader-search-icon" />
          <input
            type="text"
            className="subheader-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <button className="btn btn-primary" onClick={onAddNew}>
          + Add New
        </button>

        <button className="btn btn-outline" onClick={onPreferences}>
          Preferences
        </button>
      </div>
    </div>
  )
}

export default SubHeader
