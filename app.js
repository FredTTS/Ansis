const { useState, useEffect } = React;

// --- IKONER ---
const Wind = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);
const Thermometer = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
  </svg>
);
const Navigation = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);
const MapPin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const Target = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const AnsisApp = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'play');
  
  // --- KORREKT HÅLDATA (1-18) ---
  const [holes, setHoles] = useState(() => {
    const saved = localStorage.getItem('holes');
    // Om vi har sparad data men hål 18 är fel längd, tvingar vi fram en uppdatering
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length === 18 && parsed[17].length === 333) return parsed;
    }
    
    return [
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
      { number: 18, par: 4, index: 7, length: 333, flagLat: 59.3370, flagLon: 18.0770 } // KORRIGERAD: 333m
    ];
  });

  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('clubs');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Driver', distance: 230 },
      { id: 6, name: 'Järn 7', distance: 145 },
      { id: 11, name: 'SW', distance: 80 }
    ];
  });

  const [currentHole, setCurrentHole] = useState(() => parseInt(localStorage.getItem('currentHole')) || 1);
  const [userPosition, setUserPosition] = useState({ lat: 59.3283, lon: 18.0676 });
  const [flagAdjustment, setFlagAdjustment] = useState({ distance: 0, lateral: 0 });
  const [weather, setWeather] = useState({ windSpeed: 5, windDirection: 0, temperature: 20 });

  useEffect(() => { localStorage.setItem('holes', JSON.stringify(holes)); }, [holes]);
  useEffect(() => { localStorage.setItem('clubs', JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem('activeTab', activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem('currentHole', currentHole); }, [currentHole]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setUserPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        null, { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180, Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  };

  const CourseTab = () => (
    <div className="space-y-4 pb-10">
      <h2 className="text-xl font-bold flex items-center gap-2 px-1"><MapPin className="text-green-700" /> Banguide</h2>
      <div className="grid gap-3">
        {holes.map((hole) => (
          <div key={hole.number} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-black text-gray-800">Hål {hole.number}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Index {hole.index}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Par</div>
                <div className="font-black text-lg text-gray-700">{hole.par}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Längd</div>
                <div className="font-black text-lg text-gray-700">{hole.length}m</div>
              </div>
              <button 
                onClick={() => {
                  const newHoles = holes.map(h => h.number === hole.number ? {...h, flagLat: userPosition.lat, flagLon: userPosition.lon} : h);
                  setHoles(newHoles);
                  alert(`Position för hål ${hole.number} sparad!`);
                }}
                className="bg-green-700 text-white rounded-lg flex flex-col items-center justify-center active:scale-95 transition-transform"
              >
                <div className="text-[9px] uppercase font-black">Spara GPS</div>
                <MapPin size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PlayTab = () => {
    const hole = holes.find(h => h.number === currentHole);
    if (!hole) return null;

    const cosLat = Math.cos(hole.flagLat * Math.PI / 180);
    const adjLat = hole.flagLat + (flagAdjustment.distance * 0.000009);
    const adjLon = hole.flagLon + (flagAdjustment.lateral * 0.000009 / cosLat);
    const dist = calculateDistance(userPosition.lat, userPosition.lon, adjLat, adjLon);

    return (
      <div className="space-y-6 pb-10">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <button onClick={() => setCurrentHole(h => Math.max(1, h - 1))} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-xl font-bold active:bg-gray-200 shadow-inner text-gray-400">←</button>
          <div className="text-center">
            <span className="block text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Hål {currentHole}</span>
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-xs font-bold text-gray-400">PAR</span>
              <span className="text-2xl font-black text-green-700">{hole.par}</span>
              <span className="text-xs font-bold text-gray-400 ml-1">IDX</span>
              <span className="text-2xl font-black text-green-700">{hole.index}</span>
            </div>
          </div>
          <button onClick={() => setCurrentHole(h => Math.min(18, h + 1))} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-xl font-bold active:bg-gray-200 shadow-inner text-gray-400">→</button>
        </div>

        <div className="bg-green-800 text-white p-10 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden ring-4 ring-green-700/50">
          <div className="relative z-10">
            <div className="text-8xl font-black mb-1 tabular-nums tracking-tighter">{dist}</div>
            <div className="text-sm opacity-70 font-black tracking-[0.3em] uppercase">Meter till flagga</div>
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12"><Target size={160} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-8 border border-gray-100">
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-3">
              <Target size={18} className="text-green-700" />
              <h3 className="font-black text-gray-800 uppercase text-xs tracking-wider">Justera Green</h3>
            </div>
            <div className="space-y-8">
              <div className="relative">
                <div className="flex justify-between text-[10px] font-black mb-4 uppercase text-gray-400 tracking-tighter">
                  <span>Djup (Kort - Lång)</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">{flagAdjustment.distance}m</span>
                </div>
                <input type="range" min="-15" max="15" step="1" value={flagAdjustment.distance}
                  onChange={(e) => setFlagAdjustment({...flagAdjustment, distance: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-700"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between text-[10px] font-black mb-4 uppercase text-gray-400 tracking-tighter">
                  <span>Sidled (Vänster - Höger)</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">{flagAdjustment.lateral}m</span>
                </div>
                <input type="range" min="-10" max="10" step="1" value={flagAdjustment.lateral}
                  onChange={(e) => setFlagAdjustment({...flagAdjustment, lateral: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-700"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-3">
              <Wind size={18} className="text-blue-600" />
              <h3 className="font-black text-gray-800 uppercase text-xs tracking-wider">Väderförhållanden</h3>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[10px] font-black mb-4 uppercase text-gray-400 tracking-tighter">
                  <span>Vindstyrka</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">{weather.windSpeed} m/s</span>
                </div>
                <input type="range" min="0" max="25" step="1" value={weather.windSpeed}
                  onChange={(e) => setWeather({...weather, windSpeed: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black mb-4 uppercase text-gray-400 tracking-tighter">
                  <span>Lufttemperatur</span>
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">{weather.temperature}°C</span>
                </div>
                <input type="range" min="0" max="40" step="1" value={weather.temperature}
                  onChange={(e) => setWeather({...weather, temperature: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const ClubsTab = () => (
    <div className="space-y-3 pb-10">
      <h2 className="text-xl font-black mb-6 px-1 uppercase tracking-tight">Mina Klubbor</h2>
      {clubs.map(club => (
        <div key={club.id} className="bg-white p-5 rounded-2xl flex justify-between items-center shadow-sm border border-gray-50">
          <span className="font-black text-gray-700 uppercase text-sm tracking-wide">{club.name}</span>
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              value={club.distance} 
              onChange={(e) => {
                const newClubs = clubs.map(c => c.id === club.id ? {...c, distance: parseInt(e.target.value) || 0} : c);
                setClubs(newClubs);
              }}
              className="w-20 p-2 bg-gray-50 border-none rounded-xl text-center font-black text-green-700 text-lg shadow-inner"
            />
            <span className="text-gray-300 text-xs font-black uppercase">m</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-green-700 text-white p-6 shadow-xl sticky top-0 z-20 text-center rounded-b-[2rem]">
        <h1 className="text-2xl font-black italic tracking-tighter">⛳ ANSIS CADDIE</h1>
      </div>

      <div className="bg-white/80 backdrop-blur-md shadow-sm flex sticky top-[76px] z-20 mx-4 mt-[-20px] rounded-2xl border border-gray-100 p-1">
        {['play', 'clubs', 'course'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-black uppercase text-[10px] tracking-[0.2em] transition-all rounded-xl ${
              activeTab === tab ? 'text-white bg-green-700 shadow-md' : 'text-gray-400'
            }`}
          >
            {tab === 'play' ? 'Spela' : tab === 'clubs' ? 'Klubbor' : 'Bana'}
          </button>
        ))}
      </div>

      <main className="p-4 max-w-md mx-auto pt-8">
        {activeTab === 'play' && <PlayTab />}
        {activeTab === 'clubs' && <ClubsTab />}
        {activeTab === 'course' && <CourseTab />}
      </main>
    </div>
  );
};

ReactDOM.render(<AnsisApp />, document.getElementById('root'));
