export default async function SearchBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <div className="flex-grow">
        <input
          type="text"
          className="w-3/4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md"
          placeholder="Search for a student..."
        />
      </div>
      <div className="flex items-center"></div>
    </nav>
  );
}
