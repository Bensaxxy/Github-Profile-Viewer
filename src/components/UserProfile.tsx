import React from "react";

interface GitHubUser {
  avatar_url: string;
  login: string;
  name?: string | null;
  bio?: string | null;
  location?: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface UserProfileProps {
  userData: GitHubUser | null; // Allow null if data might be missing
  darkMode: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, darkMode }) => {
  if (!userData) {
    return (
      <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        No user data available
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center mb-4">
        <img
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold">
          {userData.name || userData.login}
        </h2>
        {userData.name && <p className="text-gray-500">@{userData.login}</p>}
      </div>

      {userData.bio && <p className="mb-4 italic">{userData.bio}</p>}

      {userData.location && (
        <div className="flex items-center mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{userData.location}</span>
        </div>
      )}

      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="font-bold">{userData.followers}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{userData.following}</p>
          <p className="text-sm">Following</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{userData.public_repos}</p>
          <p className="text-sm">Repos</p>
        </div>
      </div>

      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center py-2 px-4 rounded-lg ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        View on GitHub
      </a>
    </div>
  );
};

export default UserProfile;
