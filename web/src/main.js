import { createApp } from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos()

const app = createApp({
	data() {
		return {
			todos: [],
			form: {
				text: '',
        done: false
			}
		}
	},

  created() {
    this.fetchTodos()
  },

  methods: {
    async fetchTodos() {
      this.todos = await apiTodos.index()
      console.log(this.todos)
    },
    async createTodo() {
      const data = await apiTodos.store(this.form)
      this.todos.push(data)

      this.form.text = ''
      this.form.done = false
    },
    async toggleTodoStatus(todo) {
      const data = await apiTodos.update({
        ... todo,
        done: !todo.done
      })

      const index = this.todos.findIndex(({id}) => id === data.id)

      this.todos[index] = data
    },

    async destroyTodo(id) {
      await apiTodos.destroy({ id })

      const index = this.todos.findIndex((todo) => todo.id === id)

      this.todos.splice(index, 1 )
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