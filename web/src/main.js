import { createApp } from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos()

const app = createApp({
	data() {
		return {
			todos: []
		}
	},

  created() {
    this.fetchTodos()
  },

  methods: {
    async fetchTodos() {
      this.todos = await apiTodos.index()
      console.log(this.todos)
    }
  }
})

app.mount('#app')

/*
async function exec() {
	const todos = new Todos()

	const response = await todos.index()

	//const response = await todos.store({text: 'limpar celular', done: false})

	//const response = await todos.update({id: 5, text: 'limpar copo', done: false})

	//const response = await todos.destroy({id: 5})

	console.log(response);
}

exec()*/