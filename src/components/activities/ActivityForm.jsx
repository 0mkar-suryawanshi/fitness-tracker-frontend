import React, { useState } from 'react';
import { activityAPI } from '../../services/api';

const ActivityForm = ({ onActivityAdded, userId }) => {
  const [formData, setFormData] = useState({
    userId: userId,
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    startTime: new Date().toISOString().slice(0, 16),
    additionMetrics: {},
  });
  const [loading, setLoading] = useState(false);

  const activityTypes = [
    'RUNNING', 'WALKING', 'CYCLING', 'SWIMMING', 'STRENGTH', 'YOGA'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const activityData = {
        ...formData,
        duration: parseFloat(formData.duration),
        caloriesBurned: parseFloat(formData.caloriesBurned),
        startTime: new Date(formData.startTime).toISOString(),
      };
      
      const response = await activityAPI.create(activityData);
      onActivityAdded(response.data);
      
      // Reset form
      setFormData({
        userId: userId,
        type: 'RUNNING',
        duration: '',
        caloriesBurned: '',
        startTime: new Date().toISOString().slice(0, 16),
        additionMetrics: {},
      });
      
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Failed to add activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Activity Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {activityTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="0.5"
            placeholder="e.g., 30"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Calories Burned
          </label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            placeholder="e.g., 250"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Start Time
        </label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Adding Activity...' : 'Add Activity'}
      </button>
    </form>
  );
};

export default ActivityForm;