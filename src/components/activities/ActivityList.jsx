import React from 'react';
import { format } from 'date-fns';
import { Clock, Flame, Calendar } from 'lucide-react';

const ActivityList = ({ activities }) => {
  const getActivityColor = (type) => {
    const colors = {
      RUNNING: 'bg-green-100 text-green-700',
      WALKING: 'bg-blue-100 text-blue-700',
      CYCLING: 'bg-purple-100 text-purple-700',
      SWIMMING: 'bg-cyan-100 text-cyan-700',
      STRENGTH: 'bg-red-100 text-red-700',
      YOGA: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Clock className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
        <p className="text-gray-500">Start tracking your fitness journey by adding your first activity!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getActivityColor(activity.type)}`}>
                {activity.type}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(activity.startTime).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="font-semibold text-gray-800">{activity.duration} min</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center text-gray-600">
                  <Flame className="w-4 h-4 mr-1" />
                  <span className="text-sm">Calories</span>
                </div>
                <p className="font-semibold text-gray-800">{activity.caloriesBurned}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;