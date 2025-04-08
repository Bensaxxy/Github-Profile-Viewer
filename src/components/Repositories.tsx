import { useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  homepage: string | null;
  topics?: string[];
}

interface RepositoriesProps {
  repos: Repo[];
  languages: string[];
  sortOption: "stars" | "name" | "updated";
  languageFilter: string;
  onSortChange: (option: "stars" | "name" | "updated") => void;
  onLanguageFilterChange: (language: string) => void;
  darkMode: boolean;
}

const Repositories = ({
  repos,
  languages,
  sortOption,
  languageFilter,
  onSortChange,
  onLanguageFilterChange,
  darkMode,
}: RepositoriesProps) => {
  const [expandedRepo, setExpandedRepo] = useState<number | null>(null);

  const toggleRepoExpand = (repoId: number) => {
    setExpandedRepo(expandedRepo === repoId ? null : repoId);
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Repositories ({repos.length})</h2>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div>
          <label htmlFor="sort" className="block text-sm font-medium mb-1">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) =>
              onSortChange(e.target.value as "stars" | "name" | "updated")
            }
            className={`px-3 py-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
          >
            <option value="stars">Most Stars</option>
            <option value="name">Name</option>
            <option value="updated">Most Recent</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium mb-1">
            Filter by language:
          </label>
          <select
            id="language"
            value={languageFilter}
            onChange={(e) => onLanguageFilterChange(e.target.value)}
            className={`px-3 py-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {repos.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          repos.map((repo) => (
            <div
              key={repo.id}
              className={`p-4 rounded-lg border ${
                darkMode
                  ? "border-gray-700 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:underline ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {repo.name}
                    </a>
                  </h3>
                  {repo.description && (
                    <p className="mt-1">{repo.description}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="flex items-center mr-3">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 011-1h1a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h1a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {repo.language || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex mt-3">
                <span className="flex items-center mr-4">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center mr-4">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {repo.forks_count}
                </span>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${
                      darkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Demo
                  </a>
                )}
              </div>

              {expandedRepo === repo.id && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(repo.created_at).toLocaleDateString()}
                  </p>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold">Topics:</span>
                      <div className="flex flex-wrap mt-1">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className={`text-xs px-2 py-1 rounded-full mr-2 mb-2 ${
                              darkMode ? "bg-gray-600" : "bg-gray-200"
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => toggleRepoExpand(repo.id)}
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                {expandedRepo === repo.id ? "Show less" : "Show more"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Repositories;
