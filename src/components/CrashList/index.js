import React, { useEffect, useState } from 'react';

const CrashList = ({ accidentList }) => {
    const [alist, setAlist] = useState(accidentList);
    useEffect(() => {
        // setAlist(accidentList)
        renderAlist();
    }, [alist]);

    const renderAlist = () => {
        console.log("renderAlist", alist)
        // if (alist.length) {
            return alist.map((accident) => {
                return (<div key={accident.collision_id} className="card-wrapper">
                    <div className="car-names">Crashed Cars Type: {accident.vehicle_type_code1} & {accident.vehicle_type_code2}
                    </div>
                    <div className="details"><div>{accident.crash_date}
                    </div> {accident.crash_time}</div>
                </div>)
            })
        // }
        // return ""
    }

    return (
        <div className="crash-list-wrapper">
            {renderAlist()}
        </div>
    )
}

export default CrashList;