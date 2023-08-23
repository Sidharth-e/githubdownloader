import './App.css';
import Github from './components/download/github';
import Tutorial from './components/tutorial/Tutorial';
import Header from './components/header/header';
function App() {
  return (
    <div className="App">
      <Header/>
      <Github/>
      <Tutorial/>
    </div>
  );
}

export default App;
