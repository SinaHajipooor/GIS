class Place {
    constructor(id, user_id, time, files, point, postal_code, postal_address, water_counter_number, electric_counter_number, gas_counter_number, phone, owner, property_type, usage_type, status) {
        this.id = id;
        this.user_id = user_id;
        this.time = time;
        this.files = files;
        this.point = { lat: point.lat, lng: point.lng };
        this.postal_code = postal_code;
        this.postal_address = {
            state: postal_address.state,
            city: postal_address.city,
            mainStreet: postal_address.mainStreet, // khiabane asli
            bystreet: postal_address.bystreet, // khiabane farii
            lane: postal_address.lane, //kooche
            floor: postal_address.floor, // tabaqe
            unit: postal_address.unit, // vahed
            plate: postal_address.plate, // pelak
        };
        this.water_counter_number = water_counter_number;
        this.electric_counter_number = electric_counter_number;
        this.gas_counter_number = gas_counter_number;
        this.phone = phone;
        this.owner = { ownerFirstName: owner.firstname, ownerLastName: owner.lastname, ownerNationalCode: owner.nationalCode };
        this.property_type = property_type;
        this.usage_type = usage_type;
        this.status = status;
    }
}

export default Place;
