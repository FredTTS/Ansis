const { useState, useEffect } = React;

// --- DIN API NYCKEL ---
const WEATHER_API_KEY = "99d688898682ba4fc727529cd0fbd7ac";

const AnsisApp = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [weather, setWeather] = useState({ windSpeed: 0, windDirection: 0, temperature: 20 });
  const [currentHole, setCurrentHole] = useState(1);

  // Hämta väder
  const fetchWeather = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=59.3293&lon=18.0686&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await res.json();
      if (data && data.wind) {
        setWeather({
          windSpeed: Math.round(data.wind.speed),
          windDirection: data.wind.deg,
          temperature: Math.round(data.main.temp)
        });
      }
    } catch (e) {
      console.error("Väderfel:", e);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Uppdatera var 10:e minut
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 text-center shadow-lg rounded-b-[2rem]">
        <h1 className="text-2xl font-black italic">⛳ ANSIS CADDIE</h1>
        <div className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Live Väder Aktivt</div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mx-4 mt-[-20px] rounded-xl p-1 shadow-md border border-gray-100 relative z-10">
        <button onClick={() => setActiveTab('play')} className={`flex-1 py-3 text-[10px] font-black rounded-lg transition-all ${activeTab === 'play' ? 'bg-green-700 text-white' : 'text-gray-400'}`}>SPELA</button>
        <button onClick={() => setActiveTab('clubs')} className={`flex-1 py-3 text-[10px] font-black rounded-lg transition-all ${activeTab === 'clubs' ? 'bg-green-700 text-white' : 'text-gray-400'}`}>KLUBBOR</button>
      </div>

      <main className="p-4 max-w-md mx-auto pt-8">
        {activeTab === 'play' ? (
          <div className="space-y-4">
            {/* Väderkort */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center text-blue-600">
                <div className="text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase">Vind</div>
                  <div className="text-xl font-black">{weather.windSpeed} m/s</div>
                </div>
                <div className="text-4xl" style={{ transform: `rotate(${weather.windDirection}deg)`, display: 'inline-block' }}>⬆️</div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase">Temp</div>
                  <div className="text-xl font-black">{weather.temperature}°C</div>
                </div>
              </div>
            </div>

            {/* Avståndskort */}
            <div className="bg-green-800 text-white p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-8xl font-black tabular-nums">150</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Meter till flagga</div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[150px] opacity-10">🎯</div>
            </div>

            {/* Rekommendation */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-green-600 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-black text-green-700 uppercase">Rek. klubba</div>
                <div className="text-4xl font-black text-gray-800 italic">J7</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-blue-600 uppercase">Sikte</div>
                <div className="text-lg font-black text-gray-700">Mitten</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h2 className="font-black text-gray-800 mb-4 uppercase">Mina Klubbor</h2>
            <p className="text-gray-500 text-sm">Inställningar kommer här...</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Starta appen med säkerhetskontroll för React 18
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<AnsisApp />);
