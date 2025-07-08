"use client";

import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('6M');
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Enhanced portfolio data with blockchain theme
  const portfolioData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1600000, 1650000, 1700000, 1750000],
        borderColor: '#00D4FF',
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointBackgroundColor: '#00D4FF',
        hoverBackgroundColor: '#00D4FF',
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const propertyTypeData = {
    labels: ['Residential', 'Commercial', 'Industrial', 'Land'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(0, 212, 255, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          '#00D4FF',
          '#9333EA',
          '#22C55E',
          '#FBBf24',
        ],
        borderWidth: 2,
      },
    ],
  };

  const regionalData = {
    labels: ['New York', 'California', 'Florida', 'Texas', 'Others'],
    datasets: [
      {
        label: 'Investment Value',
        data: [612500, 437500, 262500, 175000, 262500],
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        borderRadius: 8,
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
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#00D4FF',
        bodyColor: '#E2E8F0',
        borderColor: '#00D4FF',
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
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
          color: '#64748B',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748B',
          callback: (value) => `$${(value / 1000000).toFixed(1)}M`,
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  const recentActivities = [
    {
      activity: 'Smart Contract Executed - NYC Property',
      timestamp: '2025-06-20',
      icon: 'fa-shield-alt',
      amount: '$1,250,000',
      type: 'purchase',
      hash: '0x1a2b3c...'
    },
    {
      activity: 'Token Sale Completed - LA Commercial',
      timestamp: '2025-06-18',
      icon: 'fa-coins',
      amount: '$850,000',
      type: 'sale',
      hash: '0x4d5e6f...'
    },
    {
      activity: 'Rental Income Distributed',
      timestamp: '2025-06-15',
      icon: 'fa-money-bill-wave',
      amount: '$25,600',
      type: 'income',
      hash: '0x7g8h9i...'
    },
    {
      activity: 'Portfolio Rebalanced',
      timestamp: '2025-06-10',
      icon: 'fa-chart-line',
      amount: '',
      type: 'update',
      hash: '0xjklmno...'
    },
    {
      activity: 'New Asset Tokenized - Miami Villa',
      timestamp: '2025-06-05',
      icon: 'fa-plus-circle',
      amount: '$950,000',
      type: 'tokenize',
      hash: '0xpqrstu...'
    },
  ];

  const propertyTypes = [
    { type: 'Residential', value: 65, color: '#00D4FF' },
    { type: 'Commercial', value: 20, color: '#9333EA' },
    { type: 'Industrial', value: 10, color: '#22C55E' },
    { type: 'Land', value: 5, color: '#FBBF24' },
  ];

  const portfolioDistribution = [
    { location: 'New York', value: 35, properties: 8 },
    { location: 'California', value: 25, properties: 6 },
    { location: 'Florida', value: 15, properties: 4 },
    { location: 'Texas', value: 10, properties: 3 },
    { location: 'Other', value: 15, properties: 4 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className=" font-medium">Loading Blockchain Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden rounded-lg">
      {/* Animated Gradient Background */}
      <div className="absolute  z-0">
        <div className="w-full h-full  opacity-90"></div>
        {/* Extra glowing shapes for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96  rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64  rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48  rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-40  rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Enhanced Grid Pattern Overlay */}
      <div className="absolute  z-10 pointer-events-none">
        <div className="w-full h-full opacity-30"></div>
      </div>

      <div className="relative z-20 p-4 md:p-6 lg:p-8">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                {/* <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-building"></i>
                </div> */}
              </div>
              <h1 className="text-3xl   md:text-4xl lg:text-5xl font-extrabold">
                BlockEstate Dashboard
              </h1>
              <p className="mt-2 text-lg">Manage your tokenized real estate investments</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
              <button className="p-3 backdrop-blur-sm border rounded-xl hover:border-blue-500/50 transition-all relative">
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full"></span>
              </button>
              <button className="p-3 backdrop-blur-sm border rounded-xl hover:border-blue-500/50 transition-all">
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Portfolio Value */}
            <div className="relative  border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 group-hover:border-blue-400/50 transition-colors">
                    <i className="fas fa-building  text-xl"></i>
                  </div>
                  <div>
                    <p className=" text-sm font-medium">Total Portfolio Value</p>
                    <p className="text-2xl font-bold  mt-1">$1.75M</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm"></i>
                <span className="text-sm text-green-400">+8.3%</span>
                <span className="text-slate-500 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* FCI Balance */}
            <div className="relative  border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                Coming Soon
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30 group-hover:border-blue-400/50 transition-colors">
                    <i className="fas fa-piggy-bank  text-xl"></i>
                  </div>
                  <div>
                    <p className=" text-sm font-medium">FCI Balance</p>
                    <p className="text-2xl font-bold  mt-1">$0</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Available</span>
                  <span>$0</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Monthly Income */}
            <div className="relative  border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 group-hover:border-purple-400/50 transition-colors">
                    <i className="fas fa-money-bill-wave text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <p className=" text-sm font-medium">Monthly Income</p>
                    <p className="text-2xl font-bold  mt-1">$25,600</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm"></i>
                <span className="text-sm text-green-400">+12.5%</span>
                <span className="text-slate-500 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Average Yield */}
            <div className="relative  border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 group-hover:border-yellow-400/50 transition-colors">
                    <i className="fas fa-chart-line text-yellow-400 text-xl"></i>
                  </div>
                  <div>
                    <p className=" text-sm font-medium">Average Yield</p>
                    <p className="text-2xl font-bold  mt-1">8.2%</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm"></i>
                <span className="text-sm text-green-400">+1.2%</span>
                <span className="text-slate-500 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Portfolio Value Chart */}
            <div className="xl:col-span-2  border border-slate-700/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold ">Portfolio Performance</h2>
                <div className="flex rounded-xl p-1">
                  {['1M', '6M', '1Y', 'All'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setActiveTimeframe(period)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTimeframe === period
                        ? 'bg-blue-100 '
                        : ' '
                        }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <Line data={portfolioData} options={chartOptions} />
              </div>
            </div>

            {/* Property Distribution */}
            <div className=" border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold  mb-6">Asset Distribution</h2>
              <div className="h-64 mb-6">
                <Doughnut
                  data={propertyTypeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="space-y-3">
                {propertyTypes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className=" text-sm">{item.type}</span>
                    </div>
                    <span className=" font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2 border border-border rounded-2xl p-6   text-white">
              <h2 className="text-xl font-bold  mb-6">Regional Investment Distribution</h2>
              <div className="h-80">
                <Bar
                  data={regionalData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          color: '#64748B',
                        },
                      },
                      y: {
                        grid: {
                          color: 'rgba(100, 116, 139, 0.1)',
                        },
                        ticks: {
                          color: '#64748B',
                          callback: (value) => `$${(value / 1000).toFixed(0)}K`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl border border-border rounded-2xl p-6   text-white">
              <h2 className="text-xl font-bold  mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:bg-opacity-20 transition-all group">
                  <i className="fas fa-plus  group-hover:scale-110 transition-transform"></i>
                  <span className=" font-medium">Tokenize Asset</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:bg-opacity-20 transition-all group">
                  <i className="fas fa-chart-pie  group-hover:scale-110 transition-transform"></i>
                  <span className=" font-medium">View Reports</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:bg-opacity-20 transition-all group">
                  <i className="fas fa-chart-line  group-hover:scale-110 transition-transform"></i>
                  <span className=" font-medium">Portfolio Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl hover:bg-opacity-20 transition-all group">
                  <i className="fas fa-sliders-h  group-hover:scale-110 transition-transform"></i>
                  <span className=" font-medium">Manage Settings</span>
                </button>
              </div>

              {/* Blockchain Status */}
              <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-sm">Blockchain Status</span>
                </div>
                <p className=" text-sm">All systems operational</p>
                <p className=" text-xs mt-1">Last block: 2 mins ago</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="backdrop-blur-xl border border-border rounded-2xl p-6   text-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold ">Recent Blockchain Activity</h2>
              <button className=" hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                View All
                <i className="fas fa-arrow-up-right"></i>
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4  backdrop-blur-sm border border-border rounded-xl hover:border-blue-500/30 transition-all duration-300 group bg-background/40 text-white">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-background/30 border border-border`}>
                      <i className={`fas ${activity.icon} ${activity.type === 'purchase' ? 'text-green-400' :
                        activity.type === 'sale' ? '' :
                          activity.type === 'income' ? 'text-purple-400' :
                            activity.type === 'tokenize' ? 'text-yellow-400' :
                              ''
                        }`}></i>
                    </div>
                    <div>
                      <p className=" font-medium">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className=" text-sm">{activity.timestamp}</p>
                        {activity.hash && (
                          <span className="text-xs bg-background px-2 py-1 rounded-md font-mono text-white">
                            {activity.hash}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {activity.amount && (
                      <p className=" font-semibold text-lg">{activity.amount}</p>
                    )}
                    <button className="text-xs bg-background/20 hover:bg-background/30 px-3 py-1 rounded-md border border-border transition-colors text-white">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;