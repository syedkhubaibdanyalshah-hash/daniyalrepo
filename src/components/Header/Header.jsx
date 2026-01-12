import { useState, useRef, useEffect } from 'react'
import './Header.css'
import logoImg from '../../assets/ic_whole_expertlogo.png'
import notificationIcon from '../../assets/ic_notification.png'
import messagesIcon from '../../assets/ic_messages.png'
import settingsIcon from '../../assets/ic_settings.png'
import languageIcon from '../../assets/ic_language.png'
import profilePic from '../../assets/ic_profile_pic.png'
import ukFlag from '../../assets/ic_flag.png'
import whiteSearchIcon from '../../assets/ic_whitesearch.png'

const countries = [
  { code: 'gb', name: 'UK', flag: ukFlag },
  { code: 'us', name: 'USA', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'de', name: 'Germany', flag: 'https://flagcdn.com/w20/de.png' },
  { code: 'fr', name: 'France', flag: 'https://flagcdn.com/w20/fr.png' },
  { code: 'in', name: 'India', flag: 'https://flagcdn.com/w20/in.png' },
]

const languages = [
  { code: 'en', name: 'ENG' },
  { code: 'de', name: 'DEU' },
  { code: 'fr', name: 'FRA' },
  { code: 'es', name: 'ESP' },
  { code: 'hi', name: 'Urd' },
]

const profileOptions = [
  { id: 'profile', label: 'My Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'logout', label: 'Logout' },
]

function Header() {
  const [countryOpen, setCountryOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [searchQuery, setSearchQuery] = useState('')

  const countryRef = useRef(null)
  const langRef = useRef(null)
  const profileRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setCountryOpen(false)
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Add your search logic here
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src={logoImg} alt="Expert" className="logo-img" />
        </div>
      </div>

      <div className="header-right">
        <span className="divider"></span>
        
        <form className="search-box" onSubmit={handleSearch}>
          <img src={whiteSearchIcon} alt="Search" className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <span className="divider"></span>

        <div className="header-actions">
          <button className="action-btn" aria-label="Notifications">
            <img src={notificationIcon} alt="Notifications" className="action-icon" />
          </button>
          <button className="action-btn" aria-label="Messages">
            <img src={messagesIcon} alt="Messages" className="action-icon" />
          </button>
          <button className="action-btn" aria-label="Settings">
            <img src={settingsIcon} alt="Settings" className="action-icon" />
          </button>
        </div>

        <span className="divider"></span>

        <div className="dropdown" ref={countryRef}>
          <div className="dropdown-trigger" onClick={() => setCountryOpen(!countryOpen)}>
            <img src={selectedCountry.flag} alt={selectedCountry.name} className="flag-icon" />
            <span className="selector-text">{selectedCountry.name}</span>
            <svg className={`dropdown-arrow ${countryOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="white" width="12" height="12">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          {countryOpen && (
            <div className="dropdown-menu">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className={`dropdown-item ${selectedCountry.code === country.code ? 'active' : ''}`}
                  onClick={() => { setSelectedCountry(country); setCountryOpen(false) }}
                >
                  <img src={country.flag} alt={country.name} className="flag-icon" />
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="divider"></span>

        <div className="dropdown" ref={langRef}>
          <div className="dropdown-trigger" onClick={() => setLangOpen(!langOpen)}>
            <img src={languageIcon} alt="Language" className="language-icon" />
          </div>
          {langOpen && (
            <div className="dropdown-menu">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`dropdown-item ${selectedLang.code === lang.code ? 'active' : ''}`}
                  onClick={() => { setSelectedLang(lang); setLangOpen(false) }}
                >
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="divider"></span>

        <div className="dropdown" ref={profileRef}>
          <div className="dropdown-trigger" onClick={() => setProfileOpen(!profileOpen)}>
            <img src={profilePic} alt="Profile" className="profile-img" />
            <svg className={`dropdown-arrow ${profileOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="white" width="12" height="12">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          {profileOpen && (
            <div className="dropdown-menu profile-menu">
              {profileOptions.map((option) => (
                <div
                  key={option.id}
                  className="dropdown-item"
                  onClick={() => { console.log(option.id); setProfileOpen(false) }}
                >
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
