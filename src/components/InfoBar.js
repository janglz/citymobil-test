import { useContext, useEffect } from 'react'
import { Context } from '../state/context';

/**
 * 
 * @returns jsx
 */

function InfoBar () {
    const { selectedAuto, setSelectedAuto } = useContext(Context);

    useEffect(()=>{
        setSelectedAuto(selectedAuto)
    }, [selectedAuto, setSelectedAuto])
    

    // В описании задания указано "по клику на строку" - это значит, что программа сама должна выбирать, 
    // какой год отобразит инфо-панель?  
    const selected = selectedAuto ? (
        <div className="infobar" onClick={()=>setSelectedAuto(null)}>
            <p>{`Выбран автомобиль ${selectedAuto.mark} ${selectedAuto.model} ${Object.values(selectedAuto.year).find(el => el !== '-')} года выпуска`}</p>
        </div>
    ) : ''

    return selected
}

export default InfoBar