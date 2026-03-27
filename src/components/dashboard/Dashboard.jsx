import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { activityAPI, recommendationAPI } from '../../services/api';
import ActivityForm from '../activities/ActivityForm';
import ActivityList from '../activities/ActivityList';
import Recommendations from '../recommendations/Recommendations';
import Navbar from '../layout/Navbar';  // Import Navbar

const Dashboard = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activities');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const activitiesRes = await activityAPI.getAll(user.id);
      setActivities(activitiesRes.data || []);
      
      const recommendationsRes = await recommendationAPI.getUserRecommendations(user.id);
      setRecommendations(recommendationsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityAdded = (newActivity) => {
    setActivities([newActivity, ...activities]);
    fetchData();
  };

  const calculateStats = () => {
    const totalActivities = activities.length;
    const totalCalories = activities.reduce((sum, act) => sum + (act.caloriesBurned || 0), 0);
    const totalDuration = activities.reduce((sum, act) => sum + (act.duration || 0), 0);
    const avgDuration = totalActivities > 0 ? (totalDuration / totalActivities).toFixed(1) : 0;
    
    return { totalActivities, totalCalories, totalDuration, avgDuration };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Add Navbar here */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Activities</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalActivities}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Calories Burned</p>
            <p className="text-3xl font-bold text-green-600">{stats.totalCalories}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Duration</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalDuration} min</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Avg Duration</p>
            <p className="text-3xl font-bold text-orange-600">{stats.avgDuration} min</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'activities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Activities
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'add'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Activity
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'recommendations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Recommendations
                {recommendations.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                    {recommendations.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-500">Loading...</p>
              </div>
            ) : (
              <>
                {activeTab === 'activities' && <ActivityList activities={activities} />}
                {activeTab === 'add' && (
                  <ActivityForm 
                    onActivityAdded={handleActivityAdded} 
                    userId={user.id} 
                  />
                )}
                {activeTab === 'recommendations' && (
                  <Recommendations recommendations={recommendations} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;