addEventListener("DOMContentLoaded", (event) => {

    // Get Elements By ID
    const submitForm = document.getElementById("weather-form");
    const cityId = document.getElementById("city-id");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");

    // Listen To The Form
    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const cityValue = cityId.value;

        if (cityValue.trim() === "") {
            alert("Please Enter Your City");
            return;
        }

        // Fetch The Data
        fetch("/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                city: cityValue
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Update the DOM with fetched data
            cityName.textContent = data.city;
            temperature.textContent = data.temp + " °C";
            description.textContent = data.description;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Sorry, there was a problem fetching the weather.");
        });
        
    });

});
