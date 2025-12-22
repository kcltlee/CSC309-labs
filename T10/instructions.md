# T10: React Router

In this tutorial, you'll create a weather application using React, fetching data from various API endpoints. The application will feature two pages: a Home page displaying multiple cities and their temperatures, and a Detail page providing detailed weather information for a specific city.

Learning Goals
Working with an existing React project
Creating a multi-page web applications with React Router
Making efficient API calls with useEffect
Setup
Log in to MarkUs and go to CSC309. You will find the starter files for this tutorial under the T10 assignment. Add the starter files to you repository. Note that this time, the starter code was created with the command npm create vite@latest weather. You will find the following folders and files:

index.html: The main HTML template file that serves as the starting point for a React application.
public/: Folder containing static assets, e.g., the favicon for the website.
vite.config.js: Used to configure Vite-specific settings. 
src/*.css, src/*/*.css: The stylesheets associated with each component. We will not explain each one for brevity.
src/: This directory contains the source code for your app (components and their stylings).
App.jsx: This is the main component of your app, serving as the entry point for our UI. The App component contains all the other components in your project.
main.jsx: This file is often the entry point for our JavaScript code, where we import and render the main App component (we don't usually change this).
src/components: This directory contains the source code for each reusable component. Notice that it is organized differently this time, in contrast with T9.
AddCity.jsx: Contains an HTML dialog for adding a new city.
City.jsx: Displays a city's temperature information.
Layout.jsx: Provides the overall layout and styling for the application.
src/pages: This directory contains the source code for each page of the website.
Home.jsx: The home page, which displays a list of cities and their temperature.
Detail.jsx: The detail page for a specific city, which displays more weather data.
NotFound.jsx: This page is displayed when the specified URL is not found.
src/contexts: This directory contains the source code for React contexts, which manage global state and share data across different components.
CitiesContext.jsx: The context definition for a list of cities and its mutators.
package.json, .gitignore: the usual.
Demo



(I deleted Mars after realizing this was not the Mars I was looking for 🙂)

Install Packages
Simply run the following command to install all required packages:

npm install
Starting the development server
Use the following command to run the development server. Note that the command is different now that we are using Vite:

npm run dev
Next, open your browser and visit http://localhost:5173/. to see the starting point of the Weather app that you will complete for this tutorial.

Your Tasks
The starter code already contains most of the code and all of the styling for the Weather app. Your objectives are to do some refactoring and make API calls to implement the functionalities of this website. Specifically, you will make API endpoint calls to:

Open-Meteo: A free weather API that does not require an API key to use to get weather information.
Nominatim: An open-source API that uses OpenStreetMap data to find geocoding information.
You're encouraged to make a mock API first to develop and test the frontend independently.

Since most of the component code has been completed for you, if you find yourself making substantial changes to any component except App, then you are likely on the wrong track.

Task 1
Currently, the website does not support specific URLs, meaning any URL, such as /foobar, will work. Refactor the code to integrate React Router in the App component. The Home component should be rendered at the root URL (/), and the Detail component should be rendered at /:cityId. If the URL does not match either of these routes, display the NotFound component, e.g.:

const App = () => {
    return <CitiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                ...
            </Routes>
        </BrowserRouter>
    </CitiesProvider>;
};
We will talk about what CitiesProvider does later.
In addition, when switching between pages, no hard reload should occur. This will require you to use the <Link> component from React Router, or useNavigate(), if navigation is triggered inside an event handler, i.e., while running JavaScript code. For example, in the Layout component, the link in the header bar should be updated to this snippet of code:

<Link to="/" className="link">CSC309: Tutorial 10</Link>
Lastly, take advantage of <Outlet /> in React Router so that we can render pages inside a common component. Instead of passing pages as a prop to Layout, replace children with the outlet, i.e.:

// in src/components/Layout.jsx

<main>
    <Outlet />
</main>
You will need to update the App component to allow child routes to be rendered within a parent route.

Task 2
At the moment, on the Home page, retrieval of current temperature information is not implemented. Your objective is to complete the City component in src/components/City.jsx, so that temperature information is fetched for a specific city. To do this, first note the format of a city object, e.g.:

// in src/contexts/CitiesContext.jsx

{ id: 1, name: "Toronto", latitude: 43.70011, longitude: -79.4163 }
Then, you are required to use the fetch API to make a request to the following API endpoint:

https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true
${latitude} and ${longitude} should be that of the city prop. Place the API call inside a useEffect hook to ensure that we only do it once: when the component is first mounted.

Please study the following API documentation for the output format:

https://open-meteo.com/en/docs
removeCity
Notice that for each city card, there is a remove button at the top right corner. However, this currently does not work. You can implement this functionality by defining a removeCity function inside CitiesProvider, which you can find in src/contexts/CitiesContext.jsx. Update the provider function so that it now ends with the following snippet of code:

const removeCity = (cityId) => {
    setCities(cities.filter((city) => city.id !== cityId));
};

return (
    <CitiesContext.Provider value={{ cities, removeCity }}>
        {children}
    </CitiesContext.Provider>
);
Then, in the City component, you can "import" this function by adding this line of code to the top of the component:

const { removeCity } = useCities();
Finally, you can update the remove button so that it will call this context function.

<button className="remove-btn" onClick={() => removeCity(city.id)}>×</button>
Task 3
If you click on the city card, e.g., for Toronto, it should take you to http://localhost:5173/1 (if not, you messed up Task 1), which is the detail page for Toronto. However, similar to the start of Task 2, none of the weather data are currently fetched from the API endpoint. In the Weather component of src/pages/Detail.jsx, you are required to use the fetch API to make a request to the following API endpoint:

https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation_probability
Task 4
For your last task, you are asked to implement fetching the coordinates of a city by name, so that the user can add a new city to the list of cities. Before that, let's discuss a new hook that may be unfamiliar to you.

useRef()
In src/pages/Home.jsx, the useRef hook creates a reference to an HTML element that is NOT managed by React, i.e., its state is managed by the DOM itself. This is known as an uncontrolled component. For an HTML dialog, it makes sense to control the element directly, so that we do not need to create an additional state to determine whether it is currently open or closed. We use the ref attribute in the <dialog> element to create a reference to the dialog that persists across renders, so that we can control it directly by calling its close() and showModal() methods. Note that similar techniques can be used to make uncontrolled input components.

Since our dialog element is actually a part of the AddCity component in src/components/AddCity.jsx, we need to use the forwardRef wrapper function to pass the reference up to the Home component, so that clicking on the "Add City" button will correctly open the dialog box for adding a new city.

useRef has other usages, e.g., to cache values or to reference a value not used for rendering. For further reading, please consult: https://react.dev/reference/react/useRef
AddCity.jsx
In the AddCity component, you are required to use the fetch API to make a request to the following API endpoint:

https://nominatim.openstreetmap.org/search?format=json&q=${city_name}&limit=1
Notice that we set the limit argument to 1, so that the endpoint will only return the top result. We will assume that the top result contains the coordinates of the city that we wish to add to our list of cities. Please study the following reference manual for the output format:

https://nominatim.org/release-docs/develop/api/Search/
Note that we should not make an API call if the city name is empty after trimming, i.e., after removing leading and trailing spaces. If the aforementioned situation occurs, call the setError function with the message "City name cannot be blank."

If the search result is empty, call the setError function with the message `City '${city_name}' is not found.` (city_name is the name of the city after trimming).

IMPORTANT:

You may need to specify a "User-Agent" in the request header, otherwise you might be receiving a 403 error (especially when you are testing the API on Postman). You may use this User-Agent: 'ACoolWeatherApp/0.1 (your_email)'

There are some other options as well, such as https://geocoding-api.open-meteo.com/v1/searchLinks to an external site., but for this tutorial, we're using nominatim APIs to get the geolocation.

CitiesContext.jsx
Similar to Task 2, we need a way to add a city and its coordinates to the list of cities. Create an addCity function in CitiesProvider and make it available to all components. Use addCity to complete Task 4, by adding the city with its latitude and longitude to the list. Note that you need to way to ensure that the id of each city in the array is both stable and unique (for the duration of the application, since all of our data is in-memory, and will be reset upon next hard reload).

Submission
We will be looking for the following files in the T10 directory of your repository:

src/App.jsx
src/components/AddCity.jsx
src/components/City.jsx
src/components/Layout.jsx
src/pages/Home.jsx
src/pages/Detail.jsx
src/contexts/CitiesContext.jsx
We will be using a testing framework, e.g., vitest, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.

