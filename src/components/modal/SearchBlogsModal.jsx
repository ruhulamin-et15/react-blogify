import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/icons/close.svg";
import useAxios from "../../hooks/useAxios";
import useDebounce from "../../hooks/useDebounce";
const SearchBlogsModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/search?q=${debouncedSearchTerm}`
        );
        if (response.status === 200) {
          setSearchResults(response.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setSearchResults([]);
          setError(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    };
    if (debouncedSearchTerm) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, api]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleDetailsClick = (id) => {
    navigate(`/blog-details/${id}`);
    onClose(false);
  };

  return (
    <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desire Blogs
          </h3>
          <input
            type="text"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Start Typing to Search"
            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
          />
        </div>
        <div>
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {searchResults.length !== 0 ? (
              <>
                {searchResults?.data.map((result) => (
                  <div
                    key={result?.id}
                    className="flex gap-6 py-2"
                    onClick={() => handleDetailsClick(result?.id)}
                  >
                    <img
                      className="h-28 object-contain max-w-[170px]"
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                        result?.thumbnail
                      }`}
                      alt={result?.title}
                    />
                    <div className="mt-2">
                      <h3 className="text-slate-300 text-xl font-bold">
                        {result?.title}
                      </h3>
                      <p className="mb-6 text-sm text-slate-500 mt-1">
                        {result?.content?.substring(0, 200)}
                        {result?.content?.length > 200 && " ..."}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>{error}</p>
              </>
            )}
          </div>
        </div>
        <button onClick={onClose}>
          <img
            src={CloseIcon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </button>
      </div>
    </section>
  );
};

export default SearchBlogsModal;
