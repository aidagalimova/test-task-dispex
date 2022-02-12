import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { deleteResident } from '../../services/residents';
import { useDispatch } from 'react-redux';
import ResidentForm from '../resident-form';

function ResidentCard({ resident, flatId }) {
    const dispatch = useDispatch();
    const onDelete = async (id) => {
        dispatch(deleteResident(id, flatId))
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changingResident, setChangingResident] = useState(null);
   
    const showModal = (resident) => {
        setIsModalVisible(true);
        setChangingResident(resident)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Card title={resident.name || ''} style={{ width: 300 }}>
                {resident.email ? <p>{`Email: ${resident.email}`}</p> : <></>}
                <p>{`Номер: ${resident.phone}`}</p>
                <Button className='res-button' onClick={() => showModal(resident)}>Изменить</Button>
                <Button className='res-button' onClick={() => onDelete(resident.bindId)}>Удалить</Button>
            </Card>
            <ResidentForm
                modalData={{ isModalVisible, handleOk, handleCancel }}
                flatId={JSON.parse(flatId)}
                resident={changingResident} />
        </>
    )
}

export default ResidentCard;