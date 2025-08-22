"use client";

import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { IoLogoUsd } from "react-icons/io";
import { MdAccountBalanceWallet, MdCalendarMonth, MdOutlineDataSaverOff } from "react-icons/md";

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
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

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
      legend: { display: false },
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
          label: (context) => `Value: $${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(100, 116, 139, 0.1)', drawBorder: false },
        ticks: {
          color: '#64748B',
          callback: (value) => `$${(value / 1000000).toFixed(1)}M`,
          font: { size: 12 },
        },
      },
    },
    animation: { duration: 2000, easing: 'easeInOutQuart' },
  };

  const recentActivities = [
    { activity: 'Smart Contract Executed - NYC Property', timestamp: '2025-06-20', icon: 'fa-shield-alt', amount: '$1,250,000', type: 'purchase', hash: '0x1a2b3c...' },
    { activity: 'Token Sale Completed - LA Commercial', timestamp: '2025-06-18', icon: 'fa-coins', amount: '$850,000', type: 'sale', hash: '0x4d5e6f...' },
    { activity: 'Rental Income Distributed', timestamp: '2025-06-15', icon: 'fa-money-bill-wave', amount: '$25,600', type: 'income', hash: '0x7g8h9i...' },
    { activity: 'Portfolio Rebalanced', timestamp: '2025-06-10', icon: 'fa-chart-line', amount: '', type: 'update', hash: '0xjklmno...' },
    { activity: 'New Asset Tokenized - Miami Villa', timestamp: '2025-06-05', icon: 'fa-plus-circle', amount: '$950,000', type: 'tokenize', hash: '0xpqrstu...' },
  ];

  const propertyTypes = [
    { type: 'Residential', value: 65, color: '#00D4FF' },
    { type: 'Commercial', value: 20, color: '#9333EA' },
    { type: 'Industrial', value: 10, color: '#22C55E' },
    { type: 'Land', value: 5, color: '#FBBF24' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-dark">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium dark:text-gray-200">Loading Blockchain Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden rounded-lg dark:bg-dark text-dark dark:text-gray-2">
      {/* Background */}
      <div className="absolute z-0">
        <div className="w-full h-full"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse dark:bg-primary/20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse dark:delay-1000 bg-purple-500/20" />
      </div>

      <div className="relative z-20 p-4 md:p-6 lg:p-8">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003049] dark:text-gray-2">BlockEstate Dashboard</h1>
              <p className="mt-2 text-lg text-gray-700 dark:text-gray-4">Manage your tokenized real estate investments</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
                  <i className="fas fa-search"></i>
                </div>
                <input type="text" placeholder="Search properties..." className="rounded-xl pl-10 pr-4 py-3 bg-[#F5F7FA] dark:bg-dark-3 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]/50 transition-all text-gray-700 dark:text-gray-2" />
              </div>
            </div>
          </div>

          {/* Cards */}
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Total Portfolio Value */}
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-6 
                  hover:border-[#00B894]/50 transition-all duration-300 group 
                  bg-white dark:bg-dark-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-[#00B894]/20 to-[#00D2B6]/20 rounded-2xl 
                        border border-[#00B894]/30 group-hover:border-[#00B894]/50 transition-colors 
                        text-[#003049] dark:text-gray-2">
                    <IoLogoUsd />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-3">Total Portfolio Value</p>
                    <p className="text-2xl font-bold mt-1 text-[#003049] dark:text-gray-2">$1.75M</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-[#00B894] text-sm"></i>
                <span className="text-sm text-[#00B894]">+8.3%</span>
                <span className="text-gray-500 dark:text-gray-4 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B894]/5 to-[#00D2B6]/5 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* FCI Balance */}
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-6 
                  hover:border-[#00B894]/50 transition-all duration-300 group 
                  bg-white dark:bg-dark-2">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                    text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                Coming Soon
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-[#00B894]/20 to-[#00D2B6]/20 rounded-2xl 
                        border border-[#00B894]/30 group-hover:border-[#00B894]/50 transition-colors 
                        text-[#003049] dark:text-gray-2">
                    <MdAccountBalanceWallet />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-3">FCI Balance</p>
                    <p className="text-2xl font-bold mt-1 text-[#003049] dark:text-gray-2">$0</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-4 mb-1">
                  <span>Available</span>
                  <span>$0</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-3 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B894]/5 to-[#00D2B6]/5 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Monthly Income */}
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-6 
                  hover:border-[#00B894]/50 transition-all duration-300 group 
                  bg-white dark:bg-dark-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-[#00B894]/20 to-[#00D2B6]/20 rounded-2xl 
                        border border-[#00B894]/30 group-hover:border-[#00B894]/50 transition-colors 
                        text-[#003049] dark:text-gray-2">
                    <MdCalendarMonth />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-3">Monthly Income</p>
                    <p className="text-2xl font-bold mt-1 text-[#003049] dark:text-gray-2">$25,600</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-[#00B894] text-sm"></i>
                <span className="text-sm text-[#00B894]">+12.5%</span>
                <span className="text-gray-500 dark:text-gray-4 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B894]/5 to-[#00D2B6]/5 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Average Yield */}
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-6 
                  hover:border-[#00B894]/50 transition-all duration-300 group 
                  bg-white dark:bg-dark-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-[#00B894]/20 to-[#00D2B6]/20 rounded-2xl 
                        border border-[#00B894]/30 group-hover:border-[#00B894]/50 transition-colors 
                        text-[#003049] dark:text-gray-2">
                    <MdOutlineDataSaverOff />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-3">Average Yield</p>
                    <p className="text-2xl font-bold mt-1 text-[#003049] dark:text-gray-2">8.2%</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <i className="fas fa-arrow-up text-[#00B894] text-sm"></i>
                <span className="text-sm text-[#00B894]">+1.2%</span>
                <span className="text-gray-500 dark:text-gray-4 text-sm">vs last period</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B894]/5 to-[#00D2B6]/5 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

          </div>


          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-dark-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#003049] dark:text-gray-2">Portfolio Performance</h2>
                <div className="flex rounded-xl p-1 bg-[#F5F7FA] dark:bg-dark-3">
                  {['1M', '6M', '1Y', 'All'].map(period => (
                    <button key={period} onClick={() => setActiveTimeframe(period)} className={`${activeTimeframe === period ? 'bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white' : 'text-gray-700 dark:text-gray-3 hover:bg-gray-100 dark:hover:bg-dark-4'} px-4 py-2 rounded-lg text-sm font-medium transition-all`}>
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-80"><Line data={portfolioData} options={chartOptions} /></div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-dark-2">
              <h2 className="text-xl font-bold text-[#003049] dark:text-gray-2 mb-6">Asset Distribution</h2>
              <div className="h-64 mb-6"><Doughnut data={propertyTypeData} /></div>
              <div className="space-y-3">
                {propertyTypes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700 dark:text-gray-3">{item.type}</span>
                    </div>
                    <span className="font-medium text-[#003049] dark:text-gray-2">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-dark-2">
              <h2 className="text-xl font-bold text-[#003049] dark:text-gray-2 mb-6">Regional Investment Distribution</h2>
              <div className="h-80"><Bar data={regionalData} /></div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-dark-2">
              <h2 className="text-xl font-bold text-[#003049] dark:text-gray-2 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 border border-[#00B894]/20 rounded-xl hover:bg-opacity-20 text-[#003049] dark:text-gray-2">
                  <i className="fas fa-plus"></i><span className="font-medium">Tokenize Asset</span>
                </button>
              </div>
              <div className="mt-8 p-4 bg-[#00B894]/10 border border-[#00B894]/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#00B894] rounded-full animate-pulse"></div>
                  <span className="text-[#00B894] font-medium text-sm">Blockchain Status</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-3">All systems operational</p>
                <p className="text-xs text-gray-500 dark:text-gray-4 mt-1">Last block: 2 mins ago</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-[#00B894] rounded-2xl p-6 bg-[#F5F7FA] dark:bg-dark-2">
            <h2 className="text-xl font-bold text-[#003049] dark:text-gray-2 mb-6">Recent Blockchain Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-[#00B894] rounded-xl bg-white/80 dark:bg-dark-3">
                  <div><p className="font-medium text-[#003049] dark:text-gray-2">{a.activity}</p></div>
                  <div>{a.amount && <p className="font-semibold text-lg text-[#003049] dark:text-gray-2">{a.amount}</p>}</div>
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
