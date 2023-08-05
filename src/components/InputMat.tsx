import { ChangeEvent } from "react";

interface MatInput {
  nama: string;
  sks: number;
  jurusan: string;
  fakultas: string;
  semester: number;
  prediksi: string;
}

interface InputMatProps {
  searchInput: MatInput;
  onInputChange: (field: keyof MatInput, value: string | number) => void; // Accepts both string and number
  onGetResponse: () => void; // Assuming this is the getResponse function you want to trigger
}

const InputMat = ({
  searchInput,
  onInputChange,
  onGetResponse,
}: InputMatProps) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: keyof MatInput
  ) => {
    const newValue =
      field === "sks" || field === "semester"
        ? parseInt(event.target.value)
        : event.target.value.toString();

    onInputChange(field, newValue);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <div>
        <h3>Add Course</h3>
        <div>
          <p>
            Nama Mata Kuliah:
            <input
              type="text"
              value={searchInput.nama}
              onChange={(event) => handleInputChange(event, "nama")}
              placeholder="Mata Kuliah"
              className="block w-[300px] px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
            />
          </p>
        </div>

        <p>
          SKS:
          <input
            type="number"
            value={searchInput.sks}
            onChange={(event) => handleInputChange(event, "sks")}
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

        <p>
          Prediksi:
          <input
            type="text"
            value={searchInput.prediksi}
            onChange={(event) => handleInputChange(event, "prediksi")}
            placeholder="Prediksi"
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

export default InputMat;
