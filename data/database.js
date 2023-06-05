import * as SQLite from "expo-sqlite";
import Place from "../models/place";

const database = SQLite.openDatabase("places.db");

// initialize
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                user_id INTEGER NOT NULL,
                time TEXT NOT NULL,
                files TEXT NOT NULL,
                point TEXT NOT NULL,
                postal_code TEXT NOT NULL,
                postal_address TEXT NOT NULL,
                water_counter_number TEXT NOT NULL,
                electrtic_counter_number TEXT NOT NULL,
                gas_counter_number TEXT NOT NULL,
                phone TEXT NOT NULL,
                owner TEXT NOT NULL,
                property_type TEXT NOT NULL,
                usage_type TEXT NOT NULL,
                status TEXT NOT NULL
            )`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// insert
export const insertPlace = (place) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (user_id , time , files , point , postal_code , postal_address , watere_counter_number , electric_counter_number , gas_counter_number , phone , owner , property_type , usage_type , status)`,
                [
                    place.user_id,
                    place.time,
                    place.files,
                    place.point,
                    place.postal_code,
                    place.postal_address,
                    place.water_counter_number,
                    place.electric_counter_number,
                    place.gas_counter_number,
                    place.phone,
                    place.owner,
                    place.property_type,
                    place.usage_type,
                    place.status,
                ],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// fetch all
export const fethPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = [];
                    for (const dp of result.rows._array) {
                        places.push(
                            new Place(
                                dp.id,
                                dp.user_id,
                                dp.time,
                                dp.files,
                                dp.point,
                                dp.postal_code,
                                dp.postal_address,
                                dp.water_counter_number,
                                dp.electric_counter_number,
                                dp.gas_counter_number,
                                dp.phone,
                                dp.owner,
                                dp.property_type,
                                dp.usage_type,
                                dp.status
                            )
                        );
                    }
                    resolve(places);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// fetch details of one place
export const fetchPlaceDetails = (id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ? `,
                [id],
                (_, result) => {
                    const dbPlace = result.rows._array[0];
                    const place = new Place(
                        dbPlace.id,
                        dbPlace.user_id,
                        dbPlace.time,
                        dbPlace.files,
                        dbPlace.point,
                        dbPlace.postal_code,
                        dbPlace.postal_address,
                        dbPlace.water_counter_number,
                        dbPlace.electric_counter_number,
                        dbPlace.gas_counter_number,
                        dbPlace.phone,
                        dbPlace.owner,
                        dbPlace.property_type,
                        dbPlace.usage_type,
                        dbPlace.status
                    );
                    resolve(place);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};
