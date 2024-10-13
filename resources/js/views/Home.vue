<template>
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the app.</p>
      <router-link to="/dashboard">Go to dashboard</router-link>
      <br>
      <router-link to="/dashboardTutors">Go to dashboard for Tutors</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  