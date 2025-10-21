import React from 'react';

const StarIcon = ({ className = 'w-5 h-5', isFilled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFilled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BriefcaseIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const FileTextIcon = ({ className = 'w-5 h-5 mr-1' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const UserPlusIcon = ({ className = 'w-5 h-5 mr-1' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="17" y1="11" x2="23" y2="11"></line>
    </svg>
);

const MessageSquareIcon = ({ className = 'w-5 h-5 mr-1' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);


// --- Main Profile Page Component ---

export default function App() {
  // Placeholder data
  const userProfile = {
    name: 'Alex Doe',
    level: 'LVL 12',
    college: 'State University of Technology',
    skills: ['React', 'Node.js', 'UI/UX Design', 'Project Management', 'Tailwind CSS'],
    profilePic: 'https://placehold.co/128x128/E0E0E0/333?text=AD',
    backgroundPic: 'https://placehold.co/800x200/4A90E2/FFFFFF?text=+',
    rating: 4,
    hackathons: [
      { id: 1, name: 'InnovateAI Hackathon', role: 'Frontend Lead' },
      { id: 2, name: 'Eco-Friendly App Challenge', role: 'UI Designer' },
      { id: 3, name: 'DataVis Contest 2023', role: 'Participant' },
    ],
    reviews: [
      { id: 1, author: 'Jane Smith, Project Manager', text: 'Alex is a highly skilled developer with a great eye for detail. A true team player and a pleasure to work with.' },
      { id: 2, author: 'Sam Wilson, Team Lead', text: 'Excellent problem-solving skills and consistently delivered high-quality work on our project. Highly recommended.' },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:py-8 max-w-4xl">
        
        {/* --- Profile Header Card --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative">
            <img 
              src={userProfile.backgroundPic} 
              alt="Background" 
              className="w-full h-32 md:h-48 object-cover"
            />
            <div className="absolute left-6 -bottom-16">
              <img 
                src={userProfile.profilePic} 
                alt="Profile" 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-lg"
              />
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userProfile.name}</h1>
                    <p className="text-md text-gray-600 mt-1">{userProfile.college}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{userProfile.level}</span>
            </div>
            
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-500" isFilled={i < userProfile.rating} />
              ))}
              <span className="ml-2 text-gray-600">{userProfile.rating}.0 Rating</span>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userProfile.skills.map(skill => (
                  <span key={skill} className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                 <button className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700 transition duration-300">
                    <UserPlusIcon />
                    Add in Team
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center border border-gray-400 text-gray-800 font-bold py-2 px-5 rounded-full hover:bg-gray-100 transition duration-300">
                    <MessageSquareIcon />
                    Message
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center border border-gray-400 text-gray-800 font-bold py-2 px-5 rounded-full hover:bg-gray-100 transition duration-300">
                    <FileTextIcon />
                    View Resume
                </button>
            </div>
          </div>
        </div>

        {/* --- Hackathons & Projects Card --- */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hackathons & Projects</h2>
          <ul className="space-y-4">
            {userProfile.hackathons.map(item => (
              <li key={item.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <BriefcaseIcon className="w-6 h-6 text-gray-500 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* --- Reviews Card --- */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews from Team Leaders</h2>
          <ul className="space-y-6">
            {userProfile.reviews.map(review => (
              <li key={review.id} className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600 italic">"{review.text}"</p>
                <p className="text-right text-sm font-semibold text-gray-800 mt-2">- {review.author}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}


