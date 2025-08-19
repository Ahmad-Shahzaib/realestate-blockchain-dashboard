"use client";

import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { CiSearch } from "react-icons/ci";

import 'chart.js/auto';
import { Input } from './ui/input';

const Dashboard = () => {

  const [activeTimeframe, setActiveTimeframe] = useState('6M');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Use Tailwind theme colors
  const themeBgColor = 'bg-themebgColor';
  const themeBorderColor = 'border-themebgColor';
  const themeAccent = '#38bdf8'; // fallback for chartjs, can be replaced with tailwind color
  const themeAccent2 = '#9333ea';
  const themeAccent3 = '#22c55e';
  const themeAccent4 = '#fbbf24';

  const portfolioData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1600000, 1650000, 1700000, 1750000],
        borderColor: themeAccent,
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(56,189,248,0.3)');
          gradient.addColorStop(1, 'rgba(56,189,248,0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointBackgroundColor: themeAccent,
        hoverBackgroundColor: themeAccent,
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
          'rgba(56,189,248,0.8)', // sky-400
          'rgba(147,51,234,0.8)', // purple-600
          'rgba(34,197,94,0.8)',  // green-500
          'rgba(251,191,36,0.8)', // yellow-400
        ],
        borderColor: [
          themeAccent,
          themeAccent2,
          themeAccent3,
          themeAccent4,
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
        backgroundColor: 'rgba(56,189,248,0.1)',
        borderColor: themeAccent,
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
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: themeAccent,
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
          color: '#000',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#000',
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
    { type: 'Residential', value: 65, color: themeAccent },
    { type: 'Commercial', value: 20, color: themeAccent2 },
    { type: 'Industrial', value: 10, color: themeAccent3 },
    { type: 'Land', value: 5, color: themeAccent4 },
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-themebgColor/30 border-t-themebgColor rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium text-black">Loading Blockchain Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden rounded-lg text-black">
      {/* Animated Gradient Background */}
      <div className="absolute z-0">
        <div className="w-full h-full opacity-90"></div>
        {/* Extra glowing shapes for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-10 left-1/3 w-72 h-40 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      {/* Enhanced Grid Pattern Overlay */}
      <div className="absolute z-10 pointer-events-none">
        <div className="w-full h-full opacity-30"></div>
      </div>

      <div className="relative z-20 p-4 md:p-6 lg:p-8">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                {/* ...existing code... */}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black">
                BlockEstate Dashboard
              </h1>
              <p className="mt-2 text-lg text-black">Manage your tokenized real estate investments</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search properties..."
                  className="rounded-xl w-full h-[40px] pl-10 pr-4 py-1 focus:outline-none  transition-all text-black  border border-themebgColor"
                  icon={<i className="fas fa-search text-black" />} // If Input supports icon prop
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Portfolio Value */}
            <div className={`relative border rounded-2xl p-6 hover:border-themebgColor/50 transition-all duration-300 group bg-background border-themebgColor text-black`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-themebgColor/20 to-themebgColor/10 rounded-xl border border-themebgColor/30 group-hover:border-themebgColor/50 transition-colors">
                    <i className="fas fa-building text-xl text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Total Portfolio Value</p>
                    <p className="text-2xl font-bold mt-1 text-black">$1.75M</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm" />
                <span className="text-sm text-green-400">+8.3%</span>
                <span className="text-black text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-themebgColor/5 to-themebgColor/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* FCI Balance */}
            <div className={`relative border rounded-2xl p-6 hover:border-themebgColor/50 transition-all duration-300 group bg-background border-themebgColor text-black`}>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                Coming Soon
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-themebgColor/20 to-themebgColor/10 rounded-xl border border-themebgColor/30 group-hover:border-themebgColor/50 transition-colors">
                    <i className="fas fa-piggy-bank text-xl text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">FCI Balance</p>
                    <p className="text-2xl font-bold mt-1 text-black">$0</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-black mb-1">
                  <span>Available</span>
                  <span>$0</span>
                </div>
                <div className="w-full bg-themebgColor/10 rounded-full h-2">
                  <div className="bg-themebgColor h-2 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-themebgColor/5 to-themebgColor/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Monthly Income */}
            <div className={`relative border rounded-2xl p-6 hover:border-themebgColor/50 transition-all duration-300 group bg-background border-themebgColor text-black`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-themebgColor/20 to-themebgColor/10 rounded-xl border border-themebgColor/30 group-hover:border-themebgColor/50 transition-colors">
                    <i className="fas fa-money-bill-wave text-xl text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Monthly Income</p>
                    <p className="text-2xl font-bold mt-1 text-black">$25,600</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm" />
                <span className="text-sm text-green-400">+12.5%</span>
                <span className="text-black text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-themebgColor/5 to-themebgColor/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Average Yield */}
            <div className={`relative border rounded-2xl p-6 hover:border-themebgColor/50 transition-all duration-300 group bg-background border-themebgColor text-black`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-themebgColor/20 to-themebgColor/10 rounded-xl border border-themebgColor/30 group-hover:border-themebgColor/50 transition-colors">
                    <i className="fas fa-chart-line text-xl text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Average Yield</p>
                    <p className="text-2xl font-bold mt-1 text-black">8.2%</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-green-400 text-sm" />
                <span className="text-sm text-green-400">+1.2%</span>
                <span className="text-black text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-themebgColor/5 to-themebgColor/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Portfolio Value Chart */}
            <div className={`xl:col-span-2 border rounded-2xl p-6 bg-background border-themebgColor text-black`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">Portfolio Performance</h2>
                <div className="flex rounded-xl p-1">
                  {['1M', '6M', '1Y', 'All'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setActiveTimeframe(period)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTimeframe === period ? 'bg-themebgColor/10 text-black' : 'text-black'}`}
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
            <div className={`border rounded-2xl p-6 bg-background border-themebgColor text-black`}>
              <h2 className="text-xl font-bold mb-6 text-black">Asset Distribution</h2>
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
                      <span className="text-sm text-black">{item.type}</span>
                    </div>
                    <span className="font-medium text-black">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className={`xl:col-span-2 border rounded-2xl p-6 bg-background border-themebgColor text-black`}>
              <h2 className="text-xl font-bold mb-6 text-black">Regional Investment Distribution</h2>
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
                          color: '#000',
                        },
                      },
                      y: {
                        grid: {
                          color: 'rgba(0,0,0,0.05)',
                        },
                        ticks: {
                          color: '#000',
                          callback: (value) => `$${(value / 1000).toFixed(0)}K`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`backdrop-blur-xl border rounded-2xl p-6 bg-background border-themebgColor text-black`}>
              <h2 className="text-xl font-bold mb-6 text-black">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:bg-opacity-20 transition-all group text-black">
                  <i className="fas fa-plus group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-black">Tokenize Asset</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-themebgColor/10 to-themebgColor/5 border border-themebgColor/20 rounded-xl hover:bg-opacity-20 transition-all group text-black">
                  <i className="fas fa-chart-pie group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-black">View Reports</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-themebgColor/10 to-themebgColor/5 border border-themebgColor/20 rounded-xl hover:bg-opacity-20 transition-all group text-black">
                  <i className="fas fa-chart-line group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-black">Portfolio Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl hover:bg-opacity-20 transition-all group text-black">
                  <i className="fas fa-sliders-h group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-black">Manage Settings</span>
                </button>
              </div>

              {/* Blockchain Status */}
              <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium text-sm">Blockchain Status</span>
                </div>
                <p className="text-sm text-black">All systems operational</p>
                <p className="text-xs mt-1 text-black">Last block: 2 mins ago</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`backdrop-blur-xl border rounded-2xl p-6 bg-background border-themebgColor text-black`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">Recent Blockchain Activity</h2>
              <button className="hover:text-themebgColor text-sm font-medium flex items-center gap-1">
                View All
                <i className="fas fa-arrow-up-right" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-4 backdrop-blur-sm border rounded-xl hover:border-themebgColor/30 transition-all duration-300 group bg-background/40 text-black border-themebgColor`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-background/30 border border-themebgColor`}>
                      <i className={`fas ${activity.icon} ${activity.type === 'purchase' ? 'text-green-400' : activity.type === 'sale' ? '' : activity.type === 'income' ? 'text-purple-400' : activity.type === 'tokenize' ? 'text-yellow-400' : ''}`} />
                    </div>
                    <div>
                      <p className="font-medium text-black">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-black">{activity.timestamp}</p>
                        {activity.hash && (
                          <span className="text-xs bg-background px-2 py-1 rounded-md font-mono text-black">
                            {activity.hash}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-semibold text-lg text-black">{activity.amount}</p>
                    )}
                    <button className="text-xs bg-background/20 hover:bg-background/30 px-3 py-1 rounded-md border border-themebgColor transition-colors text-black">
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