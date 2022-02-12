import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import './index.scss';
import ResidentCard from '../resident-card';
import ResidentForm from '../resident-form';

function ResidentsList() {
    const { residents } = useSelector((state) => state.residents);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { selectedHouse, selectedStreet, selectedFlat } = useSelector((state) => state.locations);
    return (
        <>
            {selectedFlat ?
                <>
                    <div>
                        <h2>{
                            `ул. ${JSON.parse(selectedStreet).name}, д. ${JSON.parse(selectedHouse).name}, кв. ${JSON.parse(selectedFlat).name}`}
                        </h2>
                        <div>
                            <Button onClick={showModal}>Добавить жильца</Button>
                        </div>
                        <div className='residents-div'>
                            {residents ?
                                residents.map((resident) =>
                                    <ResidentCard
                                        resident={resident}
                                        flatId={JSON.parse(selectedFlat).id}
                                        key={resident.id}
                                    />) :
                                <h3>
                                    Привязанных жильцов нет
                                </h3>}
                        </div>
                    </div>
                    <ResidentForm
                        modalData={{ isModalVisible, handleOk, handleCancel }}
                        flatId={JSON.parse(selectedFlat).id} />
                </> : <></>}
        </>
    )
}

export default ResidentsList;