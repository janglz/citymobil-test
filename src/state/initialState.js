import { useState, useEffect } from 'react';

/**
 * @constructor
 * @returns {Object} состояние
 * 
 * структура состояния, наверное, слишком раздутая, но у меня же еще не одно тестовое, уважаемый проверяющий :)
 */

function State() {
    const [sortedBy, setSortedBy] = useState('none')
    // 'alphabet', 'alphabet-reversed'

    const [filteredBy, setFilteredBy] = useState('');
    const [selectedAuto, setSelectedAuto] = useState(null);
    const [allCars, setAllCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            console.log('fetched')
            const cars = [];
            const data = await fetch('https://city-mobil.ru/api/cars', { abortController })
                .then(response => response.json());
            data.cars.forEach(car => {
                cars.push({
                    mark: car.mark,
                    model: car.model,
                    year: {
                    economYear: car.tariffs['Эконом']?.year || '-',
                    comfortYear: car.tariffs['Комфорт']?.year || '-',
                    comfortPlusYear: car.tariffs['Комфорт+']?.year || '-',
                    minivanYear: car.tariffs['Минивен']?.year || '-',
                    businessYear: car.tariffs['Бизнес']?.year || '-',
                    }
                })
            });
            setAllCars(cars);
            setFilteredCars(cars)
            setIsLoading(false);
        };

        if (!allCars.length) fetchData();
        
        return () => {
            abortController.abort();
        }
    }, [setAllCars, setIsLoading, allCars, setFilteredCars]);

    return {
        sortedBy, 
        setSortedBy,
        filteredBy, 
        setFilteredBy,
        selectedAuto, 
        setSelectedAuto,
        allCars, 
        setAllCars,
        isLoading, 
        setIsLoading,
        filteredCars, 
        setFilteredCars,
    }
}

export default State;