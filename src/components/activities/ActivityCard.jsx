import React from 'react';

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const getActivityColor = (type) => {
    const colors = {
      RUNNING: 'bg-green-100 text-green-700 border-green-200',
      WALKING: 'bg-blue-100 text-blue-700 border-blue-200',
      CYCLING: 'bg-purple-100 text-purple-700 border-purple-200',
      SWIMMING: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      STRENGTH: 'bg-red-100 text-red-700 border-red-200',
      YOGA: 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getActivityIcon = (type) => {
    const icons = {
      RUNNING: '🏃',
      WALKING: '🚶',
      CYCLING: '🚴',
      SWIMMING: '🏊',
      STRENGTH: '💪',
      YOGA: '🧘',
    };
    return icons[type] || '🏋️';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-5">
        {/* Header with Icon and Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getActivityIcon(activity.type)}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getActivityColor(activity.type)}`}>
              {activity.type}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(activity)}
                className="text-blue-500 hover:text-blue-700 transition p-1"
                title="Edit activity"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(activity.id)}
                className="text-red-500 hover:text-red-700 transition p-1"
                title="Delete activity"
              >
                🗑️
              </button>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="text-gray-500 text-sm mb-3 flex items-center">
          <span className="mr-1">📅</span>
          {formatDate(activity.startTime || activity.createdAt)}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center text-gray-600 text-sm mb-1">
              <span className="mr-1">⏱️</span>
              Duration
            </div>
            <p className="font-bold text-gray-800">{activity.duration} min</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center text-gray-600 text-sm mb-1">
              <span className="mr-1">🔥</span>
              Calories
            </div>
            <p className="font-bold text-gray-800">{activity.caloriesBurned} cal</p>
          </div>
        </div>

        {/* Additional Metrics (if any) */}
        {activity.additionMetrics && Object.keys(activity.additionMetrics).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-semibold mb-2">Additional Metrics:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activity.additionMetrics).map(([key, value]) => (
                <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;