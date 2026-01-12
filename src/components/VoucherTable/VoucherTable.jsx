import { useState, useRef, useEffect } from 'react'
import './VoucherTable.css'
import columnIcon from '../../assets/ic_icon_column.png'

const vouchersData = [
  { id: 1, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Marcus Septimus', status: true },
  { id: 2, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Gretchen Curtis', status: true },
  { id: 3, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Tiana Workman', status: true },
  { id: 4, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Lincoln Ekstrom Bothman', status: true },
  { id: 5, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Miracle Schleifer', status: false },
  { id: 6, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Carter Lipshutz', status: true },
  { id: 7, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Ruben Lubin', status: true },
  { id: 8, name: 'Birthday Gift', type: 'Gift', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Mira Dias', status: true },
  { id: 9, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Skylar Septimus', status: true },
  { id: 10, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Livia Septimus', status: true },
  { id: 11, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Brandon Korsgaard', status: true },
  { id: 12, name: 'Birthday Gift', type: 'Service', amount: '£50', code: 'fhf56w7r8', expiry: 'Feb 23, 2025', assignTo: 'Cooper Stanton', status: true },
]

const initialColumns = [
  { id: 'name', label: 'Voucher Name', draggable: true },
  { id: 'type', label: 'Type', key: 'type', draggable: true },
  { id: 'amount', label: 'Amount', key: 'amount', draggable: true },
  { id: 'code', label: 'Voucher Code', key: 'code', draggable: true },
  { id: 'expiry', label: 'Expiry Date', key: 'expiry', draggable: true },
  { id: 'assign', label: 'Assign To', key: 'assignTo', draggable: true },
  { id: 'status', label: 'Status', key: 'status', draggable: false },
]

function VoucherTable() {
  const [vouchers, setVouchers] = useState(vouchersData)
  const [columns, setColumns] = useState(initialColumns)
  const [selectedColumn, setSelectedColumn] = useState('name')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [draggedColumn, setDraggedColumn] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (id) => {
    setVouchers(vouchers.map(v => 
      v.id === id ? { ...v, status: !v.status } : v
    ))
  }

  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleView = (id) => {
    console.log('View voucher:', id)
    setOpenMenuId(null)
  }

  const handleDelete = (id) => {
    console.log('Delete voucher:', id)
    setOpenMenuId(null)
  }

  // Drag and drop handlers
  const handleDragStart = (e, column) => {
    if (!column.draggable) {
      e.preventDefault()
      return
    }
    setDraggedColumn(column.id)
    setSelectedColumn(column.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, column) => {
    e.preventDefault()
    if (!column.draggable) return
    if (draggedColumn && draggedColumn !== column.id) {
      setDragOverColumn(column.id)
    }
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()
    if (!targetColumn.draggable || !draggedColumn || draggedColumn === targetColumn.id) {
      setDraggedColumn(null)
      setDragOverColumn(null)
      return
    }

    const newColumns = [...columns]
    const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn)
    const targetIndex = newColumns.findIndex(col => col.id === targetColumn.id)

    const [removed] = newColumns.splice(draggedIndex, 1)
    newColumns.splice(targetIndex, 0, removed)

    setColumns(newColumns)
    setDraggedColumn(null)
    setDragOverColumn(null)
  }

  const handleDragEnd = () => {
    setDraggedColumn(null)
    setDragOverColumn(null)
  }

  const renderCellContent = (voucher, column) => {
    if (column.key === 'status') {
      return (
        <label className="toggle">
          <input 
            type="checkbox" 
            checked={voucher.status}
            onChange={() => handleToggle(voucher.id)}
          />
          <span className="toggle-slider"></span>
        </label>
      )
    }
    return voucher[column.key]
  }

  return (
    <div className="voucher-table-container">
      <table className="voucher-table">
        <thead>
          <tr>
            <th className={`col-checkbox ${selectedColumn === columns[0]?.id ? 'selected-start' : ''}`}>
              <img src={columnIcon} alt="Column" className="column-icon" />
            </th>
            {columns.map((column, index) => (
              <th
                key={column.id}
                className={`col-${column.id} ${selectedColumn === column.id ? (index === 0 ? 'selected-end' : 'selected-start selected-end') : ''} ${draggedColumn === column.id ? 'dragging' : ''} ${dragOverColumn === column.id ? 'drag-over' : ''} ${!column.draggable ? 'no-drag' : ''}`}
                draggable={column.draggable}
                onDragStart={(e) => handleDragStart(e, column)}
                onDragOver={(e) => handleDragOver(e, column)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column)}
                onDragEnd={handleDragEnd}
              >
                <span className="col-divider">⋮</span>
                {column.label}
                {column.draggable && <span className="drag-handle">⠿</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id}>
              <td className="col-menu">
                <div className="menu-wrapper" ref={openMenuId === voucher.id ? menuRef : null}>
                  <button 
                    className="menu-btn"
                    onClick={() => handleMenuClick(voucher.id)}
                  >
                    ⋮
                  </button>
                  {openMenuId === voucher.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleView(voucher.id)}>
                        View <span>›</span>
                      </button>
                      <button onClick={() => handleDelete(voucher.id)}>
                        Delete <span>›</span>
                      </button>
                    </div>
                  )}
                </div>
              </td>
              {columns.map((column) => (
                <td key={column.id} className={`col-${column.id}`}>
                  {renderCellContent(voucher, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VoucherTable
