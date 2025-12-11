import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Home, Trash2, Plane, ShoppingBag } from 'lucide-react';
import Widget from './Widget.jsx';

const MonthlyLogs = ({ dailyData, monthlyData }) => {
  return (
    <div className="space-y-8 p-6">
      <div className="content-grid grid-2">
        <Widget title="Monthly Carbon Emissions" icon={TrendingUp} category="monthly-carbon">
          <div className="chart-container large">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData.carbonEmissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} animationDuration={0} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>

        <Widget title="Household Info" icon={Home} category="household">
          <div className="space-y-4">
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)', border: '1px solid rgba(0, 212, 255, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Household Size</span>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.householdInfo.householdSize}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)', border: '1px solid rgba(0, 212, 255, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Home Type</span>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.householdInfo.homeType}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)', border: '1px solid rgba(0, 212, 255, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Total Electricity</span>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.householdInfo.totalElectricity}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)', border: '1px solid rgba(0, 212, 255, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Total Water</span>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.householdInfo.totalWater}</span>
              </div>
            </div>
          </div>
        </Widget>

        <Widget title="Waste Management" icon={Trash2} category="waste">
          <div className="space-y-4">
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Total Waste</span>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.wasteManagement.totalWaste}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Recyclable</span>
                <span className="font-semibold" style={{color: '#4ade80'}}>{monthlyData.wasteManagement.recyclable}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[62%]" style={{background: 'linear-gradient(to right, #4ade80, #16a34a)'}}></div>
              </div>
            </div>
          </div>
        </Widget>

        <Widget title="Travel Summary" icon={Plane} category="travel">
          <div className="space-y-4">
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)', border: '1px solid rgba(0, 123, 255, 0.3)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="text-sm" style={{color: '#cccccc'}}>Car</span>
                </div>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.travelSummary.car}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', border: '1px solid rgba(20, 184, 166, 0.3)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span className="text-sm" style={{color: '#cccccc'}}>Train</span>
                </div>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.travelSummary.train}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                  <span className="text-sm" style={{color: '#cccccc'}}>Flight</span>
                </div>
                <span className="font-semibold" style={{color: '#ffffff'}}>{monthlyData.travelSummary.flight}</span>
              </div>
            </div>
          </div>
        </Widget>

        <Widget title="Monthly Purchases" icon={ShoppingBag} category="purchases">
          <div className="space-y-4">
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Essential</span>
                <span className="font-semibold" style={{color: '#a78bfa'}}>{monthlyData.monthlyPurchases.essential}</span>
              </div>
            </div>
            <div className="input-card">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)', border: '1px solid rgba(236, 72, 153, 0.3)'}}>
                <span className="text-sm" style={{color: '#cccccc'}}>Non-Essential</span>
                <span className="font-semibold" style={{color: '#f472b6'}}>{monthlyData.monthlyPurchases.nonEssential}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="chart-container tiny">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Essential', value: monthlyData.monthlyPurchases.essentialValue, color: '#6366F1' },
                        { name: 'Non-Essential', value: monthlyData.monthlyPurchases.nonEssentialValue, color: '#EC4899' }
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
          </div>
        </Widget>
      </div>

      {/* Additional Charts Row */}
      <div className="content-grid grid-2">
        <Widget title="Carbon Trend" icon={TrendingUp} category="carbon-trend">
          <div className="chart-container large">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData.dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    color: '#F9FAFB'
                  }}
                  labelFormatter={(label) => `Day ${label}`}
                  formatter={(value) => [value, 'Activity Level']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00D4FF"
                  strokeWidth={3}
                  dot={{ fill: '#00D4FF', r: 3 }}
                  activeDot={{ r: 5, stroke: '#00D4FF', strokeWidth: 2, fill: '#1F2937' }}
                  animationDuration={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Widget>

        <Widget title="Waste Breakdown" icon={Trash2} category="waste-breakdown">
          <div className="chart-container large">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Recyclable', value: 62, color: '#4ECDC4' },
                    { name: 'Organic', value: 25, color: '#45B7D1' },
                    { name: 'Non-Recyclable', value: 13, color: '#FF6B6B' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#4ECDC4" />
                  <Cell fill="#45B7D1" />
                  <Cell fill="#FF6B6B" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      </div>

      {/* Travel and Purchases Charts */}
      <div className="content-grid grid-2">
        <Widget title="Travel Methods" icon={Plane} category="travel-methods">
          <div className="chart-container large">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { method: 'Car', emissions: monthlyData.travelSummary.carValue, color: '#00D4FF' },
                { method: 'Train', emissions: monthlyData.travelSummary.trainValue, color: '#4ECDC4' },
                { method: 'Flight', emissions: monthlyData.travelSummary.flightValue, color: '#FF6B6B' }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="method" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="emissions" radius={[8, 8, 0, 0]} animationDuration={0}>
                  <Cell fill="#00D4FF" />
                  <Cell fill="#4ECDC4" />
                  <Cell fill="#FF6B6B" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>

        <Widget title="Purchase Impact" icon={ShoppingBag} category="purchase-impact">
          <div className="chart-container large">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: 'Essential', impact: monthlyData.monthlyPurchases.essentialValue, color: '#6366F1' },
                { category: 'Non-Essential', impact: monthlyData.monthlyPurchases.nonEssentialValue, color: '#EC4899' }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="impact" radius={[8, 8, 0, 0]} animationDuration={0}>
                  <Cell fill="#6366F1" />
                  <Cell fill="#EC4899" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default MonthlyLogs;