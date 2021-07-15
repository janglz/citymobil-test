import { useState, useEffect } from 'react';


function State() {
    const [sortedBy, setSortedBy] = useState('alphabet')
    // 'alphabet', 'alphabet-reversed'

    const [filteredBy, setFilteredBy] = useState('');
  
    // const setFilteredByImmediate = useEffect((smthn)=> setFilteredBy(smthn), [])
    const [selectedAuto, setSelectedAuto] = useState(null);
    const [allCars, setAllCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCars, setFilteredCars] = useState([]);

    // useEffect(
    //     () => {
    //       const subscription = props.source.subscribe();
    //       return () => {
    //         subscription.unsubscribe();
    //       };
    //     },
    //     [props.source],
    //   );

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
                    economYear: car.tariffs['Эконом']?.year || '-',
                    comfortYear: car.tariffs['Комфорт']?.year || '-',
                    comfortPlusYear: car.tariffs['Комфорт+']?.year || '-',
                    minivanYear: car.tariffs['Минивэн']?.year || '-',
                    businessYear: car.tariffs['Бизнес']?.year || '-',
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
    }, [setAllCars, setIsLoading, allCars]);

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
        // setFilteredByImmediate: setFilteredByImmediate(),
    }
}

export default State;