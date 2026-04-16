import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import QuotationPage from './pages/QuotationPage';
import ServicesPage from './pages/ServicesPage';
import { FileText, Briefcase, Fish } from 'lucide-react';
import FishQuotationPage from './pages/FishQuotationPage';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#f3f4f6] no-print">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#125b69] tracking-tighter">K<span className="text-[#f1b51c]">Ō</span>DO</span>
        </div>
        <div className="flex gap-4">
          {/*<Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              location.pathname === '/' 
                ? 'bg-[#125b69] text-[#ffffff] shadow-md' 
                : 'text-[#6b7280] hover:bg-[#f0f7f8] hover:text-[#125b69]'
            }`}
          >
            <FileText className="h-4 w-4" />
            Cotización
          </Link>*/}
          <Link
            to="/servicios"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${location.pathname === '/servicios'
              ? 'bg-[#125b69] text-[#ffffff] shadow-md'
              : 'text-[#6b7280] hover:bg-[#f0f7f8] hover:text-[#125b69]'
              }`}
          >
            <Briefcase className="h-4 w-4" />
            Servicios
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const base = isGitHubPages ? '/cotizaciones' : '';
  return (
    <Router>
      <div className="pt-16">
        <Navigation />
        <Routes>
          {/* Usa siempre "/" para la home, el basename hará el resto */}
          <Route path="/" element={<QuotationPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/cotizacion-pescado" element={<FishQuotationPage />} />
        </Routes>
      </div>
    </Router>
  );
}
