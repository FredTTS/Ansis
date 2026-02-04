const { useState, useEffect } = React;

// --- API NYCKEL ---
const WEATHER_API_KEY = "99d688898682ba4fc727529cd0fbd7ac";

// --- IKONER ---
const Target = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const MapPin = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Sparkles = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 1.912 5.886 6.182.01-5 3.65 1.901 5.889L12 14.775l-5 3.66 1.901-5.89-5-3.649 6.182-.01L12 3z"/></svg>;
const Navigation = ({ size = 24, style }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={style}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
const Refresh = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6m12-4a9 9 0 0 1-15 6.7L3 16"/></svg>;

const AnsisApp = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'play');
  const [lastFetch, setLastFetch] = useState(0);
  const [isManual, setIsManual] = useState(false);
  
  const [holes] = useState([
    { number: 1, par: 4, index: 12, length: 354, flagLat: 59.3293, flagLon: 18.0686 },
    { number: 2, par: 5, index: 8, length: 422, flagLat: 59.3295, flagLon: 18.0690 },
    { number: 3, par: 5, index: 6, length: 469, flagLat: 59.3297, flagLon: 18.0695 },
    { number: 4, par: 3, index: 16, length: 116, flagLat: 59.3300, flagLon: 18.0700 },
    { number: 5, par: 5, index: 4, length: 446, flagLat: 59.3305, flagLon: 18.0705 },
    { number: 6, par: 4, index: 14, length: 332, flagLat: 59.3310, flagLon: 18.0710 },
    { number: 7, par: 4, index: 18, length: 238, flagLat: 59.3315, flagLon: 18.0715 },
    { number: 8, par: 4, index: 2, length: 327, flagLat: 59.3320, flagLon: 18.0720 },
    { number: 9, par: 3, index: 10, length: 150, flagLat: 59.3325, flagLon: 18.0725 },
    { number: 10, par: 4, index: 5, length: 280, flagLat: 59.3330, flagLon: 18.0730 },
    { number: 11, par: 4, index: 1, length: 346, flagLat: 59.3335, flagLon: 18.0735 },
    { number: 12, par: 5, index: 9, length: 431, flagLat: 59.3340, flagLon: 18.0740 },
    { number: 13, par: 3, index: 15, length: 152, flagLat: 59.3345, flagLon: 18.0745 },
    { number: 14, par: 5, index: 11, length: 468, flagLat: 59.3350, flagLon: 18.0750 },
    { number: 15, par: 3, index: 17, length: 116, flagLat: 59.3355, flagLon: 18.0755 },
    { number: 16, par: 4, index: 3, length: 334, flagLat: 59.3360, flagLon: 18.0760 },
    { number: 17, par: 3, index: 13, length: 133, flagLat: 59.3365, flagLon: 18.0765 },
    { number: 18, par: 4, index: 7, length: 333, flagLat: 59.3370, flagLon: 18.0770 }
  ]);

  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('clubs');
    return saved ? JSON.parse(saved)
