import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Car, Droplets, Zap, Utensils } from 'lucide-react';
import Widget from './Widget.jsx';

const DailyLogs = ({ dailyData, userData }) => {
  return (
    <div className="space-y-12 animate-fade-in p-6">
      {/* Top Stats Row */}
      <div className="content-grid grid-3">
        <div className="animate-stagger-1">
          <Widget title="Daily Steps" icon={Activity} category="steps">
          <div className="stats-card">
            <div className="stats-info">
              <p className="stats-value">{userData.dailyStats.steps.current.toLocaleString()}</p>
              <p className="stats-label">{userData.dailyStats.steps.percentage}% of goal</p>
            </div>
            <div className="stats-emoji">{userData.dailyStats.steps.emoji}</div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${userData.dailyStats.steps.percentage}%` }}
            ></div>
          </div>
        </Widget>
        </div>

        <div className="animate-stagger-2">
          <Widget title="Calories Burned" icon={TrendingUp} category="calories">
          <div className="stats-card">
            <div className="stats-info">
              <p className="stats-value">{userData.dailyStats.calories.burned}</p>
              <p className="stats-label">{userData.dailyStats.calories.unit}</p>
            </div>
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dailyData.nutritionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    dataKey="value"
                  >
                    {dailyData.nutritionData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Widget>
        </div>

        <div className="animate-stagger-3">
          <Widget title="Carbon Footprint" icon={Activity} category="carbon">
          <div className="stats-card">
            <div className="stats-info">
              <p className="stats-value">{userData.dailyStats.carbonFootprint.today}</p>
              <p className="stats-label">{userData.dailyStats.carbonFootprint.unit}</p>
            </div>
            <div className="stats-emoji">{userData.dailyStats.carbonFootprint.emoji}</div>
          </div>
          <div className="mt-4 flex gap-2">
            {dailyData.weeklyTrend.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-200 rounded-full h-16 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-full"
                    style={{ height: `${day.carbon * 4}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{day.day.slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </Widget>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="animate-scale-in">
        <Widget title="Weekly Activity" icon={Activity} category="activity">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData.dailyActivityData}>
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
        </div>
      </Widget>
      </div>

      {/* Daily Inputs Grid */}
      <div className="content-grid grid-2">
        <div className="animate-slide-in-left">
          <Widget title="Transportation" icon={Car} category="transport">
          <div className="space-y-4">
            <div className="input-card transport">
              <div className="flex justify-between items-center">
                <span className="input-label">Car Travel</span>
                <span className="input-value">{userData.dailyInputs.transportation.carTravel}</span>
              </div>
            </div>
            <div className="input-card transport">
              <div className="flex justify-between items-center">
                <span className="input-label">Public Transport</span>
                <span className="input-value">{userData.dailyInputs.transportation.publicTransport}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">CO₂ Impact</span>
                <span className="font-bold text-orange-600">{userData.dailyInputs.transportation.co2Impact}</span>
              </div>
            </div>
          </div>
        </Widget>
        </div>

        <div className="animate-slide-in-right">
          <Widget title="Water Usage" icon={Droplets} category="water">
          <div className="space-y-4">
            <div className="input-card water">
              <div className="flex justify-between items-center">
                <span className="input-label">Showers</span>
                <span className="input-value">{userData.dailyInputs.waterUsage.showers}</span>
              </div>
            </div>
            <div className="input-card water">
              <div className="flex justify-between items-center">
                <span className="input-label">Laundry</span>
                <span className="input-value">{userData.dailyInputs.waterUsage.laundry}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="chart-container small">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{name: 'Usage', value: userData.dailyInputs.waterUsage.totalLiters}]}>
                    <Bar dataKey="value" fill="url(#waterGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#93C5FD" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-gray-600 mt-2">{userData.dailyInputs.waterUsage.totalLiters} liters today</p>
              </div>
            </div>
          </div>
        </Widget>
        </div>

        <div className="animate-slide-in-left">
          <Widget title="Energy Usage" icon={Zap} category="energy">
          <div className="space-y-4">
            <div className="input-card energy">
              <div className="flex justify-between items-center">
                <span className="input-label">AC Usage</span>
                <span className="input-value">{userData.dailyInputs.energyUsage.acUsage}</span>
              </div>
            </div>
            <div className="input-card energy">
              <div className="flex justify-between items-center">
                <span className="input-label">Lights/Fans</span>
                <span className="input-value">{userData.dailyInputs.energyUsage.lightsFans}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Est. kWh:</span>
                <span className="font-bold text-yellow-600">{userData.dailyInputs.energyUsage.estimatedKwh}</span>
              </div>
            </div>
          </div>
        </Widget>
        </div>

        <div className="animate-slide-in-right">
          <Widget title="Food Waste" icon={Utensils} category="food">
          <div className="space-y-4">
            <div className="input-card food">
              <div className="flex justify-between items-center">
                <span className="input-label">Food Thrown Away</span>
                <span className="input-value">{userData.dailyInputs.foodWaste.thrownAway}</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl">{userData.dailyInputs.foodWaste.emoji}</span>
                </div>
                <p className="text-sm font-medium text-green-700">{userData.dailyInputs.foodWaste.status}</p>
              </div>
            </div>
          </div>
        </Widget>
        </div>
      </div>
    </div>
  );
};

export default DailyLogs;