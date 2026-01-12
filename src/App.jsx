import './App.css'
import Header from './components/Header/Header'
import SubHeader from './components/SubHeader/SubHeader'
import Sidebar from './components/Sidebar/Sidebar'
import VoucherTable from './components/VoucherTable/VoucherTable'

function App() {
  const handleSearch = (query) => {
    console.log('Search:', query)
  }

  const handleAddNew = () => {
    console.log('Add New clicked')
  }

  const handlePreferences = () => {
    console.log('Preferences clicked')
  }

  const handleSidebarSelect = (id) => {
    console.log('Sidebar item selected:', id)
  }

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar onSelect={handleSidebarSelect} />
        <div className="app-content">
          <SubHeader
            count={30}
            onSearch={handleSearch}
            onAddNew={handleAddNew}
            onPreferences={handlePreferences}
          />
          <main className="main-content">
            <VoucherTable />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
