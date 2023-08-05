import { ChangeEvent } from "react";

interface SearchInput {
  minsks: number;
  maxsks: number;
  jurusan: string;
  fakultas: string;
  semester: number;
}

interface InputMatProps {
  searchInput: SearchInput;
  onSearchInputChange: (
    field: keyof SearchInput,
    value: string | number
  ) => void; // Accepts both string and number
  onGetResponse: () => void; // Assuming this is the getResponse function you want to trigger
}

const FindCourse = ({
  searchInput,
  onSearchInputChange,
  onGetResponse,
}: InputMatProps) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: keyof SearchInput
  ) => {
    const newValue =
      field === "minsks" || field === "maxsks" || field === "semester"
        ? parseInt(event.target.value)
        : event.target.value.toString();

    onSearchInputChange(field, newValue);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <div>
        <h3>Search Course</h3>
        <div>
          <p>
            Min SKS:
            <input
              type="number"
              value={searchInput.minsks}
              onChange={(event) => handleInputChange(event, "minsks")}
              placeholder="Min SKS"
              className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
            />
          </p>
        </div>

        <p>
          Max SKS:
          <input
            type="number"
            value={searchInput.maxsks}
            onChange={(event) => handleInputChange(event, "maxsks")}
            placeholder="Max SKS"
            className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
          />
        </p>

        <p>
          Jurusan:
          <input
            type="text"
            value={searchInput.jurusan}
            onChange={(event) => handleInputChange(event, "jurusan")}
            placeholder="Jurusan"
            className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
          />
        </p>

        <p>
          Fakultas:
          <input
            type="text"
            value={searchInput.fakultas}
            onChange={(event) => handleInputChange(event, "fakultas")}
            placeholder="Fakultas"
            className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
          />
        </p>

        <p>
          Semester:
          <input
            type="number"
            value={searchInput.semester}
            onChange={(event) => handleInputChange(event, "semester")}
            placeholder="Semester"
            className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
          />
        </p>
      </div>
      <button
        onClick={() => {
          onGetResponse(); // Trigger the getResponse function
        }}
        className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-[130px] h-[47px] py-2 px-6 rounded-md text-white font-medium text-[20px] hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
      >
        Submit
      </button>
    </div>
  );
};

export default FindCourse;
