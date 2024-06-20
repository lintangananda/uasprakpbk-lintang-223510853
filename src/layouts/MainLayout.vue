<template>
  <q-layout view="hHh lpR fFf">
    <q-header style="background-color: #011335;" elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="text-white left" />
        <q-toolbar-title class="text-white"> UAS PrakPBK Lintang Ananda </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list bordered padding>
        <q-item clickable v-ripple @click="goToTask(1)">Tugas 1</q-item>
        <q-item clickable v-ripple @click="goToTask(2)">Tugas 2</q-item>
        <q-item clickable v-ripple @click="goToTask(3)">Tugas 3</q-item>
        <q-item clickable v-ripple @click="goToTask(4)">Tugas 4</q-item>
        <q-item clickable v-ripple @click="goToTask(5)">Tugas 5</q-item>
        <q-item clickable v-ripple @click="goToTask(6)">Tugas 6</q-item>
        <q-item clickable v-ripple @click="goToTask(7)">Tugas 7</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer class="footer-bg">
      <p>Lintang Ananda Setyaningrum</p>
      <p>Teknik Informatika</p>
      <div class="social">
        <a href="https://www.instagram.com/lintangganandaa?igsh=Y2czYnY5cHRnMTBx/"><i class="bx bxl-instagram-alt"></i></a>
        <a href="https://youtube.com/@alynnnih?si=oylqQBKTnkcR1NP9"><i class="fab fa-youtube"></i></a>
      </div>
      <p class="end">&copy; Copy right by Lintang</p>
    </footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    const goToTask = (taskNumber) => {
      const taskLinks = {
        1: 'https://lintang-project-cv.vercel.app/',
        2: 'https://lintang-prakpbk-tugass2.vercel.app/',
        3: 'https://223510853-lintang.vercel.app/',
        4: 'https://t4-pbk-lintang.vercel.app/',
        5: 'https://t5-pbk-223510853-lintang.vercel.app/',
        6: 'https://t6-pbk-lintang.vercel.app/',
        7: 'https://t7-pbk-lintang.vercel.app/'
      }
      window.location.href = taskLinks[taskNumber]
    }

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      goToTask
    }
  }
}
</script>

<style>
/* Styling yang sama seperti sebelumnya, hanya menyesuaikan warna dan penempatan */
.footer-bg {
  background-color: #011335; /* Background color diganti menjadi biru soft (#6495ED) */
}

footer {
  position: relative;
  width: 100%;
  height: 230px;
  background: #fbfbfc; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
}
footer p:nth-child(1) {
  font-size: 30px;
  color: white;
  margin-bottom: 5px;
  font-weight: bold;
}
footer p:nth-child(2) {
  color: white;
  font-size: 17px;
  width: 500px;
  text-align: center;
  line-height: 26px;
}

.social {
  display: flex;
}
.social a {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #1a2c50; /* Background asli */
  margin: 22px 10px;
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.social a:hover {
  transition: 0.4s;
  transform: scale(1.3);
}
.end {
  position: absolute;
  color: #1a2c50; /* Warna asli */
  margin-bottom: -6px;
  font-size: 14px;
}

.q-drawer {
  background-color: #011335; /* Warna latar belakang drawer diubah menjadi biru yang paling gelap (#011335) */
  color: white; /* Warna teks diubah menjadi putih */
}
</style>
