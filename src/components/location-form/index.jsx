import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import getStreets, { getFlats, getHouses } from "../../services/locations";
import { setFlat, setHouse, setStreet } from "../../store/actions/locations";
import './index.scss';
import { getResidents } from "../../services/residents";
const { Option } = Select;

function LocationForm() {
  const dispatch = useDispatch();
  const {
    streets,
    houses,
    flats,
    selectedHouse,
    selectedStreet,
    selectedFlat
  } = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getStreets());
  }, []);

  const handleStreetChange = (value) => {
    dispatch(setStreet(value))
    dispatch(getHouses(JSON.parse(value).id))
    dispatch(setHouse(null))
    dispatch(setFlat(null))
  };
  
  const handleHouseChange = (value) => {
    dispatch(setHouse(value));
    dispatch(getFlats(JSON.parse(value).id))
    dispatch(setFlat(null))
  };

  const handleFlatChange = (value) => {
    dispatch(setFlat(value));
    dispatch(getResidents(JSON.parse(value).id));
  };

  const streetsEls = () =>
    streets.map((street) => (
      <Option key={street.id} value={JSON.stringify(street)}>
        {street.name}
      </Option>
    ));

  const housesEls = () =>
    houses.map((house) => (
      <Option key={house.id} value={JSON.stringify(house)}>
        {house.name}
      </Option>
    ));

  const flatsEls = () =>
    flats.map((flat) => (
      <Option key={flat.id} value={JSON.stringify(flat)}>
        {flat.name}
      </Option>
    ));
  const props = {
    suffixIcon: null,
    showSearch: true,
    filterOption: (input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  };
  return (
    <>
      <Form>
        <h2>Адрес</h2>
        <Form.Item>
          <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            placeholder="Улица"
            onChange={handleStreetChange}
            value={selectedStreet && JSON.parse(selectedStreet).name}
            className="street"
          >
            {streetsEls()}
          </Select>
        </Form.Item>

        <Form.Item>
          <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            disabled={selectedStreet === null}
            placeholder="Дом"
            onChange={handleHouseChange}
            value={selectedHouse}
          >
            {housesEls()}
          </Select>
        </Form.Item>

        <Form.Item>
          <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            disabled={selectedHouse === null}
            placeholder="Кв./Офис"
            onChange={handleFlatChange}
            value={selectedFlat}
          >
            {flatsEls()}
          </Select>
        </Form.Item>

      </Form>
    </>
  );
}

export default LocationForm;
