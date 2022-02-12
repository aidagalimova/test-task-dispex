import React from 'react';
import { Modal } from 'antd';
import { Form, Input } from 'antd';
import './index.scss';
import { addResident, changeResident } from '../../services/residents';
import { useDispatch } from 'react-redux';

function ResidentForm({ modalData, flatId, resident }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onResidentAdd = (values) => {
        Object.keys(values).forEach(key => values[key] === undefined ? delete values[key] : {});
        if (!resident) {
            dispatch(addResident(values, flatId))
        } else {
            dispatch(changeResident({ ...values, Id: resident.id, BindId: resident.bindId }, flatId))
        }
        modalData.handleOk()
    }
    return (
        <Modal
            title={resident ? "Изменить данные жильца" : "Добавить жильца"}
            visible={modalData.isModalVisible}
            okText={resident ? "Изменить" : "Добавить"}
            cancelText="Отмена"
            onCancel={modalData.handleCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        console.log(values);
                        form.resetFields();
                        onResidentAdd(values)
                    })
            }}
        >
            <Form form={form}>
                <Form.Item
                    label="Телефон"
                    name="Phone"
                    rules={[{ required: true, message: 'Введите номер телефона' }]}
                    initialValue={resident && resident.phone}
                >
                    <Input addonBefore={`+7`}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="Email" 
                    initialValue={resident && resident.email}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ф.И.О"
                    name="Name"
                    className='name-item'
                    initialValue={resident && resident.name}
                >
                    <Input  />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default ResidentForm;