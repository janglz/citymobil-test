import { useEffect, useContext } from 'react'
import { Context } from '../state/context';
import Loader from './Loader'
import arrow from '../images/arrow-down.svg'


function Table() {
    const { sortedBy, setSortedBy, setFilteredCars, filteredCars, isLoading, setIsLoading, filteredBy, allCars, setSelectedAuto } = useContext(Context);

    const handleChange = (e) => {
        const sortBy = sortedBy === 'alphabet' ? 'alphabet-reversed' : 'alphabet' ;
        setSortedBy(sortBy)
    }

    const handleSelectCar = (car) => setSelectedAuto(car)

    /**
     * TODO:
     * поиск через регулярки, например, чтобы можно было найти авто по марке и модели через пробел
     * 
    */

    useEffect(()=>{
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
        [filteredBy, allCars, setFilteredCars, setIsLoading, filteredCars]
    )

    useEffect(() => {
            setIsLoading(true);
            const sorted = filteredCars
                .sort((a, b) => sortedBy === 'alphabet' ? (a.mark > b.mark ? 1 : - 1) : (b.mark > a.mark ? 1 : -1))
            setFilteredCars(sorted)
            setIsLoading(false);
        },
        [sortedBy, setFilteredCars, filteredCars, setIsLoading],
    );

    const rows = filteredCars && filteredCars.map(car=>{
        const year = car.year
        return (
            <div 
                // data={car}
                className="row" 
                key={`${car.mark}_${car.model}`} 
                onClick={async () => await handleSelectCar(car)}
            >
                <div className="col c25 align-left">{car.mark} {car.model}</div>
                <div className="col c25">{year.economYear}</div>
                <div className="col c25">{year.comfortYear}</div>
                <div className="col c25">{year.comfortPlusYear}</div>
                <div className="col c25">{year.minivanYear}</div>
                <div className="col c25">{year.businessYear}</div>
            </div>
        )
    })

    const iconClass = sortedBy === 'alphabet' ? "thead-icon reversed" : "thead-icon"

    const table = (
        <div className="table">
            <div className="row header">
                <div className="col c25 align-left hoverable" onClick={handleChange}>
                    Марка и модель
                    <img className={iconClass} src={arrow} alt="&#9660;"/>
                </div>
                <div className="col c25">Эконом</div>
                <div className="col c25">Комфорт</div>
                <div className="col c25">Комфорт +</div>
                <div className="col c25">Минивэн</div>
                <div className="col c25">Бизнес</div>
            </div>
            {rows}
        </div> 
    )

    return (
        <div className="wrapper">
        <Context.Consumer>
            {()=> isLoading ? <Loader /> : table} 
        </Context.Consumer>
        </div>
    )
}

export { Table }