<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-emerald-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold">TutorHive</h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative hidden sm:block">
            <input
              type="text"
              placeholder="Find a student..."
              class="py-2 px-4 pr-10 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search class="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <button class="focus:outline-none relative">
            <Bell class="h-6 w-6" />
            <span class="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
          </button>
          <!-- Chat icon -->
          <button class="focus:outline-none relative">
            <MessageSquare class="h-6 w-6" />
          </button>
          <button @click="toggleSidebar" class="focus:outline-none md:hidden">
            <Menu class="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside
        :class="{ 'hidden': !sidebarOpen, 'block': sidebarOpen, 'md:block': true }"
        class="bg-emerald-700 text-white w-64 flex-shrink-0 md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30 overflow-y-auto"
      >
        <div class="p-4">
          <div class="flex flex-col items-center mb-6">
            <img
              :src="userProfile.avatar"
              alt="Profile"
              class="w-24 h-24 rounded-full mb-4"
            />
            <h2 class="text-xl font-semibold">{{ userProfile.name }}</h2>
            <p class="text-sm">{{ userProfile.role }}</p>
            <p class="text-sm mt-1">Ratings: {{ userProfile.ratings }}</p>
            <p class="text-sm mt-1">Subjects: {{ userProfile.subjects.join(', ') }}</p>
          </div>

          <nav class="space-y-2 mt-6">
            <a @click="openProfileSettings" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-600 cursor-pointer">
              <User class="inline-block mr-2 h-5 w-5" />
              Profile Settings
            </a>
            <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-600">
              <Calendar class="inline-block mr-2 h-5 w-5" />
              Schedule
            </a>
            <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-600">
              <Users class="inline-block mr-2 h-5 w-5" />
              My Students
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <h2 class="text-3xl font-bold mb-6">Welcome Back, Kurt P. Reserva!</h2>
        
        <!-- Today's Sessions -->
        <section class="mb-8">
          <h3 class="text-2xl font-semibold mb-4">Today's Sessions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(session, index) in todaySessions"
              :key="index"
              class="bg-white p-4 rounded shadow"
              :class="{ 'border-l-4 border-emerald-500': session.isDone }"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold">{{ session.name }}</h4>
                <button
                  @click="toggleSessionDone(index)"
                  class="text-emerald-500 hover:text-emerald-600 focus:outline-none"
                  :class="{ 'text-gray-400': session.isDone }"
                >
                  <CheckCircle v-if="session.isDone" class="h-6 w-6" />
                  <Circle v-else class="h-6 w-6" />
                </button>
              </div>
              <p>{{ session.subject }}</p>
              <p>{{ session.time }}</p>
              <button class="mt-2 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
                Enter Class
              </button>
            </div>
          </div>
        </section>

        <!-- Recently Accessed Courses -->
        <section class="mb-8">
          <h3 class="text-2xl font-semibold mb-4">Recently Accessed Courses</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(course, index) in recentCourses"
              :key="index"
              class="bg-white p-4 rounded shadow"
            >
              <h4 class="font-semibold">{{ course.name }}</h4>
              <p class="text-sm text-gray-600">Student: {{ course.student }}</p>
              <p class="text-sm text-gray-500">Last accessed: {{ course.date }}</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Profile Settings Modal -->
    <div v-if="showProfileSettings" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h3 class="text-2xl font-semibold mb-4">Profile Settings</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="userProfile.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50">
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <input v-model="userProfile.role" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50">
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Subjects (comma-separated)</label>
          <input v-model="subjectsInput" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50">
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" @change="onFileSelected" class="mt-1" accept="image/*">
        </div>
        
        <button @click="saveProfile" class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition duration-300">
          Save
        </button>
        <button @click="closeProfileSettings" class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Menu, Bell, Search, User, Calendar, Users, CheckCircle, Circle, MessageSquare } from 'lucide-vue-next'

export default {
  components: {
    Menu,
    Bell,
    Search,
    User,
    Calendar,
    Users,
    CheckCircle,
    Circle,
    MessageSquare // Added the chat icon here
  },
  setup() {
    const sidebarOpen = ref(true)
    const showProfileSettings = ref(false)
    const userProfile = ref({
      avatar: '/placeholder.svg?height=100&width=100',
      name: 'Kurt P. Reserva',
      role: 'Student',
      ratings: '4.8/5',
      subjects: ['Chemistry', 'Physics']
    })
    const subjectsInput = ref(userProfile.value.subjects.join(', '))

    const todaySessions = ref([
      { name: 'Jelli Uayan', subject: 'Chemistry', time: '2:00pm', isDone: false },
      { name: 'Jera Acero', subject: 'Calculus 1', time: '3:30pm', isDone: true }
    ])

    const recentCourses = ref([
      { name: 'Physics 1', student: 'Jelli Uayan', date: '2024-10-10' },
      { name: 'Algebra 2', student: 'Juan Dela Cruz', date: '2024-10-08' }
    ])

    function toggleSidebar() {
      sidebarOpen.value = !sidebarOpen.value
    }

    function toggleSessionDone(index) {
      todaySessions.value[index].isDone = !todaySessions.value[index].isDone
    }

    function openProfileSettings() {
      showProfileSettings.value = true
    }

    function closeProfileSettings() {
      showProfileSettings.value = false
    }

    function onFileSelected(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = function(e) {
          userProfile.value.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    function saveProfile() {
      userProfile.value.subjects = subjectsInput.value.split(',').map(subject => subject.trim())
      closeProfileSettings()
    }

    return {
      sidebarOpen,
      showProfileSettings,
      userProfile,
      subjectsInput,
      todaySessions,
      recentCourses,
      toggleSidebar,
      toggleSessionDone,
      openProfileSettings,
      closeProfileSettings,
      onFileSelected,
      saveProfile
    }
  }
}
</script>

<style scoped>
/* Add any additional styling as needed */
</style>
