const { useState, useEffect } = React;

// SVG Icons
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Plus = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Trash2 = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const Target = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const TrendingUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const AnsisApp = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'play');
  
  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('clubs');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Driver', distance: 230 },
      { id: 2, name: 'Trä 3', distance: 210 },
      { id: 3, name: 'Hybrid 4', distance: 190 },
      { id: 4, name: 'Järn 5', distance: 170 },
      { id: 5, name: 'Järn 6', distance: 155 },
      { id: 6, name: 'Järn 7', distance: 140 },
      { id: 7, name: 'Järn 8', distance: 125 },
      { id: 8, name: 'Järn 9', distance: 110 },
      { id: 9, name: 'Pitching Wedge', distance: 95 },
      { id: 10, name: 'Gap Wedge', distance: 80 },
      { id: 11, name: 'Sand Wedge', distance: 65 },
      { id: 12, name: 'Lob Wedge', distance: 50 },
      { id: 13, name: 'Putter', distance: 0 },
    ];
  });

  const [holes, setHoles] = useState(() => {
    const saved = localStorage.getItem('holes');
    return saved ? JSON.parse(saved) : [
      { number: 1, flagLat: 59.3293, flagLon: 18.0686, par: 4 },
      { number: 2, flagLat: 59.3303, flagLon: 18.0696, par: 3 },
      { number: 3, flagLat: 59.3313, flagLon: 18.0706, par: 5 },
      { number: 4, flagLat: 59.3323, flagLon: 18.0716, par: 4 },
      { number: 5, flagLat: 59.3333, flagLon: 18.0726, par: 4 },
      { number: 6, flagLat: 59.3343, flagLon: 18.0736, par: 3 },
      { number: 7, flagLat: 59.3353, flagLon: 18.0746, par: 5 },
      { number: 8, flagLat: 59.3363, flagLon: 18.0756, par: 4 },
      { number: 9, flagLat: 59.3373, flagLon: 18.0766, par: 4 },
      { number: 10, flagLat: 59.3383, flagLon: 18.0776, par: 4 },
      { number: 11, flagLat: 59.3393, flagLon: 18.0786, par: 3 },
      { number: 12, flagLat: 59.3403, flagLon: 18.0796, par: 5 },
      { number: 13, flagLat: 59.3413, flagLon: 18.0806, par: 4 },
      { number: 14, flagLat: 59.3423, flagLon: 18.0816, par: 4 },
      { number: 15, flagLat: 59.3433, flagLon: 18.0826, par: 3 },
      { number: 16, flagLat: 59.3443, flagLon: 18.0836, par: 4 },
      { number: 17, flagLat: 59.3453, flagLon: 18.0846, par: 4 },
      { number: 18, flagLat: 59.3463, flagLon: 18.0856, par: 5 },
    ];
  });

  const [currentHole, setCurrentHole] = useState(() => {
    const saved = localStorage.getItem('currentHole');
    return saved ? parseInt(saved) : 1;
  });
  
  const [userPosition, setUserPosition] = useState({ lat: 59.3283, lon: 18.0676 });
  const [flagAdjustment, setFlagAdjustment] = useState({ distance: 0, lateral: 0 });
  
  const [weather, setWeather] = useState({
    windSpeed: 8,
    windDirection: 270,
    temperature: 15,
    loading: false,
    lastUpdate: null,
    manualOverride: false
  });
  
  const [autoResetTimer, setAutoResetTimer] = useState(null);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Save to localStorage
  useEffect(() => { localStorage.setItem('clubs', JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem('holes', JSON.stringify(holes)); }, [holes]);
  useEffect(() => { localStorage.setItem('currentHole', currentHole.toString()); }, [currentHole]);
  useEffect(() => { localStorage.setItem('activeTab', activeTab); }, [activeTab]);

  // Online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Real GPS
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setGpsEnabled(true);
        },
        (error) => {
          console.log("GPS ej tillgänglig");
          setGpsEnabled(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    if (!isOnline) {
      console.log('Offline - kan ej hämta väder');
      return;
    }
    
    setWeather(prev => ({ ...prev, loading: true }));
    
    try {
      const API_KEY = '99d688898682ba4fc727529cd0fbd7ac';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather(prev => ({
          ...prev,
          windSpeed: Math.round(data.wind.speed),
          windDirection: data.wind.deg || 0,
          temperature: Math.round(data.main.temp),
          loading: false,
          lastUpdate: new Date(),
          manualOverride: false
        }));
      } else {
        setWeather(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Väderfel:', error);
      setWeather(prev => ({ ...prev, loading: false }));
    }
  };

  const handleManualWeatherChange = (field, value) => {
    if (autoResetTimer) {
      clearTimeout(autoResetTimer);
    }
    
    setWeather(prev => ({ ...prev, [field]: value, manualOverride: true }));
    
    const timer = setTimeout(() => {
      fetchWeatherData(userPosition.lat, userPosition.lon);
    }, 20000);
    
    setAutoResetTimer(timer);
  };

  useEffect(() => {
    if (!weather.manualOverride && gpsEnabled && isOnline) {
      fetchWeatherData(userPosition.lat, userPosition.lon);
      
      const weatherInterval = setInterval(() => {
        if (!weather.manualOverride) {
          fetchWeatherData(userPosition.lat, userPosition.lon);
        }
      }, 600000);
      
      return () => clearInterval(weatherInterval);
    }
  }, [userPosition.lat, userPosition.lon, weather.manualOverride, gpsEnabled, isOnline]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360;
  };

  const getWindAdjustment = (distance, windSpeed, windDirection, targetBearing) => {
    const windAngle = Math.abs(windDirection - targetBearing);
    const headwind = Math.cos((windAngle * Math.PI) / 180) * windSpeed;
    const crosswind = Math.sin((windAngle * Math.PI) / 180) * windSpeed;
    
    const distanceAdjustment = Math.round(headwind * 1.5);
    const lateralAdjustment = Math.round(crosswind * 2);
    
    return { distanceAdjustment, lateralAdjustment, crosswind };
  };

  const getTempAdjustment = (temperature) => {
    const baseTemp = 20;
    const tempDiff = temperature - baseTemp;
    return Math.round(tempDiff * 0.5);
  };

  const recommendClub = (distanceToFlag) => {
    const hole = holes.find(h => h.number === currentHole);
    const adjustedFlagLat = hole.flagLat + (flagAdjustment.distance * 0.00009);
    const adjustedFlagLon = hole.flagLon + (flagAdjustment.lateral * 0.00009);
    
    const bearing = calculateBearing(
      userPosition.lat, userPosition.lon,
      adjustedFlagLat, adjustedFlagLon
    );

    const windAdj = getWindAdjustment(distanceToFlag, weather.windSpeed, weather.windDirection, bearing);
    const tempAdj = getTempAdjustment(weather.temperature);
    
    const adjustedDistance = distanceToFlag - windAdj.distanceAdjustment - tempAdj;

    const recommended = clubs
      .filter(club => club.distance > 0)
      .reduce((prev, curr) => 
        Math.abs(curr.distance - adjustedDistance) < Math.abs(prev.distance - adjustedDistance) 
          ? curr : prev
      );

    return { recommended, windAdj, tempAdj, adjustedDistance };
  };

  const getAimAdvice = (lateralAdjustment) => {
    if (Math.abs(lateralAdjustment) < 2) return 'Sikta rakt mot flaggan';
    if (lateralAdjustment > 0) return `Sikta ${Math.abs(lateralAdjustment)}m vänster om flaggan`;
    return `Sikta ${Math.abs(lateralAdjustment)}m höger om flaggan`;
  };

  const addClub = () => {
    const newId = Math.max(...clubs.map(c => c.id), 0) + 1;
    setClubs([...clubs, { id: newId, name: `Ny klubba ${newId}`, distance: 100 }]);
  };

  const updateClub = (id, field, value) => {
    setClubs(clubs.map(club => 
      club.id === id ? { ...club, [field]: value } : club
    ));
  };

  const deleteClub = (id) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  const addHole = () => {
    const newNumber = holes.length + 1;
    setHoles([...holes, {
      number: newNumber,
      flagLat: 59.3293 + (newNumber * 0.001),
      flagLon: 18.0686 + (newNumber * 0.001),
      par: 4
    }]);
  };

  const updateHole = (number, field, value) => {
    setHoles(holes.map(hole => 
      hole.number === number ? { ...hole, [field]: parseFloat(value) || value } : hole
    ));
  };

  const PlayTab = () => {
    const hole = holes.find(h => h.number === currentHole);
    if (!hole) return <div className="p-4">Inget hål valt</div>;

    const adjustedFlagLat = hole.flagLat + (flagAdjustment.distance * 0.00009);
    const adjustedFlagLon = hole.flagLon + (flagAdjustment.lateral * 0.00009);

    const distanceToFlag = calculateDistance(
      userPosition.lat, userPosition.lon,
      adjustedFlagLat, adjustedFlagLon
    );

    const bearing = calculateBearing(
      userPosition.lat, userPosition.lon,
      adjustedFlagLat, adjustedFlagLon
    );

    const { recommended, windAdj, tempAdj, adjustedDistance } = recommendClub(distanceToFlag);
    const aimAdvice = getAimAdvice(windAdj.lateralAdjustment);

    return (
      <div className="space-y-4 p-4">
        {!isOnline && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            <p className="text-sm text-yellow-800">📡 Offline-läge - väderdata uppdateras ej</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Hål {currentHole}/18</span>
            <span className="text-xs text-gray-500">Par {hole.par}</span>
          </div>
          <div className="grid grid-cols-9 gap-1">
            {holes.map(h => (
              <button
                key={h.number}
                onClick={() => setCurrentHole(h.number)}
                className={`px-2 py-2 rounded text-sm font-semibold ${
                  currentHole === h.number
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 active:bg-gray-300'
                }`}
              >
                {h.number}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} />
            <span className="text-sm opacity-90">Avstånd till flagga</span>
          </div>
          <div className="text-5xl font-bold mb-1">{distanceToFlag}m</div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Navigation size={16} style={{ transform: `rotate(${bearing}deg)` }} />
            <span>Riktning: {Math.round(bearing)}°</span>
          </div>
          {!gpsEnabled && (
            <div className="mt-2 text-xs bg-white/20 rounded p-2">
              ⚠️ GPS ej aktiverad
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Target size={18} className="text-green-600" />
            Flaggposition på green
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1 flex justify-between">
                <span>Djup (kortare ← → längre)</span>
                <span className="font-semibold">
                  {flagAdjustment.distance === 0 ? 'Mitten' : 
                   flagAdjustment.distance > 0 ? `${flagAdjustment.distance}m längre` : 
                   `${Math.abs(flagAdjustment.distance)}m kortare`}
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={flagAdjustment.distance}
                onChange={(e) => setFlagAdjustment({ ...flagAdjustment, distance: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1 flex justify-between">
                <span>Sidled (vänster ← → höger)</span>
                <span className="font-semibold">
                  {flagAdjustment.lateral === 0 ? 'Mitten' : 
                   flagAdjustment.lateral > 0 ? `${flagAdjustment.lateral}m höger` : 
                   `${Math.abs(flagAdjustment.lateral)}m vänster`}
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={flagAdjustment.lateral}
                onChange={(e) => setFlagAdjustment({ ...flagAdjustment, lateral: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            {(flagAdjustment.distance !== 0 || flagAdjustment.lateral !== 0) && (
              <button
                onClick={() => setFlagAdjustment({ distance: 0, lateral: 0 })}
                className="text-sm text-gray-600 underline"
              >
                Återställ till mitten
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Wind size={18} className="text-blue-600" />
              Väder
            </h3>
            <button
              onClick={() => fetchWeatherData(userPosition.lat, userPosition.lon)}
              disabled={weather.loading || !isOnline}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50 active:bg-blue-700"
            >
              {weather.loading ? '...' : '🔄'}
            </button>
          </div>
          
          {weather.lastUpdate && (
            <div className="text-xs text-gray-500 mb-2">
              {weather.lastUpdate.toLocaleTimeString('sv-SE')}
              {weather.manualOverride && <span className="ml-2 text-orange-600">● Återgår om 20s</span>}
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">Vind: {weather.windSpeed} m/s</div>
              <input
                type="range"
                min="0"
                max="20"
                value={weather.windSpeed}
                onChange={(e) => handleManualWeatherChange('windSpeed', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Riktning: {weather.windDirection}°</div>
              <input
                type="range"
                min="0"
                max="360"
                value={weather.windDirection}
                onChange={(e) => handleManualWeatherChange('windDirection', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Thermometer size={14} />
                Temp: {weather.temperature}°C
              </div>
              <input
                type="range"
                min="-10"
                max="35"
                value={weather.temperature}
                onChange={(e) => handleManualWeatherChange('temperature', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} />
            <span className="font-semibold">Rekommenderad klubba</span>
          </div>
          <div className="text-4xl font-bold mb-2">{recommended.name}</div>
          <div className="text-lg opacity-90 mb-4">({recommended.distance}m normalt)</div>
          
          <div className="space-y-2 text-sm bg-white/10 rounded p-3">
            <div className="flex justify-between">
              <span>Avstånd:</span>
              <span className="font-semibold">{distanceToFlag}m</span>
            </div>
            {windAdj.distanceAdjustment !== 0 && (
              <div className="flex justify-between">
                <span>Vind:</span>
                <span className="font-semibold">
                  {windAdj.distanceAdjustment > 0 ? '+' : ''}{windAdj.distanceAdjustment}m
                </span>
              </div>
            )}
            {tempAdj !== 0 && (
              <div className="flex justify-between">
                <span>Temp:</span>
                <span className="font-semibold">
                  {tempAdj > 0 ? '+' : ''}{tempAdj}m
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/20 pt-2">
              <span>Justerat:</span>
              <span className="font-bold">{adjustedDistance}m</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-orange-600" />
            <span className="font-semibold">Sikte</span>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-600 p-3 rounded">
            <p className="text-gray-800 font-medium">{aimAdvice}</p>
            {Math.abs(windAdj.crosswind) > 2 && (
              <p className="text-sm text-gray-600 mt-1">
                Sidovind: {Math.abs(Math.round(windAdj.crosswind))} m/s {windAdj.crosswind > 0 ? 'från vänster' : 'från höger'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ClubsTab = () => (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Klubbor ({clubs.length}/13)</h2>
        {clubs.length < 13 && (
          <button
            onClick={addClub}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 active:bg-green-700"
          >
            <Plus size={18} />
            Lägg till
          </button>
        )}
      </div>
      
      {clubs.map((club) => (
        <div key={club.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={club.name}
                onChange={(e) => updateClub(club.id, 'name', e.target.value)}
                className="w-full font-semibold mb-2 px-2 py-1 border rounded"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={club.distance}
                  onChange={(e) => updateClub(club.id, 'distance', parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border rounded"
                  min="0"
                />
                <span className="text-gray-600">meter</span>
              </div>
            </div>
            <button
              onClick={() => deleteClub(club.id)}
              className="text-red-600 p-2 active:bg-red-50 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const CourseTab = () => (
    <div className="p-4 space-y-3 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Banans hål</h2>
        <button
          onClick={addHole}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 active:bg-green-700"
        >
          <Plus size={18} />
          Lägg till
        </button>
      </div>
      
      {holes.map((hole) => (
        <div key={hole.number} className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-3 text-lg">Hål {hole.number}</div>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-600">Par</label>
              <input
                type="number"
                value={hole.par}
                onChange={(e) => updateHole(hole.number, 'par', parseInt(e.target.value))}
                className="w-full px-2 py-1 border rounded"
                min="3"
                max="5"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={hole.flagLat}
                onChange={(e) => updateHole(hole.number, 'flagLat', e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={hole.flagLon}
                onChange={(e) => updateHole(hole.number, 'flagLon', e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      <div className="bg-green-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold">⛳ Ansis appen</h1>
        <p className="text-sm opacity-90">Din smarta golfpartner</p>
      </div>

      <div className="bg-white shadow flex sticky top-16 z-10">
        <button
          onClick={() => setActiveTab('play')}
          className={`flex-1 py-3 font-semibold ${
            activeTab === 'play' 
              ? 'text-green-700 border-b-2 border-green-700' 
              : 'text-gray-500'
          }`}
        >
          Spela
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className={`flex-1 py-3 font-semibold ${
            activeTab === 'clubs' 
              ? 'text-green-700 border-b-2 border-green-700' 
              : 'text-gray-500'
          }`}
        >
          Klubbor
        </button>
        <button
          onClick={() => setActiveTab('course')}
          className={`flex-1 py-3 font-semibold ${
            activeTab === 'course' 
              ? 'text-green-700 border-b-2 border-green-700' 
              : 'text-gray-500'
          }`}
        >
          Bana
        </button>
      </div>

      <div className="pb-6">
        {activeTab === 'play' && <PlayTab />}
        {activeTab === 'clubs' && <ClubsTab />}
        {activeTab === 'course' && <CourseTab />}
      </div>
    </div>
  );
};

ReactDOM.render(<AnsisApp />, document.getElementById('root'));
