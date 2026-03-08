import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';

function App() {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Education />
        <Skills />
      </main>
      <footer>
        <p>© 2026 Alina Shpynta</p>
      </footer>
    </div>
  );
}

export default App;