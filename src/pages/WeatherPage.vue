<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="background-image">
        <q-card class="weather-card">
          <q-card-section>
            <div class="header">
              <h2 class="text-center">Weather Forecast</h2>
              <q-input v-model="city" placeholder="Enter the Location" class="city-input" />
              <q-btn class="search-btn" label="Search" @click="fetchWeather" />
            </div>
          </q-card-section>
          <q-card-section v-if="weather" class="main-weather">
            <div class="weather-now">
              <div class="weather-info">
                <p class="current-time">Current Weather<br>{{ currentTime }}</p>
                <p class="temperature">{{ weather.main.temp }}°C</p>
                <p class="location">{{ weather.name }}, {{ weather.sys.country }}</p>
                <p class="description">{{ weather.weather[0].description }}</p>
                <div class="weather-icon">
                  <i :class="weatherIconClass"></i>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="error">
            <p class="text-red-5">{{ error }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios';

export default {
  name: 'WeatherPage',
  data() {
    return {
      city: '',
      weather: null,
      error: '',
      currentTime: '',
    };
  },
  methods: {
    async fetchWeather() {
      const apiKey = '94bf6d59f86ae95e8071e78240546056';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;
      try {
        const response = await axios.get(url);
        this.weather = response.data;
        this.error = ''; // Reset error message if successful
        this.updateCurrentTime();
      } catch (error) {
        this.error = 'City not found'; // Set error message
        console.error(error);
      }
    },
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    },
  },
  computed: {
    weatherIconClass() {
      if (!this.weather) return ''; // Handle when weather data is not yet fetched
      // Determine weather condition and return appropriate Font Awesome class
      const weatherId = this.weather.weather[0].id;
      if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        return 'fas fa-bolt';
      } else if (weatherId >= 300 && weatherId < 600) {
        // Rain
        return 'fas fa-cloud-showers-heavy';
      } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        return 'fas fa-snowflake';
      } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (e.g., fog, haze)
        return 'fas fa-smog';
      } else if (weatherId === 800) {
        // Clear
        return 'fas fa-sun';
      } else if (weatherId > 800) {
        // Clouds
        return 'fas fa-cloud';
      } else {
        return ''; // Default icon if condition not matched
      }
    },
  },
  mounted() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 60000); // Update time every minute
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.q-page {
  background-image: url('https://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Image-HD.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  position: relative;
  z-index: 2;
}

.weather-card {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.846);
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.city-input {
  margin-top: 10px;
  width: 100%;
}

.search-btn {
  margin-top: 10px;
  background-color: #00aaff;
  color: #ffffff;
  width: 100%;
}

.main-weather {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.weather-now {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-info {
  text-align: center;
}

.current-time {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.temperature {
  font-size: 2.5rem;
}

.location {
  font-size: 1.2rem;
}

.description {
  margin-bottom: 20px;
}

.weather-icon {
  font-size: 3rem;
  margin-top: 10px;
}

.weather-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.details-left,
.details-right {
  flex: 1;
}

.text-red-5 {
  color: #f44336;
  text-align: center;
}

.text-center {
  text-align: center;
}

.q-chip {
  margin-top: 10px;
}

</style>
