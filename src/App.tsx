import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import Repositories from "./components/Repositories";
import SearchHistory from "./components/SearchHistory";
import ThemeToggle from "./components/ThemeToggle";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
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

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]); // Use Repo[] here
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<"stars" | "name" | "updated">(
    "stars"
  );
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  useEffect(() => {
    const savedHistory = localStorage.getItem("githubSearchHistory");
    const savedTheme = localStorage.getItem("darkMode") === "true";

    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }
    if (savedTheme) setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  const fetchUserData = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`),
      ]);

      if (!userResponse.ok) {
        throw new Error(`User not found: ${userResponse.status}`);
      }

      const userData: GitHubUser = await userResponse.json();
      const reposData: GitHubRepo[] = await reposResponse.json();

      setUserData(userData);
      setRepos(
        reposData.map((repo) => ({
          // Map GitHubRepo to Repo
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          updated_at: repo.updated_at,
          created_at: repo.created_at,
          homepage: repo.homepage,
          topics: repo.topics,
        }))
      );
      updateSearchHistory(username);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setUserData(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (username: string) => {
    const updatedHistory = [
      username,
      ...searchHistory.filter((item) => item !== username),
    ].slice(0, 5);

    setSearchHistory(updatedHistory);
    localStorage.setItem("githubSearchHistory", JSON.stringify(updatedHistory));
  };

  const handleSearch = (searchTerm: string) => {
    setUsername(searchTerm);
  };

  const handleHistoryClick = (username: string) => {
    setUsername(username);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortOption === "stars") return b.stargazers_count - a.stargazers_count;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const filteredRepos =
    languageFilter === "all"
      ? sortedRepos
      : sortedRepos.filter((repo) => repo.language === languageFilter);

  const languages: string[] = [
    ...new Set(
      repos
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    ),
  ];

  const handleRemoveHistory = (username: string) => {
    const updatedHistory = searchHistory.filter((item) => item !== username);
    setSearchHistory(updatedHistory);
    localStorage.setItem("githubSearchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            GitHub Profile Viewer
          </h1>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {searchHistory.length > 0 && (
          <SearchHistory
            history={searchHistory}
            onHistoryClick={handleHistoryClick}
            darkMode={darkMode}
            onRemoveHistory={handleRemoveHistory}
          />
        )}

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              darkMode ? "bg-red-900" : "bg-red-100"
            }`}
          >
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {userData && (
            <div className="lg:col-span-1">
              <UserProfile userData={userData} darkMode={darkMode} />
            </div>
          )}

          {userData && (
            <div className="lg:col-span-2">
              <Repositories
                repos={filteredRepos}
                languages={languages}
                sortOption={sortOption}
                languageFilter={languageFilter}
                onSortChange={setSortOption}
                onLanguageFilterChange={setLanguageFilter}
                darkMode={darkMode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
