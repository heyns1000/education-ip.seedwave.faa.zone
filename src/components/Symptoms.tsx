import React, { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SymptomEntry } from '../types';

export function Symptoms() {
  const [symptoms, setSymptoms] = useLocalStorage<SymptomEntry[]>('symptoms', []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    severity: 'mild' as 'mild' | 'moderate' | 'severe',
    triggers: [] as string[],
    notes: ''
  });

  const commonSymptoms = [
    'Cough', 'Shortness of breath', 'Wheezing', 'Chest tightness',
    'Fatigue', 'Mucus production', 'Throat irritation'
  ];

  const commonTriggers = [
    'Exercise', 'Cold air', 'Allergens', 'Stress', 'Smoke',
    'Strong odors', 'Weather changes', 'Infections'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: SymptomEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...formData
    };
    setSymptoms([newEntry, ...symptoms]);
    setFormData({
      symptoms: [],
      severity: 'mild',
      triggers: [],
      notes: ''
    });
    setShowForm(false);
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const toggleTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Symptoms</h2>
          <p className="text-gray-600">Track your respiratory symptoms</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Log Symptoms</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Symptoms Experienced
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSymptoms.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Severity Level
              </label>
              <div className="flex space-x-4">
                {['mild', 'moderate', 'severe'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, severity: level as any }))}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      formData.severity === level
                        ? getSeverityColor(level)
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Possible Triggers
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {commonTriggers.map(trigger => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => toggleTrigger(trigger)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.triggers.includes(trigger)
                        ? 'bg-orange-50 border-orange-200 text-orange-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Any additional details about your symptoms..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Entry
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

      {/* Symptoms History */}
      <div className="space-y-4">
        {symptoms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No symptoms logged yet</p>
            <p className="text-sm text-gray-400">Start tracking your symptoms to monitor your health</p>
          </div>
        ) : (
          symptoms.map(entry => (
            <div key={entry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(entry.severity)}`}>
                  {entry.severity}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.symptoms.map(symptom => (
                      <span key={symptom} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                
                {entry.triggers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Triggers</h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.triggers.map(trigger => (
                        <span key={trigger} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {entry.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600">{entry.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}