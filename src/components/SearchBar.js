import { useEffect, useContext, useState } from 'react'
import { Context } from '../state/context';


function SearchBar () {
    const { filteredBy, setFilteredBy, allCars, setFilteredCars, setIsLoading, filteredCars } = useContext(Context);
    const [inputValue, setInputValue] = useState();
    
    const HandleChange = (e) => {
        const val = e.target.value || ''
        setInputValue(val)
    }

    useEffect(
        () => {
            setIsLoading(true);
            setFilteredBy(inputValue)
        },
        [inputValue, setFilteredBy, filteredBy, allCars, setFilteredCars, setIsLoading, filteredCars],
    );

    return (
        <div className="searchbar">
            <input 
                type="text"
                defaultValue={filteredBy}
                placeholder="Поиск"
                onInput={HandleChange}
            />
            <button className="button">
                Найти
            </button>
        </div>  
    )
}

export { SearchBar }

