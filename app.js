const { useState, useEffect } = React;

const WEATHER_API_KEY = "99d688898682ba4fc727529cd0fbd7ac";

const AnsisApp = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [weather, setWeather] = useState({ windSpeed: 0, windDirection: 0, temperature: 20 });
  
  const fetchWeather = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=59.32&lon=18.06&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await res.json();
      if (data && data.wind) {
        setWeather({
          windSpeed: Math.round(data.wind.speed),
          windDirection: data.wind.deg,
          temperature: Math.round(data.main.temp)
        });
      }
    } catch (e) { console.error("Väderfel:", e); }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-green-700 text-white p-6 text-center shadow-lg">
        <h1 className="text-2xl font-black italic">⛳ ANSIS CADDIE</h1>
      </div>
      
      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-green-600 text-center mb-4">
          <div className="text-sm font-black text-green-700 uppercase tracking-widest mb-2">Live Väder</div>
          <div className="flex justify-around items-center">
            <div>
              <div className="text-xs text-gray-400 font-bold uppercase">Vind</div>
              <div className="text-2xl font-black">{weather.windSpeed} m/s</div>
            </div>
            <div style={{ transform: `rotate(${weather.windDirection}deg)` }} className="text-3xl">⬆️</div>
            <div>
              <div className="text-xs text-gray-400 font-bold uppercase">Temp</div>
              <div className="text-2xl font-black">{weather.temperature}°C</div>
            </div>
          </div>
        </div>

        <div className="bg-green-800 text-white p-10 rounded-[2.5rem] text-center shadow-2xl mb-6">
          <div className="text-8xl font-black">150</div>
          <div className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Meter kvar</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setActiveTab('play')} className={`p-4 rounded-2xl font-black uppercase text-xs ${activeTab === 'play' ? 'bg-green-700 text-white' : 'bg-white text-gray-400'}`}>Spela</button>
            <button onClick={() => setActiveTab('clubs')} className={`p-4 rounded-2xl font-black uppercase text-xs ${activeTab === 'clubs' ? 'bg-green-700 text-white' : 'bg-white text-gray-400'}`}>Klubbor</button>
        </div>
      </div>
    </div>
  );
};

// Starta appen
const rootElement = document.getElementById('root');
ReactDOM.render(<AnsisApp />, rootElement);
