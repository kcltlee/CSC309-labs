import './AddCity.css';
import { forwardRef, useState } from "react";
import { useCities } from "../contexts/CitiesContext"; // need context to add city to cities list


const AddCity = forwardRef(({ setError }, ref) => {
    const [cityName, setCityName] = useState("");
    const { addCity } = useCities();


    /* Info: useRef
    Gives you a pointer to a real HTML element. 
    Lets you call browser functions like showModal().
    Does NOT cause re-renders like state. 
    uncontrolled component:
    The DOM manages its own state (like open/closed).
    React does not track it.
    forwardRef
    Allows a parent component to get the ref of a child's element.
    */

    const handle_submit = async (e) => {
        e.preventDefault(); 
        setError(""); // reset error message

        // HINT: fetch the coordinates of the city from Nominatim,
        // then add it to CitiesContext's list of cities.

        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}&limit=1`);
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
            setError(`City '${cityName}' is not found.`);
            return null;
        }

        const { lat, lon } = data[0];
        console.log(`Coordinates of ${cityName}: ${lat}, ${lon}`);

        addCity(cityName, Number(lat), Number(lon)); // add city to cities list
        
        // reset form
        setCityName("");
        ref.current?.close();
    };

    return (
        <dialog ref={ref}>
            <div className="dialog-header">
                <span>Add A City</span>
                <a onClick={() => ref.current?.close()}>✖</a>
            </div>

            <form onSubmit={handle_submit}>
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                />
                
                <div className="button-group">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => ref.current?.close()}>
                        Close
                    </button>
                </div>
            </form>
        </dialog>
    );
});

export default AddCity;
