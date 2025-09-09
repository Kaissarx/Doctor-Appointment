import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/doctors',
      name: 'Doctors',
      component: () => import('../views/DoctorList.vue'),
    },
    {
      path: '/appointments',
      name: 'Appointments',
      component: () => import('../views/MyAppointments.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactPage.vue'),
    },
    {
      path: '/booking/:id',
      name: 'Booking',
      component: () => import('../views/BookingPage.vue'),
    },
  ],
})

export default router
