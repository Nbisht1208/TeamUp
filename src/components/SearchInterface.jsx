import React, { useState, useEffect } from 'react';
import { Star, MapPin, Filter, X, ChevronDown } from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SearchInterface = () => {
  // Replace with your backend URL
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState('');
  const [location, setLocation] = useState('');
  const [levelRange, setLevelRange] = useState([0, 100]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/getAllUsers`);
        const user = response.data;
        setUser(user.data.user);
        console.log(user);
        toast.success("Users fetched successfully")
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error("Failed to fetch users")
      }
    };

    fetchUsers();
  }, []);


  const locationOptions = [
    'All Locations',
    'Delhi NCR',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Gurgaon',
    'Noida',
    'Ghaziabad',
    'Faridabad',
    'Lucknow',
    'Kanpur',
    'Jaipur',
    'Indore',
    'Bhopal',
    'Patna',
    'Nagpur'
  ];


  // Lock/unlock body scroll when filter modal opens/closes
  useEffect(() => {
    if (isFilterOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Get the scroll position from the fixed positioning
      const scrollY = document.body.style.top;

      // Unlock body scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    // Cleanup function to ensure body scroll is unlocked if component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const searchResults = user.map((userData, index) => ({
    id: userData._id,
    name: userData.name,
    title: `${userData.course} - Semester ${userData.semester}`,
    location: userData.college,
    rating: 4,
    skills: typeof userData.skills === 'string'
      ? userData.skills.split(',').map(s => s.trim())
      : Array.isArray(userData.skills)
        ? userData.skills
        : [],
    skillColors: [
      'from-blue-500 to-blue-600',
      'from-cyan-500 to-blue-500',
      'from-indigo-500 to-blue-500',
      'from-sky-500 to-blue-500',
      'from-blue-600 to-indigo-600',
      'from-teal-500 to-blue-500',
      'from-blue-400 to-cyan-500',
      'from-slate-500 to-blue-600'
    ],
    skillLength: userData.skills.length,
  }));


  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLevelChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setLevelRange([Math.min(value, levelRange[1]), levelRange[1]]);
    } else {
      setLevelRange([levelRange[0], Math.max(value, levelRange[0])]);
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  const FilterSection = ({ className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={toggleFilter}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-6 hidden lg:block">Filter Section</h2>

      {/* Level Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Level</h3>

        {/* Level Display */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 py-2 px-3 rounded-lg text-center">
            {levelRange[0]} - {levelRange[1]}
          </div>
        </div>

        {/* Dual Range Slider */}
        <div className="relative">
          <div className="relative h-2 bg-gray-200 rounded-full">
            {/* Active range background */}
            <div
              className="absolute h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{
                left: `${(levelRange[0] / 100) * 100}%`,
                width: `${((levelRange[1] - levelRange[0]) / 100) * 100}%`
              }}
            />
          </div>

          {/* Min Range Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={levelRange[0]}
            onChange={(e) => handleLevelChange(e, 'min')}
            className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer level-slider z-10"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Max Range Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={levelRange[1]}
            onChange={(e) => handleLevelChange(e, 'max')}
            className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer level-slider z-20"
            style={{ pointerEvents: 'auto' }}
          />
        </div>

        {/* Custom Slider Styles */}
        <style jsx>{`
          .level-slider {
            pointer-events: auto;
          }
          
          .level-slider::-webkit-slider-thumb {
            appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
            cursor: pointer;
            pointer-events: auto;
            transition: all 0.2s ease;
          }
          
          .level-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
          }
          
          .level-slider::-moz-range-thumb {
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
            cursor: pointer;
            pointer-events: auto;
            transition: all 0.2s ease;
          }
          
          .level-slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
          }

          .level-slider:focus {
            outline: none;
          }
        `}</style>
      </div>



      {/* Location Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Location</h3>
        <div className="relative location-dropdown">
          <button
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white text-left flex items-center justify-between"
          >
            <span className={location ? 'text-gray-900' : 'text-gray-500'}>
              {location || 'Select location'}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Options */}
          {isLocationDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto">
              {locationOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setLocation(option === 'All Locations' ? '' : option);
                    setIsLocationDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating</h3>
        <div className="space-y-3">
          {['4+', '3+', '2+'].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                {rating}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button className="bg-gradient-to-r mt-2 from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full ring-2 ring-blue-200 hover:ring-blue-300">
        Apply
      </button>

    </div>
  );

  const ProfileCard = ({ profile }) => {
    const displaySkills = profile.skills.slice(0, 3);
    const remainingSkillsCount = profile.skills.length - 3;

    return (

      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1">
        <div className="flex sm:flex-row flex-col items-center sm:items-start gap-4">
          <div className='flex flex-col items-center'>
            {/* Profile Picture */}
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-inner flex-shrink-0">
              <span className="text-xl font-bold text-gray-600">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {/* Star Rating */}
            <div className="mt-1.5">
              <StarRating rating={profile.rating} />
            </div>
          </div>

          {/* Right side content */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Name */}
            <h3 className="text-lg font-bold text-gray-800 mb-1">{profile.name}</h3>
            {/* Skills Section */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {displaySkills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 bg-gradient-to-r ${profile.skillColors[index]} text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                  >
                    {skill}
                  </span>
                ))}
                {remainingSkillsCount > 0 && (
                  <span className="px-2 py-1 bg-gradient-to-r from-slate-600 to-gray-700 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ring-2 ring-blue-100">
                    +{profile.skillLength - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-4 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profile.location}</span>
            </div>

            {/* View Profile Button */}
            <NavLink
            to ={`/profile/${profile.id}`}
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full ring-2 ring-blue-200 hover:ring-blue-300">
              View Profile
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={toggleFilter}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
            <div className="bg-white rounded-t-3xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <FilterSection />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Filter Section */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Search Results Section */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Search Results</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {searchResults.length} results
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
                {searchResults.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;