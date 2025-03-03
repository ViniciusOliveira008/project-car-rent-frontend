import jwtDecode from "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm";
import fetchData from "../service/api.js";

const loadUserData = {
  decodedToken: {},
  logoutElement: document.getElementById('logout'),
  usernameElement: document.getElementById('nome_do_usuario'),
  userEmailElement: document.getElementById('email_do_usuario'),
  userRentsContainer: document.getElementById('alugueis_do_usuario'),
  noCarsRented: document.getElementById('nenhum_carro_alugado'),

  loadData: () => {
    const token = localStorage.getItem('userToken')

    if (token) { 
      loadUserData.decodedToken = jwtDecode(token)
    }

    loadUserData.usernameElement.textContent = loadUserData.decodedToken.username
    loadUserData.userEmailElement.textContent = loadUserData.decodedToken.email

    loadUserData.loadRents()
    loadUserData.logout()
  },

  loadRents: async () => {
    const cars = await fetchData(`http://localhost:5000/carros/usuario/${loadUserData.decodedToken.id}`)
    if (cars.length === 0) {
      loadUserData.noCarsRented.classList.remove('hidden')
    } else {
      loadUserData.noCarsRented.classList.add('hidden')
    }
  },

  logout: () => {
    loadUserData.logoutElement.addEventListener('click', () => {
      localStorage.removeItem('userToken')
    })
  }
}

export default loadUserData