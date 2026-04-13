import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { Offline } from '@/sections/Offline';
import { Privacy } from '@/sections/Privacy';
import { Efficiency } from '@/sections/Efficiency';
import { Story } from '@/sections/Story';
import { Languages } from '@/sections/Languages';
import { SocialProof } from '@/components/SocialProof';
import { Screenshots } from '@/sections/Screenshots';
import { DemoVideo } from '@/sections/DemoVideo';
import { FacebookPixel } from '@/components/FacebookPixel';
import { DownloadSection } from '@/sections/Download';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FacebookPixel pixelId="1264054845910334" />
        <div className="min-h-screen transition-colors duration-500 ease-out">
          <Navbar />
          <main>
            <Hero />
            <SocialProof /> {/* NEW: Social proof section */}
            <Screenshots /> {/* NEW: Screenshots section */}
            <Offline />
            <Privacy />
            <Efficiency />
            <DemoVideo /> {/* NEW: Demo video section */}
            <Story />
            <Languages />
            <DownloadSection />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
