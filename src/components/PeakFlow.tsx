import React, { useState } from 'react';
import { Plus, TrendingUp, AlertCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PeakFlowReading } from '../types';

export function PeakFlow() {
  const [readings, setReadings] = useLocalStorage<PeakFlowReading[]>('peakflow', []);
  const [showForm, setShowForm] = useState(false);
  const [personalBest, setPersonalBest] = useLocalStorage<number>('personalBest', 500);
  const [formData, setFormData] = useState({
    reading: '',
    notes: ''
  });

  const calculateZone = (reading: number, personalBest: number): 'green' | 'yellow' | 'red' => {
    const percentage = (reading / personalBest) * 100;
    if (percentage >= 80) return 'green';
    if (percentage >= 50) return 'yellow';
    return 'red';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reading = parseInt(formData.reading);
    const zone = calculateZone(reading, personalBest);
    
    const newReading: PeakFlowReading = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      reading,
      personalBest,
      zone,
      notes: formData.notes
    };
    
    setReadings([newReading, ...readings]);
    setFormData({ reading: '', notes: '' });
    setShowForm(false);
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'green': return 'text-green-600 bg-green-100 border-green-200';
      case 'yellow': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'red': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getZoneMessage = (zone: string) => {
    switch (zone) {
      case 'green': return 'Good control - continue current treatment';
      case 'yellow': return 'Caution - may need to adjust treatment';
      case 'red': return 'Alert - seek medical attention';
      default: return '';
    }
  };

  const latestReading = readings[0];
  const averageReading = readings.length > 0 
    ? Math.round(readings.slice(0, 7).reduce((sum, r) => sum + r.reading, 0) / Math.min(readings.length, 7))
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Peak Flow Monitor</h2>
          <p className="text-gray-600">Track your lung function</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reading</span>
        </button>
      </div>

      {/* Personal Best Setting */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Best</h3>
            <p className="text-sm text-gray-600">Your highest peak flow reading when feeling well</p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={personalBest}
              onChange={(e) => setPersonalBest(parseInt(e.target.value) || 500)}
              className="w-24 p-2 border border-gray-300 rounded-lg text-center"
            />
            <span className="text-sm text-gray-600">L/min</span>
          </div>
        </div>
      </div>

      {/* Current Status */}
      {latestReading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Latest Reading</p>
                <p className="text-2xl font-bold text-gray-900">{latestReading.reading} L/min</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">7-Day Average</p>
                <p className="text-2xl font-bold text-gray-900">{averageReading} L/min</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className={`p-4 rounded-lg border ${getZoneColor(latestReading.zone)}`}>
              <p className="font-semibold capitalize">{latestReading.zone} Zone</p>
              <p className="text-sm mt-1">{getZoneMessage(latestReading.zone)}</p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peak Flow Reading (L/min)
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="800"
                  value={formData.reading}
                  onChange={(e) => setFormData(prev => ({ ...prev, reading: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your reading"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone Preview
                </label>
                <div className="p-3 border border-gray-300 rounded-lg">
                  {formData.reading ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getZoneColor(calculateZone(parseInt(formData.reading), personalBest))
                    }`}>
                      {calculateZone(parseInt(formData.reading), personalBest).toUpperCase()} Zone
                    </span>
                  ) : (
                    <span className="text-gray-400">Enter reading to see zone</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="How are you feeling? Any symptoms?"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Reading
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Zone Guide */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Flow Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-green-200 bg-green-50">
            <h4 className="font-semibold text-green-800">Green Zone (80-100%)</h4>
            <p className="text-sm text-green-700 mt-1">Good control. Continue current treatment plan.</p>
          </div>
          <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
            <h4 className="font-semibold text-yellow-800">Yellow Zone (50-79%)</h4>
            <p className="text-sm text-yellow-700 mt-1">Caution. May need to adjust medications.</p>
          </div>
          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <h4 className="font-semibold text-red-800">Red Zone (Below 50%)</h4>
            <p className="text-sm text-red-700 mt-1">Alert. Seek medical attention immediately.</p>
          </div>
        </div>
      </div>

      {/* Readings History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Readings</h3>
        {readings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No readings recorded yet</p>
            <p className="text-sm text-gray-400">Start tracking your peak flow to monitor your lung function</p>
          </div>
        ) : (
          <div className="space-y-3">
            {readings.slice(0, 10).map(reading => (
              <div key={reading.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{reading.reading}</p>
                      <p className="text-xs text-gray-500">L/min</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(reading.date).toLocaleDateString()} at {new Date(reading.date).toLocaleTimeString()}
                      </p>
                      {reading.notes && (
                        <p className="text-sm text-gray-500 mt-1">{reading.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getZoneColor(reading.zone)}`}>
                    {reading.zone.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}