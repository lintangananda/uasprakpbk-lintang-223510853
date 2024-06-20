<template>
  <q-page class="weather-page">
    <div class="grid-container">
      <!-- Bagian kiri -->
      <div class="left-box">
        <div class="header">
          <h1>Haloohaa! </h1>
          <div class="centered">
        <q-btn class="weather-button" label="Go to Weather Now !" @click="goToWeather" color="primary" bg-color="#011335" text-color="white" />
    </div>
          <div class="time-info">
            <span>{{ currentTime }}</span>
            <span>{{ currentDate }}</span>
          </div>
        </div>
        <div class="weather-info">
          <div class="current-weather">
            <div class="weather-icon">
              <i class="wi wi-cloudy"></i>
            </div>
            <div class="centered">
        <q-btn class="weather-button" label="Klik This Button Yaa !" @click="goToWeather" color="primary" bg-color="#011335" text-color="white" />
    </div>
            
            
          </div>
          <div class="hourly-forecast">
  <h3>Hourly Forecast</h3>
  <canvas id="hourlyChart"></canvas>
 
</div>


        </div>
      </div>
      
      <!-- Bagian kanan -->
      <div class="right-box">
        <div class="other-info">
          <div class="monthly-rainfall">
            <h2>Monthly Rainfall</h2>
            <canvas id="monthlyChart"></canvas>
          </div>
          <div class="world-weather">
            <h3>World Weather Reader</h3>
            <img src="https://i.pinimg.com/originals/59/4d/16/594d1668b9a974f21f3fbd601c828903.png" alt="World Weather Map">
          </div>
        </div>
        <div class="weekly-forecast">

          <div class="forecast">
            <!-- Daftar ramalan cuaca -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'vue-router';

Chart.register(...registerables);

export default {
  name: 'HomePage',
  setup() {
    const currentTime = ref('');
    const currentDate = ref('');
    const router = useRouter();

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      currentTime.value = `${formattedHours}:${formattedMinutes} ${ampm}`;
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      currentDate.value = now.toLocaleDateString(undefined, options);
    };

    onMounted(() => {
      updateTime();
      setInterval(updateTime, 1000);
    });

    const goToWeather = () => {
      router.push('/weather');
    };

    const renderHourlyChart = () => {
      const ctx = document.getElementById('hourlyChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
          datasets: [{
            label: 'Temperature',
            data: [20, 22, 25, 30, 35, 40, 38, 32, 28, 25],
            borderColor: 'blue',
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    const renderMonthlyChart = () => {
      const ctx = document.getElementById('monthlyChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [{
            label: 'Rain',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
            backgroundColor: 'blue'
          }, {
            label: 'Sun',
            data: [90, 80, 70, 60, 50, 40, 30, 20, 10],
            backgroundColor: 'yellow'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    onMounted(() => {
      renderHourlyChart();
      renderMonthlyChart();
    });

    return {
      currentTime,
      currentDate,
      goToWeather,
      renderHourlyChart,
      renderMonthlyChart,
    };
  }
};
</script>

<style scoped>
.weather-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: rgb(0, 1, 66);
  background-image: url('https://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Image-HD.jpg');
  background-size: cover;
  background-position: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.left-box, .right-box {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.829); /* Transparent blue */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.time-info {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weather {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.weather-icon {
  font-size: 4em;
  margin-right: 20px;
}

.weather-details h2 {
  font-size: 2.5em;
  margin: 0;
}

.weather-details p {
  margin: 5px 0;
}

.hourly-forecast, .monthly-rainfall, .world-weather, .weekly-forecast {
  width: 100%;
  margin-bottom: 20px;
}

.centered {
  display: flex;
  justify-content: center; /* Mengatur konten di tengah secara horizontal */
  align-items: center; /* Mengatur konten di tengah secara vertikal */
  margin-top: auto; /* Untuk menjaga tombol tetap di tengah vertikal */
  margin-bottom: 20px; /* Menambahkan jarak antara tombol dan canvas */
}


.weather-button {
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 1.2em;
}

.world-weather img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
}

.forecast {
  display: flex;
  flex-direction: column;
}

.day {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgba(30, 58, 138, 0.8); /* Transparent blue */
  color: white;
  border-bottom: 1px solid white;
}

.day:last-child {
  border-bottom: none;
}
</style>
