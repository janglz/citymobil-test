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
            /**
             * TODO:
             * поиск через регулярки, например, чтобы можно было найти авто по марке и модели через пробел
             * 
            */

            setIsLoading(true);
            setFilteredBy(inputValue)
            
            // console.log(filteredBy)
            const filtered = allCars
                .filter(car => Object.values(car)
                .some(field => {
                    if (!filteredBy) return true 
                    return String(field).toLowerCase().indexOf(filteredBy.toLowerCase()) !== -1
                })
            )
            setFilteredCars(filtered)
            setIsLoading(false);
            
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

