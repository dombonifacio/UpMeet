interface NavbarSearchProps {
  handleSearchClick: () => void;
  searchText: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const NavbarSearch = ({
  handleSearchClick,
  handleSearchChange,
  searchText,
}: NavbarSearchProps) => {
  return (
    <>
      <div className="flex gap-x-2">
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          className="text-black p-1"
          value={searchText}
          placeholder="Search for an event"
        ></input>
        <button
          onClick={handleSearchClick}
          className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
        >
          Search
        </button>
      </div>
    </>
  );
};
