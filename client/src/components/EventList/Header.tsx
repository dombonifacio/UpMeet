export default function EventInfoPage() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-violet-950 py-4 lg:px-12 border-solid-t-2 ">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="felx items-center flex-shrink-0 text-white mr-16">
            <span className="font-semibold text-xl tracking-tight">JamCon</span>
          </div>
          <div className="block lg:hidden">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns=""
              >
                <title>Menu</title>
                <path d="" />
              </svg>
            </button>
          </div>
        </div>

        <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="text-md font-bold text-white lg:flex-grow">
            <a
              href=""
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
            >
              Sports
            </a>
            <a
              href=""
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
            >
              Arts
            </a>
            <a
              href=""
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
            >
              Family
            </a>
            <a
              href=""
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
            >
              Music
            </a>
          </div>

          <div className="flex space-x-4 relative mx-auto text-gray-600 lg:block">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
              type="search"
              name="seach"
              placeholder="Type an event..."
            />

            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-purple-800 rounded-lg border  hover:bg-purple-950 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only justify-between">Search</span>
            </button>

            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                JA
              </span>
            </div>
          </div>
        </div>
      </nav>
      {/* <p className="text-red-500">Helloooooooooooo</p> */}
    </div>
  );
}
