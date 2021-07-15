import { useEffect, useContext } from 'react'
import { Context } from '../state/context';
import Loader from './Loader'
import arrow from '../images/arrow-down.svg'


function Table() {
    const { sortedBy, setSortedBy, setFilteredCars, filteredCars, isLoading, setIsLoading } = useContext(Context);
    // const [sortedBy, setSortedBy]

    const handleChange = (e) => {
        const sortBy = sortedBy === 'alphabet' ? 'alphabet-reversed' : 'alphabet' ;
        setSortedBy(sortBy)
        // console.log(sortedBy)
    }

    useEffect(
        () => {
            setIsLoading(true);
            const sorted = filteredCars
                .sort((a, b) => sortedBy === 'alphabet' ? (a.mark > b.mark ? 1 : - 1) : (b.mark > a.mark ? 1 : -1))
            // console.log(sorted)
            setFilteredCars(sorted)
            setIsLoading(false);
        },
        [sortedBy, setFilteredCars, filteredCars, setIsLoading],
    );

    const rows = filteredCars && filteredCars.map(car=>{
        return (
            <div className="row" key={`${car.mark}_${car.model}`}>
                <div className="col c25 align-left">{car.mark} {car.model}</div>
                <div className="col c25">{car.economYear}</div>
                <div className="col c25">{car.comfortYear}</div>
                <div className="col c25">{car.comfortPlusYear}</div>
                <div className="col c25">{car.minivanYear}</div>
                <div className="col c25">{car.businessYear}</div>
            </div>
        )
    })

    const iconClass = sortedBy === 'alphabet' ? "thead icon" : "thead icon reversed"

    const table = (
        <div className="table">
            <div className="row header">
                <div className="col c25 hoverable" onClick={handleChange}>
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