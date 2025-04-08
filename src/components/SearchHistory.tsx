import React from "react";

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (username: string) => void;
  onRemoveHistory: (username: string) => void;
  darkMode?: boolean; // Optional prop for dark mode
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onHistoryClick,
  onRemoveHistory,
  darkMode = false, // Default to light mode if not provided
}) => {
  return (
    <div
      className={`mb-6 p-4 rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <h3 className="font-medium mb-2">Recent searches:</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((username, index) => (
          <div
            className={`px-3 py-1 rounded-full flex gap-2 text-sm ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <button key={index} onClick={() => onHistoryClick(username)}>
              {username}
            </button>
            <button
              onClick={() => onRemoveHistory(username)}
              className="text-red-500 hover:text-red-700 text-sm"
              aria-label={`Remove ${username} from search history`}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
