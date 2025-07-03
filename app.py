print("HELLO — FLASK FILE IS RUNNING!")


from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = "80a3c5c94fae3956e401fd062012c340"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather', methods=["POST"])
def get_weather():
    data = request.get_json()
    city = data["city"]

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    print("Status Code:", response.status_code)
    print("Response Text:", response.text)

    if response.status_code == 200:
        weather_data = response.json()
        result = {
            "city": city,
            "temp": weather_data["main"]["temp"],
            "description": weather_data["weather"][0]["description"]
        }
    else:
        result = {
            "city": city,
            "temp": None,
            "description": f"City not found or error: {response.text}"
        }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
