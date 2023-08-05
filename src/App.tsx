import axios from "axios";
import { useState } from "react";
import FindCourse from "./components/FindCourse";
import InputMat from "./components/InputMat";
import FileInput from "./components/FileInput";
// import InputMat from "./components/inputMat";

interface MatInput {
  nama: string;
  sks: number;
  jurusan: string;
  fakultas: string;
  semester: number;
  prediksi: string;
}

interface SearchInput {
  minsks: number;
  maxsks: number;
  jurusan: string;
  fakultas: string;
  semester: number;
}

interface Output {
  outStr: string;
}

interface Link {
  link: string;
}

interface MatList {
  buffer: MatInput[];
}

function App() {
  const [dataMat, setData] = useState<MatInput>({
    nama: "",
    sks: 0,
    jurusan: "",
    fakultas: "",
    semester: 0,
    prediksi: "",
  });

  const [dataSearch, setDataSearch] = useState<SearchInput>({
    minsks: 0,
    maxsks: 0,
    jurusan: "",
    fakultas: "",
    semester: 0,
  });

  const [linkString, setLinkString] = useState<Link>({
    link: "",
  });

  const [outputString, setOut] = useState("");

  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:8080/";

  const getResponse = async () => {
    setLoading(true);
    try {
      // console.log(dataSearch);
      const response = await axios.post(BASE_URL + "getAnswer", dataSearch);
      const responseData = response.data.result as Output;
      setOut(responseData);
      // console.log(responseData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getResponseAdd = async () => {
    try {
      console.log(dataMat);
      const response = await axios.post(BASE_URL + "addMat", dataMat);
      const responseData = response.data.message as Output;
      console.log(responseData);
    } catch (err) {
      console.error(err);
    } finally {
    }
    // console.log(dataMat);
  };

  const [MatList, SetMatList] = useState<MatList>({
    buffer: [],
  });

  const getResponseFile = async () => {
    if (linkString.link !== "") {
      try {
        const response = await axios.get(linkString.link);
        const jsonData = response.data;

        const newMatList: MatList = {
          buffer: [],
        };

        for (const entity of jsonData) {
          const newMat: MatInput = {
            nama: entity.Nama,
            sks: entity.SKS,
            jurusan: entity.Jurusan,
            fakultas: entity.Fakultas,
            semester: entity.Semester,
            prediksi: entity.Prediksi,
          };

          newMatList.buffer.push(newMat);
        }
        console.log(newMatList);

        SetMatList(newMatList); // Save the new MatList in your state

        console.log("File data processed successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getResponseAllFile = async () => {
    try {
      for (const entity of MatList.buffer) {
        const response = await axios.post(BASE_URL + "addMat", entity);
        const responseData = response.data.message as Output;
        console.log(responseData);
      }
      console.log("All data added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchInputChange = (
    field: keyof SearchInput,
    value: string | number
  ) => {
    setDataSearch({
      ...dataSearch,
      [field]: value,
    });
  };

  const handleMatInputChange = (
    field: keyof MatInput,
    value: string | number
  ) => {
    return Promise.resolve().then(() => {
      setData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    });
  };

  const handleFileSelect = (field: keyof Link, value: string) => {
    setLinkString({
      ...linkString,
      [field]: value,
    });
  };

  const getResponseClear = async () => {
    try {
      const response = await axios.post(BASE_URL + "clearData");
      const responseData = response.data.message as Output;
      console.log(responseData);
    } catch (err) {
      console.error(err);
    } finally {
    }
    // console.log(dataMat);
  };
  return (
    <div className="ml-8">
      <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col md:flex-row justify-start items-center bg-secondaryWhite font-openSans">
        <h2>Course Scheduler</h2>
        <div className="md:w-2/3 w-full md:min-h-full bg-secondaryWhite p-5 flex flex-col justify-center items-center z-[0]">
          <FileInput
            fileInputLink={linkString}
            onFileSelect={handleFileSelect}
          />
          <button onClick={getResponseFile}>Read</button>
          <p>
            <button onClick={getResponseAllFile}>Upload to DB</button>
          </p>
          <InputMat
            searchInput={dataMat}
            onInputChange={handleMatInputChange}
            onGetResponse={getResponseAdd}
          />

          <FindCourse
            searchInput={dataSearch}
            onSearchInputChange={handleSearchInputChange}
            onGetResponse={getResponse}
          />
          {loading ? (
            <p>Loading...</p>
          ) : outputString ? (
            <div
              dangerouslySetInnerHTML={{
                __html: outputString.replace(/\n/g, "<br>"),
              }}
            />
          ) : null}
        </div>
        <p> </p>
        <p> </p>
        <p> </p>
        <p>
          <button onClick={getResponseClear}>Clear Database</button>
        </p>
      </div>
    </div>
  );
}

export default App;
