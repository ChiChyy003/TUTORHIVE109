<template>
  <div class="min-h-screen bg-emerald-800 flex flex-col">
    <nav class="bg-white shadow-lg">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-emerald-700 text-2xl font-bold">TutorHive</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <input type="text" placeholder="Find tutor or subjects..." class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <button class="absolute right-0 top-0 mt-2 mr-4">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <button class="p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button @click="toggleSidebar" class="md:hidden p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex flex-1">
      <aside :class="{'translate-x-0 ease-out': isSidebarOpen, '-translate-x-full ease-in': !isSidebarOpen}" class="bg-emerald-800 w-64 fixed md:relative md:translate-x-0 h-full transition-all duration-300 z-30">
        <div class="flex flex-col items-center p-6">
          <img :src="userProfile.avatar" class="w-24 h-24 rounded-full mb-2" alt="Profile Picture">
          <h4 class="text-white font-medium">{{ userProfile.name }}</h4>
          <p class="text-emerald-200 text-sm">{{ userProfile.role }}</p>
        </div>

        <nav class="space-y-2 px-4">
          <a @click="openProfileSettings" class="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded cursor-pointer">
            <svg class="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile Settings</span>
          </a>
          <a class="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded" href="#">
            <svg class="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Request Tutoring</span>
          </a>
          <a class="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded" href="#">
            <svg class="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Account Settings</span>
          </a>
        </nav>
      </aside>

      <div class="flex-1 transition-all duration-300 bg-emerald-500">
        <main class="p-6">
          <h1 class="text-3xl font-semibold text-gray-800 mb-6">Welcome Back, {{ userProfile.name.split(' ')[0] }}!</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4">Recently Accessed Courses</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="course in courses" :key="course.id" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 class="font-semibold mb-2">{{ course.title }}</h3>
                    <p class="text-sm text-gray-600 mb-2">{{ course.description }}</p>
                    <p class="text-sm text-gray-500 mb-4">Tutor: {{ course.tutor }}</p>
                    <button class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition duration-300">Open</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4">Upcoming Sessions</h2>
                <div v-if="upcomingSessions.length === 0" class="text-gray-500">No upcoming sessions</div>
                <div v-else>
                  <div v-for="(session, index) in upcomingSessions" :key="index" class="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between mb-2">
                      <input v-model="session.title" @blur="saveSession(index)" class="flex-grow p-2 border rounded" placeholder="Session Title">
                      <input type="checkbox" :id="'session-' + index" v-model="session.completed" @change="confirmSessionCompletion(index)" class="ml-2">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <input v-model="session.date" type="date" class="p-2 border rounded" @blur="saveSession(index)">
                      <input v-model="session.time" type="time" class="p-2 border rounded" @blur="saveSession(index)">
                    </div>
                    <input v-model="session.tutor" placeholder="Tutor Name" class="mt-2 p-2 border rounded w-full" @blur="saveSession(index)">
                  </div>
                </div>
                <button @click="addSession" class="mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition duration-300">Add Session</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Profile Settings Modal -->
    <div v-if="showProfileSettings" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Profile Settings</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input type="file" @change="onFileSelected" class="mt-1" accept="image/*">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="userProfile.name" placeholder="Your Name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Role</label>
              <input v-model="userProfile.role" placeholder="Your Role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Gmail</label>
              <input v-model="userProfile.gmail" type="email" placeholder="Your Gmail" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Bio</label>
              <textarea v-model="userProfile.bio" placeholder="Your Bio" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Subjects of Interest</label>
              <input v-model="userProfile.subjects" placeholder="Subjects (comma-separated)" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
            </div>
          </div>
        </div>
        <div class="mt-5 flex justify-end space-x-2">
          <button @click="closeProfileSettings" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">Cancel</button>
          <button @click="saveProfile" class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-white transition duration-300">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      isSidebarOpen: false,
      userProfile: {
        avatar: '/placeholder.svg?height=100&width=100',
        name: 'Kurt Reserva',
        role: 'Student',
        gmail: '',
        bio: '',
        subjects: '',
      },
      courses: [
        { id: 1, title: 'Web Development', description: 'Learn how to build websites.', tutor: 'John Doe' },
        { id: 2, title: 'Data Science', description: 'Explore data analysis techniques.', tutor: 'Jane Smith'   },
        { id: 3, title: 'Machine Learning', description: 'Introduction to machine learning algorithms.', tutor: 'Alice Johnson' },
      ],
      upcomingSessions: [],
      showProfileSettings: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openProfileSettings() {
      this.showProfileSettings = true;
    },
    closeProfileSettings() {
      this.showProfileSettings = false;
    },
    saveProfile() {
      // Implement profile save logic here
      this.closeProfileSettings();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userProfile.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addSession() {
      this.upcomingSessions.push({ title: '', date: '', time: '', tutor: '', completed: false });
    },
    saveSession(index) {
      // Implement session save logic here
      console.log('Saving session:', this.upcomingSessions[index]);
    },
    confirmSessionCompletion(index) {
      if (this.upcomingSessions[index].completed) {
        if (confirm('Are you sure you want to mark this session as completed?')) {
          // Apply line-through effect
          this.$set(this.upcomingSessions[index], 'style', 'text-decoration: line-through;');
        } else {
          // If not confirmed, revert the checkbox
          this.$set(this.upcomingSessions[index], 'completed', false);
        }
      } else {
        // Remove line-through effect if unchecked
        this.$set(this.upcomingSessions[index], 'style', '');
      }
    },
  },
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

/* Add any additional styles here */
</style>