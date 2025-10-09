import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopicList from './components/Topics/TopicList';
import TopicForm from './components/Topics/TopicForm';
import NoteList from './components/Notes/NoteList';
import NoteForm from './components/Notes/NoteForm';
import SearchBar from './components/common/SearchBar';
import './App.css';

function App() {
  const handleSearch = (results) => {
    console.log('Search results:', results);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Smart Notes Assistant</h1>
          <nav>
            <Link to="/">Home</Link> |{' '}
            <Link to="/topics">Topics</Link> |{' '}
            <Link to="/notes">Notes</Link>
          </nav>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main className="App-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <h2>Welcome to Smart Notes Assistant</h2>
                  <p>Organize your notes and let AI help you summarize them!</p>
                </div>
              } 
            />
            <Route 
              path="/topics" 
              element={
                <div>
                  <TopicForm onSubmit={() => {}} />
                  <TopicList />
                </div>
              } 
            />
            <Route 
              path="/notes" 
              element={
                <div>
                  <NoteForm onSubmit={() => {}} />
                  <NoteList />
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
