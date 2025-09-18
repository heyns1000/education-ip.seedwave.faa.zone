import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, AlertTriangle, Wind, Heart } from 'lucide-react';

export function Education() {
  const [activeSection, setActiveSection] = useState('inhaler');

  const sections = [
    { id: 'inhaler', title: 'Inhaler Techniques', icon: Wind },
    { id: 'breathing', title: 'Breathing Exercises', icon: Heart },
    { id: 'emergency', title: 'Emergency Plan', icon: AlertTriangle },
    { id: 'triggers', title: 'Trigger Management', icon: CheckCircle },
  ];

  const inhalerSteps = [
    'Remove the cap and shake the inhaler well',
    'Breathe out fully, away from the inhaler',
    'Place lips around the mouthpiece and seal tightly',
    'Start breathing in slowly and deeply',
    'Press down on the inhaler once while continuing to breathe in',
    'Continue breathing in slowly and deeply',
    'Hold your breath for 10 seconds (or as long as comfortable)',
    'Breathe out slowly and wait 30-60 seconds before next dose'
  ];

  const breathingExercises = [
    {
      name: 'Diaphragmatic Breathing',
      description: 'Strengthens the diaphragm and improves breathing efficiency',
      steps: [
        'Lie down or sit comfortably',
        'Place one hand on chest, one on belly',
        'Breathe in slowly through nose, belly should rise more than chest',
        'Exhale slowly through pursed lips',
        'Repeat for 5-10 minutes'
      ]
    },
    {
      name: 'Pursed Lip Breathing',
      description: 'Helps control shortness of breath and releases trapped air',
      steps: [
        'Sit comfortably and relax your shoulders',
        'Breathe in through nose for 2 counts',
        'Purse lips as if whistling',
        'Breathe out slowly through pursed lips for 4 counts',
        'Repeat 4-6 times'
      ]
    },
    {
      name: '4-7-8 Breathing',
      description: 'Promotes relaxation and reduces anxiety',
      steps: [
        'Sit or lie down comfortably',
        'Exhale completely through mouth',
        'Inhale through nose for 4 counts',
        'Hold breath for 7 counts',
        'Exhale through mouth for 8 counts',
        'Repeat cycle 3-4 times'
      ]
    }
  ];

  const emergencyPlan = {
    warning_signs: [
      'Peak flow drops below 50% of personal best',
      'Increased shortness of breath',
      'Frequent coughing, especially at night',
      'Chest tightness or pain',
      'Difficulty speaking in full sentences',
      'Rescue inhaler needed more than twice a week'
    ],
    immediate_actions: [
      'Use rescue inhaler (2-4 puffs)',
      'Sit upright and try to stay calm',
      'Practice pursed lip breathing',
      'Remove yourself from triggers if possible',
      'Wait 15-20 minutes for improvement'
    ],
    seek_help: [
      'Peak flow in red zone (below 50%)',
      'No improvement after rescue medication',
      'Severe difficulty breathing',
      'Cannot speak in full sentences',
      'Lips or fingernails turning blue',
      'Feeling confused or drowsy'
    ]
  };

  const commonTriggers = [
    {
      category: 'Environmental',
      triggers: ['Pollen', 'Dust mites', 'Pet dander', 'Mold', 'Air pollution'],
      management: [
        'Use air purifiers with HEPA filters',
        'Keep windows closed during high pollen days',
        'Wash bedding weekly in hot water',
        'Remove carpets and heavy curtains',
        'Control humidity levels (30-50%)'
      ]
    },
    {
      category: 'Weather',
      triggers: ['Cold air', 'Humidity changes', 'Barometric pressure'],
      management: [
        'Cover nose and mouth in cold weather',
        'Use a scarf or mask outdoors',
        'Warm up slowly before exercise',
        'Monitor weather forecasts',
        'Stay indoors during extreme weather'
      ]
    },
    {
      category: 'Lifestyle',
      triggers: ['Exercise', 'Stress', 'Strong odors', 'Smoke'],
      management: [
        'Warm up before exercise',
        'Use rescue inhaler before activity if prescribed',
        'Practice stress management techniques',
        'Avoid strong perfumes and cleaning products',
        'Stay away from smoke and smoking areas'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Education Center</h2>
        <p className="text-gray-600">Learn about respiratory health management</p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeSection === 'inhaler' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proper Inhaler Technique</h3>
              <p className="text-gray-600">Follow these steps for effective medication delivery</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Step-by-Step Instructions</h4>
                <div className="space-y-3">
                  {inhalerSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4">Important Tips</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Practice your technique regularly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Clean your inhaler weekly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Keep track of doses remaining</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Rinse mouth after using steroid inhalers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'breathing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Breathing Exercises</h3>
              <p className="text-gray-600">Techniques to improve breathing and reduce symptoms</p>
            </div>
            
            <div className="space-y-6">
              {breathingExercises.map((exercise, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Play className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{exercise.name}</h4>
                      <p className="text-gray-600 mb-4">{exercise.description}</p>
                      
                      <div className="space-y-2">
                        {exercise.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
                              {stepIndex + 1}
                            </div>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'emergency' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Action Plan</h3>
              <p className="text-gray-600">Know when and how to respond to respiratory emergencies</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-4">⚠️ Warning Signs</h4>
                <ul className="space-y-2">
                  {emergencyPlan.warning_signs.map((sign, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">🔧 Immediate Actions</h4>
                <ul className="space-y-2">
                  {emergencyPlan.immediate_actions.map((action, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-4">🚨 Seek Help When</h4>
                <ul className="space-y-2">
                  {emergencyPlan.seek_help.map((condition, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Emergency Services</p>
                  <p className="text-gray-600">911</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Your Doctor</p>
                  <p className="text-gray-600">Add your doctor's number</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Pharmacy</p>
                  <p className="text-gray-600">Add your pharmacy's number</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'triggers' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trigger Management</h3>
              <p className="text-gray-600">Learn to identify and avoid common respiratory triggers</p>
            </div>
            
            <div className="space-y-6">
              {commonTriggers.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{category.category} Triggers</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">Common Triggers</h5>
                      <div className="flex flex-wrap gap-2">
                        {category.triggers.map((trigger, triggerIndex) => (
                          <span key={triggerIndex} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">Management Strategies</h5>
                      <ul className="space-y-2">
                        {category.management.map((strategy, strategyIndex) => (
                          <li key={strategyIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}