import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { Offline } from '@/sections/Offline';
import { Privacy } from '@/sections/Privacy';
import { Efficiency } from '@/sections/Efficiency';
import { Story } from '@/sections/Story';
import { Languages } from '@/sections/Languages';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen transition-colors duration-500 ease-out">
          <Navbar />
          <main>
            <Hero />
            <Offline />
            <Privacy />
            <Efficiency />
            <Story />
            <Languages />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
