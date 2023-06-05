import { createContext, useState } from "react";

export const PlaceContext = createContext({
    userInformation: [],
    addUserInformation: (userInfo) => {},
    placeInformation: [],
    addPlaceInformation: (placeInfo) => {},
    furtherInformation: [],
    addFurtherInformation: (furtherInfo) => {},
});

const PlaceContextProvider = ({ children }) => {
    const [userInformation, setUserInformation] = useState({});
    const [placeInformation, setPlaceInformation] = useState({});
    const [furtherInformation, setFurtherInformation] = useState({});
    const addUserInformation = (userInfo) => {
        setUserInformation(userInfo);
    };
    const addPlaceInformation = (placeInfo) => {
        setPlaceInformation(placeInfo);
    };
    const addFurtherInformation = (furtherInfo) => {
        setFurtherInformation(furtherInfo);
    };

    const value = {
        userInformation: userInformation,
        placeInformation: placeInformation,
        furtherInformation: furtherInformation,
        addUserInformation: addUserInformation,
        addPlaceInformation: addPlaceInformation,
        addFurtherInformation: addFurtherInformation,
    };

    return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>;
};

export default PlaceContextProvider;
