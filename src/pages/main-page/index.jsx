import React from 'react';
import LocationForm from '../../components/location-form';
import ResidentsList from '../../components/residents-list';

function MainPage() {
    return (
        <>
            <LocationForm />
            <ResidentsList />
        </>
    )
}

export default MainPage;