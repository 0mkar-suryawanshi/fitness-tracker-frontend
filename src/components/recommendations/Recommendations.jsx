import React from 'react';

const Recommendations = ({ recommendations }) => {
  const getTypeIcon = (type) => {
    const icons = {
      FITNESS: '💪',
      NUTRITION: '🥗',
      SAFETY: '🛡️',
      IMPROVEMENT: '📈',
      GENERAL: '✨',
    };
    return icons[type] || '💡';
  };

  const getTypeColor = (type) => {
    const colors = {
      FITNESS: 'bg-green-100 text-green-800 border-green-200',
      NUTRITION: 'bg-orange-100 text-orange-800 border-orange-200',
      SAFETY: 'bg-red-100 text-red-800 border-red-200',
      IMPROVEMENT: 'bg-blue-100 text-blue-800 border-blue-200',
      GENERAL: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4" style={{ fontSize: '64px' }}>
          🏋️
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Complete more activities to get personalized fitness recommendations, 
          nutrition tips, and safety advice tailored to your workout routine.
        </p>
        <div className="mt-6 text-sm text-gray-400">
          💡 Tip: Add at least 3 activities to start receiving recommendations
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recommendations.map((rec, index) => (
        <div 
          key={rec.id || index} 
          className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="p-6">
            {/* Header with Type and Date */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(rec.type)}`}>
                  {rec.type || 'Recommendation'}
                </span>
              </div>
              {rec.createdAt && (
                <span className="text-xs text-gray-400">
                  {new Date(rec.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Main Recommendation */}
            {rec.recommendation && (
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{rec.recommendation}</p>
              </div>
            )}

            {/* Improvements Section */}
            {rec.improvements && rec.improvements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                  <span className="mr-2">📊</span> Areas for Improvement
                </h4>
                <ul className="space-y-1">
                  {rec.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions Section */}
            {rec.suggestions && rec.suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <span className="mr-2">💡</span> Suggestions
                </h4>
                <ul className="space-y-1">
                  {rec.suggestions.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-green-500 mr-2">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety Tips Section */}
            {rec.safety && rec.safety.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <span className="mr-2">⚠️</span> Safety Tips
                </h4>
                <ul className="space-y-1">
                  {rec.safety.map((item, idx) => (
                    <li key={idx} className="flex items-start text-yellow-800">
                      <span className="text-yellow-600 mr-2">!</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;