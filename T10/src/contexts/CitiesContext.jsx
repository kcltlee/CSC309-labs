import { createContext, useContext, useState } from "react";
import { useRef } from "react";

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
    const [cities, _setCities] = useState([
        { id: 1, name: "Toronto", latitude: 43.70011, longitude: -79.4163 }
    ]);
    const initialCities = [
        { id: 1, name: "Toronto", latitude: 43.70011, longitude: -79.4163 }
    ];

    // Persist next id across renders to avoid duplicate keys
    const nextIdRef = useRef(initialCities.reduce((max, c) => Math.max(max, c.id), 0) + 1);

    const removeCity = (id) => {
        _setCities(cities.filter(city => city.id !== id));
    }

    const addCity = (name, latitude, longitude) => {
        _setCities((prev) => {
            const newCity = { id: nextIdRef.current, name, latitude, longitude };
            nextIdRef.current += 1;
            return [...prev, newCity];
        });
    };

    return (
        <CitiesContext.Provider value={{ cities, removeCity, addCity /* ADD MORE GLOBALS */ }}>
            {children}
        </CitiesContext.Provider>
    );
};

export const useCities = () => {
    return useContext(CitiesContext);
};
