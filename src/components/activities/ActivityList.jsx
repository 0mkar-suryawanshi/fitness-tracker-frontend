import React from 'react';
import ActivityCard from './ActivityCard';

const ActivityList = ({ activities, onEdit, onDelete }) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4" style={{ fontSize: '48px' }}>
          📊
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
        <p className="text-gray-500">Start tracking your fitness journey by adding your first activity!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ActivityList;