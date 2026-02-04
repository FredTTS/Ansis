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
  
  // --- DATA ---
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
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Driver', distance: 230 }, { id: 2, name: 'Spoon', distance: 205 },
      { id: 3, name: 'Hybrid', distance: 185 }, { id: 4, name: 'J4', distance: 175 },
      { id: 5, name: 'J5', distance: 165 }, { id: 6, name: 'J6', distance: 155 },
      { id: 7, name: 'J7', distance: 145 }, { id: 8, name: 'J8', distance: 135 },
      { id: 9, name: 'J9', distance: 125 }, { id: 10, name: 'PW', distance: 115 },
      { id: 11, name: 'GW', distance: 100 }, { id: 12, name: 'SW', distance: 85 },
      { id: 13, name: 'LW', distance: 70 }
    ];
  });

  const [currentHole, setCurrentHole] = useState(() => parseInt(localStorage.getItem('currentHole')) || 1);
  const [userPosition, setUserPosition] = useState({ lat: 59.3283, lon: 18.0676 });
  const [flagAdjustment, setFlagAdjustment] = useState({ distance: 0, lateral: 0 });
  const [weather, setWeather] = useState({ windSpeed: 0, windDirection: 0, temperature: 20 });

  // --- AUTOMATISKT VÄDER ---
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await response.json();
      if (data && data.wind) {
        setWeather({
          windSpeed: Math.round(data.wind.speed),
          windDirection: data.wind.deg,
          temperature: Math.round(data.main.temp)
        });
        setLastFetch(Date.now());
      }
    } catch (err) { console.error("Weather error:", err); }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition({ lat: latitude, lon: longitude });
          // Hämta väder om det gått mer än 10 min och användaren inte ändrat manuellt
          if (!isManual && (Date.now() - lastFetch > 600000)) {
            fetchWeather(latitude, longitude);
          }
        },
        null, { enableHighAccuracy: true }
      );
    }
  }, [isManual, lastFetch]);

  // Återgå till auto-väder efter 20 sekunder om man ändrat manuellt
  useEffect(() => {
    if (isManual) {
      const timer = setTimeout(() => setIsManual(false), 20000);
      return () => clearTimeout(timer);
    }
  }, [isManual]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180, Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  };

  const getRecommendation = (dist) => {
    const windRad = (weather.windDirection * Math.PI) / 180;
    const headWind = Math.cos(windRad) * weather.windSpeed;
    const crossWind = Math.sin(windRad) * weather.windSpeed;
    const lengthAdjustment = (headWind * 2.5) + ((20 - weather.temperature) * 0.5);
    const adjustedDist = dist + lengthAdjustment;
    const aimAdjustment = Math.round(crossWind * 1.5);
    let aimText = "Mitten";
    if (aimAdjustment > 1) aimText = `${aimAdjustment}m Vänster`;
    if (aimAdjustment < -1) aimText = `${Math.abs(aimAdjustment)}m Höger`;

    const bestClub = [...clubs].filter(c => c.distance > 0)
        .sort((a, b) => Math.abs(a.distance - adjustedDist) - Math.abs(b.distance - adjustedDist))[0];

    return { club: bestClub ? bestClub.name : '?', playAs: Math.round(adjustedDist), aim: aimText };
  };

  const handleManualWeather = (updates) => {
    setWeather(prev => ({ ...prev, ...updates }));
    setIsManual(true);
  };

  const PlayTab = () => {
    const hole = holes.find(h => h.number === currentHole);
    const cosLat = Math.cos(hole.flagLat * Math.PI / 180);
    const adjLat = hole.flagLat + (flagAdjustment.distance * 0.000009);
    const adjLon = hole.flagLon + (flagAdjustment.lateral * 0.000009 / cosLat);
    const actualDist = calculateDistance(userPosition.lat, userPosition.lon, adjLat, adjLon);
    const rec = getRecommendation(actualDist);

    return (
      <div className="space-y-4 pb-10">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <button onClick={() => setCurrentHole(h => Math.max(1, h - 1))} className="w-10 h-10 bg-gray-50 rounded-full font-bold">←</button>
          <div className="text-center">
            <span className="block text-[10px] text-gray-400 font-black tracking-widest uppercase">Hål {currentHole}</span>
            <span className="text-xl font-black text-green-700">Par {hole.par} | Idx {hole.index}</span>
          </div>
          <button onClick={() => setCurrentHole(h => Math.min(18, h + 1))} className="w-10 h-10 bg-gray-50 rounded-full font-bold">→</button>
        </div>

        <div className="bg-green-800 text-white p-8 rounded-[2rem] shadow-xl text-center relative overflow-hidden ring-4 ring-green-700/30">
          <div className="relative z-10">
            <div className="text-8xl font-black tabular-nums tracking-tighter">{actualDist}</div>
            <div className="text-xs opacity-70 font-black tracking-[0.3em] uppercase">Meter till flagga</div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-10"><Target size={140} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-green-600 flex flex-col gap-4 overflow-hidden relative">
            <div className="flex justify-between items-start z-10">
                <div>
                    <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-1"><Sparkles size={12} /> Caddie föreslår</span>
                    <div className="text-4xl font-black text-gray-800">{rec.club}</div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sikta</span>
                    <div className="text-lg font-black text-blue-700">{rec.aim}</div>
                </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center z-10">
                <span className="text-xs font-bold text-gray-500 italic">Spelas som: {rec.playAs}m</span>
                <div className="text-green-700 font-black text-xl">{Math.round(actualDist / 10) * 10}</div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-6">
          <section className="space-y-4">
            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase border-b pb-2"><span>Green (Flagga)</span><span className="text-green-700">{flagAdjustment.distance}m | {flagAdjustment.lateral}m</span></div>
            <input type="range" min="-15" max="15" value={flagAdjustment.distance} onChange={(e) => setFlagAdjustment({...flagAdjustment, distance: parseInt(e.target.value)})} className="w-full h-2 bg-gray-100 rounded-lg appearance-none accent-green-700" />
            <input type="range" min="-10" max="10" value={flagAdjustment.lateral} onChange={(e) => setFlagAdjustment({...flagAdjustment, lateral: parseInt(e.target.
