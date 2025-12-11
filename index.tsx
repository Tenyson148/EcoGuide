import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Car, Droplets, Zap, ShoppingBag, Trash2, Utensils, Home, Plane, Calendar, Bot, TrendingUp, Activity } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [hoveredWidget, setHoveredWidget] = useState(null);

  // Sample data for charts
  const dailyActivityData = [
    { day: '17', value: 65 },
    { day: '18', value: 70 },
    { day: '19', value: 68 },
    { day: '20', value: 72 },
    { day: '21', value: 75 },
    { day: '22', value: 80 },
    { day: '23', value: 77 },
    { day: '24', value: 85 }
  ];

  const nutritionData = [
    { name: 'Protein', value: 30, color: '#3B82F6' },
    { name: 'Carbs', value: 117, color: '#EC4899' },
    { name: 'Fat', value: 18, color: '#10B981' }
  ];

  const carbonEmissionData = [
    { category: 'Transport', value: 45 },
    { category: 'Energy', value: 30 },
    { category: 'Water', value: 15 },
    { category: 'Waste', value: 10 }
  ];

  const weeklyTrend = [
    { day: 'Mon', carbon: 12, steps: 4200 },
    { day: 'Tue', carbon: 15, steps: 5100 },
    { day: 'Wed', carbon: 10, steps: 6800 },
    { day: 'Thu', carbon: 18, steps: 4500 },
    { day: 'Fri', carbon: 14, steps: 7200 },
    { day: 'Sat', carbon: 8, steps: 8900 },
    { day: 'Sun', carbon: 11, steps: 4800 }
  ];

  const Widget = ({ title, icon: Icon, children, category }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      onMouseEnter={() => setHoveredWidget(category)}
      onMouseLeave={() => setHoveredWidget(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          {hoveredWidget === category && (
            <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm flex items-center gap-1 animate-fade-in">
              <Bot className="w-4 h-4" />
              AI Assist
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthTrack
            </h1>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('daily')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'daily'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Daily Logs
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'monthly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Monthly Logs
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              AI Assistant
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800">Your Impact</p>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              -24% CO₂
            </p>
            <p className="text-xs text-gray-600 mt-1">vs last month</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Hi, Akash.
          </h2>
          <p className="text-gray-600">Check your Health & Carbon Footprint!</p>
        </div>

        {/* Daily Logs Tab */}
        {activeTab === 'daily' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              <Widget title="Daily Steps" icon={Activity} category="steps">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-gray-800">4,800</p>
                    <p className="text-sm text-gray-500 mt-1">48% of goal</p>
                  </div>
                  <div className="text-6xl">👟</div>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[48%] bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                </div>
              </Widget>

              <Widget title="Calories Burned" icon={TrendingUp} category="calories">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-gray-800">748</p>
                    <p className="text-sm text-gray-500 mt-1">Cal</p>
                  </div>
                  <div className="w-24 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutritionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          dataKey="value"
                        >
                          {nutritionData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Widget>

              <Widget title="Carbon Footprint" icon={Activity} category="carbon">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-gray-800">11.2</p>
                    <p className="text-sm text-gray-500 mt-1">kg CO₂ today</p>
                  </div>
                  <div className="text-5xl">🌍</div>
                </div>
                <div className="mt-4 flex gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gray-200 rounded-full h-16 flex items-end overflow-hidden">
                        <div 
                          className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-full"
                          style={{ height: `${weeklyTrend[i].carbon * 4}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{day.slice(0, 1)}</span>
                    </div>
                  ))}
                </div>
              </Widget>
            </div>

            {/* Activity Chart */}
            <Widget title="Weekly Activity" icon={Activity} category="activity">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 4 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Widget>

            {/* Daily Inputs Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Widget title="Transportation" icon={Car} category="transport">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Car Travel</span>
                    <span className="font-semibold text-gray-800">12 km</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Public Transport</span>
                    <span className="font-semibold text-gray-800">8 km</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CO₂ Impact</span>
                      <span className="font-bold text-orange-600">5.4 kg</span>
                    </div>
                  </div>
                </div>
              </Widget>

              <Widget title="Water Usage" icon={Droplets} category="water">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Showers</span>
                    <span className="font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Laundry</span>
                    <span className="font-semibold text-blue-600">Yes</span>
                  </div>
                  <div className="mt-4">
                    <ResponsiveContainer width="100%" height={80}>
                      <BarChart data={[{name: 'Usage', value: 145}]}>
                        <Bar dataKey="value" fill="url(#waterGradient)" radius={[8, 8, 0, 0]} />
                        <defs>
                          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#93C5FD" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-gray-600 mt-2">145 liters today</p>
                  </div>
                </div>
              </Widget>

              <Widget title="Energy Usage" icon={Zap} category="energy">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                    <span className="text-sm text-gray-600">AC Usage</span>
                    <span className="font-semibold text-yellow-600">3.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                    <span className="text-sm text-gray-600">Lights/Fans</span>
                    <span className="font-semibold text-yellow-600">6 hrs</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">Est. kWh:</span>
                      <span className="font-bold text-yellow-600">4.2</span>
                    </div>
                  </div>
                </div>
              </Widget>

              <Widget title="Food Waste" icon={Utensils} category="food">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                    <span className="text-sm text-gray-600">Food Thrown Away</span>
                    <span className="font-semibold text-red-600">No</span>
                  </div>
                  <div className="flex justify-center mt-6">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-3">
                        <span className="text-4xl">✅</span>
                      </div>
                      <p className="text-sm font-medium text-green-700">Zero Waste Today!</p>
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
        )}

        {/* Monthly Logs Tab */}
        {activeTab === 'monthly' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-6">
              <Widget title="Monthly Carbon Emissions" icon={TrendingUp} category="monthly-carbon">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={carbonEmissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Widget>

              <Widget title="Household Info" icon={Home} category="household">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Household Size</span>
                    <span className="font-semibold text-gray-800">4 people</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Home Type</span>
                    <span className="font-semibold text-gray-800">Apartment</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Total Electricity</span>
                    <span className="font-semibold text-gray-800">342 kWh</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Total Water</span>
                    <span className="font-semibold text-gray-800">4,200 L</span>
                  </div>
                </div>
              </Widget>

              <Widget title="Waste Management" icon={Trash2} category="waste">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Total Waste</span>
                    <span className="font-semibold text-gray-800">45 kg</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="text-sm text-gray-600">Recyclable</span>
                    <span className="font-semibold text-green-600">28 kg (62%)</span>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[62%] bg-gradient-to-r from-green-400 to-green-600"></div>
                    </div>
                  </div>
                </div>
              </Widget>

              <Widget title="Travel Summary" icon={Plane} category="travel">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Car</span>
                    </div>
                    <span className="font-semibold text-gray-800">340 km</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Train</span>
                    </div>
                    <span className="font-semibold text-gray-800">120 km</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Flight</span>
                    </div>
                    <span className="font-semibold text-gray-800">0 km</span>
                  </div>
                </div>
              </Widget>

              <Widget title="Monthly Purchases" icon={ShoppingBag} category="purchases">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl">
                    <span className="text-sm text-gray-600">Essential</span>
                    <span className="font-semibold text-indigo-600">₹12,450</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-pink-50 rounded-xl">
                    <span className="text-sm text-gray-600">Non-Essential</span>
                    <span className="font-semibold text-pink-600">₹5,200</span>
                  </div>
                  <div className="mt-4">
                    <ResponsiveContainer width="100%" height={100}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Essential', value: 12450, color: '#6366F1' },
                            { name: 'Non-Essential', value: 5200, color: '#EC4899' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          dataKey="value"
                        >
                          <Cell fill="#6366F1" />
                          <Cell fill="#EC4899" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="animate-fade-in">
            <Widget title="AI Assistant" icon={Bot} category="ai">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                  <Bot className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Assistant Coming Soon</h3>
                  <p className="text-gray-600">
                    Your personal AI health and sustainability coach will help you:
                  </p>
                  <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Track and input daily activities automatically</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Get personalized sustainability tips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Analyze your carbon footprint patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Receive health and fitness recommendations</span>
                    </li>
                  </ul>
                  <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                    Backend Integration Pending
                  </button>
                </div>
              </div>
            </Widget>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;