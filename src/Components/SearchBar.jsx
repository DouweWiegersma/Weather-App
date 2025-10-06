import {useState} from "react";

    function SearchBar({onSearch}) {
        const [city, setCity] = useState('');

        function handleClick(e){
            if (city.trim() !== "") {
                onSearch(city)
                e.preventDefault()
            }
        }

        function handleKeyDown(e) {
            if (e.key === "Enter" && city.trim() !== "") {
                e.preventDefault();
                onSearch(city);
            }

        }
        return (
            <div className='relative flex justify-center align-middle'>

                <form
                    id='searchBar'
                    className='flex flex-col items-center justify-center gap-3 md:flex-row md:w-1/2'>

                <input
                    placeholder='Search for a place...'
                    className='pl-10 border-2 border-gray-600 bg-gray-500 p-3 w-11/12 rounded-lg text-white text-2xl focus:outline-none'
                    type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}/>


                <button
                    type='button'
                    className='border-2 border-blue-800 bg-blue-600 p-3 w-11/12 rounded-lg text-white text-2xl focus:outline-none
                    sm:w-36'
                    onClick={handleClick}>Search</button>
                </form>

            </div>
        );
    }
export default SearchBar;