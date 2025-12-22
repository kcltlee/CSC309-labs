import './City.css';
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const City = ({ city }) => {
    const [temperature, setTemperature] = useState(null);
    const navigate = useNavigate();
    const { removeCity } = useCities();

    // TODO: complete me
    // HINT: fetch the current temperature of the city from Open-Meteo

    const handle_click = () => {
        navigate(`/${city.id}`);
    };

    const fetchTemperature = async () => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
        const data = await response.json();
        console.log(data);
        setTemperature(data.current_weather.temperature);
    }

    useEffect(() => {
        fetchTemperature();
    }, []);

    return (
        <div className="city-card">
            <button className="remove-btn" onClick={() => removeCity(city.id)}>×</button>
            <div className="city-content" onClick={handle_click}>
                <h2>{city.name}</h2>
                {temperature !== null ? (
                    <p className="temperature">{temperature}°C</p>
                ) : (
                    <div className="spinner"></div>
                )}
            </div>

        </div>
    );
};

export default City;