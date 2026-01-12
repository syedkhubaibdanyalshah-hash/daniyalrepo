import { useState } from 'react'
import './Sidebar.css'

import icFirst from '../../assets/ic_first.png'
import icSecond from '../../assets/ic_second.png'
import icThird from '../../assets/ic_third.png'
import icFourth from '../../assets/ic_fourth.png'
import icFifth from '../../assets/ic_fifth.png'
import icSixth from '../../assets/ic_sixth.png'
import icSeventh from '../../assets/ic_seventh.png'
import icEighth from '../../assets/ic_eighth.png'
import icNineth from '../../assets/ic_nineth.png'
import icTenth from '../../assets/ic_tenth.png'
import icEleventh from '../../assets/ic_eleventh.png'
import icTwelveth from '../../assets/ic_twelveth.png'
import icThirteenth from '../../assets/ic_thirteenth.png'
import icFourteenth from '../../assets/ic_fourteenth.png'
import icFifteenth from '../../assets/ic_fifteenth.png'
import icSixteenth from '../../assets/ic_sixteenth.png'
import icSeventeeth from '../../assets/ic_seventeeth.png'
import icEighteenth from '../../assets/ic_eighteenth.png'
import icNineteenth from '../../assets/ic_nineteenth.png'

const menuItems = [
  { id: 1, icon: icFirst, label: 'First' },
  { id: 2, icon: icSecond, label: 'Second' },
  { id: 3, icon: icThird, label: 'Third' },
  { id: 4, icon: icFourth, label: 'Fourth' },
  { id: 5, icon: icFifth, label: 'Fifth' },
  { id: 6, icon: icSixth, label: 'Sixth' },
  { id: 7, icon: icSeventh, label: 'Seventh' },
  { id: 8, icon: icEighth, label: 'Eighth' },
  { id: 9, icon: icNineth, label: 'Ninth' },
  { id: 10, icon: icTenth, label: 'Tenth' },
  { id: 11, icon: icEleventh, label: 'Eleventh' },
  { id: 12, icon: icTwelveth, label: 'Twelfth' },
  { id: 13, icon: icThirteenth, label: 'Thirteenth' },
  { id: 14, icon: icFourteenth, label: 'Fourteenth' },
  { id: 15, icon: icFifteenth, label: 'Fifteenth' },
  { id: 16, icon: icSixteenth, label: 'Sixteenth' },
  { id: 17, icon: icSeventeeth, label: 'Seventeenth' },
  { id: 18, icon: icEighteenth, label: 'Eighteenth' },
  { id: 19, icon: icNineteenth, label: 'Nineteenth' },
]

// Dividers after: 4, 8, 11, 14 (groups: 4, 4, 3, 3, 5)
const dividerAfter = [4, 8, 11, 14]

function Sidebar({ onSelect }) {
  const [activeId, setActiveId] = useState(10)

  const handleClick = (id) => {
    setActiveId(id)
    onSelect?.(id)
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className={`sidebar-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
              title={item.label}
            >
              <img src={item.icon} alt={item.label} className="sidebar-icon" />
            </button>
            {dividerAfter.includes(item.id) && <div className="sidebar-divider"></div>}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
