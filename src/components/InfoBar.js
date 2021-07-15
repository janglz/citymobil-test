import { useContext } from 'react'
import { Context } from '../state/context';

function InfoBar () {
    const { selectedAuto } = useContext(Context);
    const selected = selectedAuto && `Выбран автомобиль ${selectedAuto.mark} ${selectedAuto.model} ${selectedAuto.year} года выпуска`

    return (
        
        <div className="infobar">
            {/* <Context.Consumer> */}
            {selected}
            {/* </Context.Consumer> */}
        </div>
        
    )
}

export default InfoBar