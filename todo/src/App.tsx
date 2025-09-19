import './App.css'
import  Todomain  from './components/Todomain'

function App() {

  return (
    <>
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✨ Todo List
          </h1>
          <p className="text-gray-600 text-lg">Stay organized and productive</p>
        </div>
        <Todomain/>
      </div>
    </div>
    </>
  )
}

export default App
