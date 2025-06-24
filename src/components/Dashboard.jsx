import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  // Portfolio data with more realistic property values
  const portfolioData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1600000, 1650000, 1700000, 1750000],
        borderColor: '#4CAF50',
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
          gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#4CAF50',
        hoverBackgroundColor: '#81C784',
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#4CAF50',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return `Value: $${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          callback: (value) => `$${(value / 1000000).toFixed(1)}M`,
          font: {
            size: 11,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  const recentActivities = [
    { activity: 'Purchased luxury apartment in New York', timestamp: '2025-06-20', icon: 'fa-building', amount: '$1,250,000' },
    { activity: 'Sold commercial property in Los Angeles', timestamp: '2025-06-18', icon: 'fa-file-contract', amount: '$850,000' },
    { activity: 'Received monthly income from rentals', timestamp: '2025-06-15', icon: 'fa-money-bill-wave', amount: '$25,600' },
    { activity: 'Updated portfolio details', timestamp: '2025-06-10', icon: 'fa-sync', amount: '' },
    { activity: 'Added new property in Miami', timestamp: '2025-06-05', icon: 'fa-plus-circle', amount: '$950,000' },
  ];

  const propertyTypes = [
    { type: 'Residential', value: 65, color: '#4CAF50' },
    { type: 'Commercial', value: 20, color: '#2196F3' },
    { type: 'Industrial', value: 10, color: '#FFC107' },
    { type: 'Land', value: 5, color: '#9C27B0' },
  ];

  const portfolioDistribution = [
    { location: 'New York', value: 35, properties: 8 },
    { location: 'California', value: 25, properties: 6 },
    { location: 'Florida', value: 15, properties: 4 },
    { location: 'Texas', value: 10, properties: 3 },
    { location: 'Other', value: 15, properties: 4 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-2 text-dark-5 dark:bg-[#020D1A] dark:text-dark-6 relative">
      <div className="absolute top-4 right-4 bg-warning  text-base font-bold px-3 py-1 mb-4 rounded">Coming Soon</div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Property Portfolio Dashboard
            </h1>
            <p className="text-dark-5 dark:text-dark-6 mt-2 text-lg">Manage your real estate investments with ease</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-search text-dark-5 dark:text-dark-6"></i>
              </div>
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-surface border border-stroke text-dark-5 dark:bg-surface-dark dark:text-dark-6 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Portfolio Value */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-lg">
                <i className="fas fa-building text-2xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-dark-5 dark:text-dark-6 text-sm">Total Portfolio Value</h3>
                <p className="text-3xl font-bold mt-1">$1.75M</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-success text-sm flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 8.3%
              </span>
              <span className="text-dark-5 dark:text-dark-6 text-sm ml-2">vs last month</span>
            </div>
          </div>

          {/* FCI Balance */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative">
            {/* <div className="absolute top-2 right-2 bg-warning text-black text-xs font-bold px-2 py-1 rounded">Coming Soon</div> */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-lg">
                <i className="fas fa-piggy-bank text-2xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-dark-5 dark:text-dark-6 text-sm">FCI Balance</h3>
                <p className="text-3xl font-bold mt-1">$0</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Available</span>
                <span>$0</span>
              </div>
              <div className="w-full bg-stroke rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg">
                <i className="fas fa-money-bill-wave text-2xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-dark-5 dark:text-dark-6 text-sm">Monthly Income</h3>
                <p className="text-3xl font-bold mt-1">$25,600</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-success text-sm flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 12.5%
              </span>
              <span className="text-dark-5 dark:text-dark-6 text-sm ml-2">vs last month</span>
            </div>
          </div>

          {/* Average Yield */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-lg">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-dark-5 dark:text-dark-6 text-sm">Average Yield</h3>
                <p className="text-3xl font-bold mt-1">8.2%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-success text-sm flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 1.2%
              </span>
              <span className="text-dark-5 dark:text-dark-6 text-sm ml-2">vs last quarter</span>
            </div>
          </div>
        </div>

        {/* Charts and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Value Chart */}
          <div className="bg-surface custom-border lg:col-span-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Portfolio Value</h2>
              <div className="flex space-x-2">
                <button className="tab-button">1M</button>
                <button className="tab-button active">6M</button>
                <button className="tab-button">1Y</button>
                <button className="tab-button">All</button>
              </div>
            </div>
            <div className="h-80">
              <Line data={portfolioData} options={chartOptions} />
            </div>
          </div>
          
          {/* Portfolio Distribution */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-6">Portfolio Distribution</h2>
            <div className="space-y-5">
              {portfolioDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.location}</span>
                    <span>{item.value}% • {item.properties} properties</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{
                        width: `${item.value}%`,
                        background: index === 0 ? 
                          'linear-gradient(90deg, #4CAF50, #8BC34A)' : 
                          index === 1 ? 
                          'linear-gradient(90deg, #2196F3, #03A9F4)' : 
                          index === 2 ? 
                          'linear-gradient(90deg, #FFC107, #FF9800)' : 
                          index === 3 ? 
                          'linear-gradient(90deg, #9C27B0, #673AB7)' : 
                          'linear-gradient(90deg, #607D8B, #9E9E9E)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-md font-semibold mb-4">Property Types</h3>
              <div className="flex justify-between">
                {propertyTypes.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#333"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="3"
                          strokeDasharray={`${item.value}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {item.value}%
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="bg-surface custom-border lg:col-span-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start p-4 bg-surface rounded-lg custom-border hover:bg-hover transition-all">
                  <div className="bg-hover p-3 rounded-lg mr-4">
                    <i className={`fas ${activity.icon} text-lg ${activity.amount ? 'text-success' : 'text-info'}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-lg">{activity.activity}</p>
                    <p className="text-sm text-muted mt-1">{activity.timestamp}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="font-semibold text-lg">{activity.amount}</p>}
                    <div className="mt-2">
                      <button className="text-xs bg-hover hover:bg-hover-dark px-3 py-1 rounded">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-surface custom-border p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="quick-action-button w-[250px]">
                <i className="fas fa-plus text-1xl mb-2"></i>
                <span>Add Property</span>
              </button>
              <button className="quick-action-button">
                <i className="fas fa-chart-pie text-1xl mb-2"></i>
                <span>View Reports</span>
              </button>
              <button className="quick-action-button">
                <i className="fas fa-cog text-2xl mb-2"></i>
                <span>Manage Portfolio</span>
              </button>
              <button className="quick-action-button">
                <i className="fas fa-sliders-h text-2xl mb-2"></i>
                <span>Settings</span>
              </button>
            </div>
            <div className="mt-8">
              <h3 className="text-md font-semibold mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-surface rounded-lg custom-border">
                  <div className="bg-info p-2 rounded-lg mr-3">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <div>
                    <p className="text-sm">Renew lease for NY property</p>
                    <p className="text-xs text-muted">Due: 2025-07-10</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-surface rounded-lg custom-border">
                  <div className="bg-warning p-2 rounded-lg mr-3">
                    <i className="fas fa-tools"></i>
                  </div>
                  <div>
                    <p className="text-sm">Schedule maintenance for Miami villa</p>
                    <p className="text-xs text-muted">Due: 2025-07-15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;