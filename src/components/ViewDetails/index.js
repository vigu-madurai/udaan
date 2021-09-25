import React, { useState } from 'react';

const ViewDetails = ({ data }) => {
    
    return (
        <>
            <div className="view-wrapper">
                {JSON.stringify(data)}
            </div>
        </>
    )
}

export default ViewDetails;