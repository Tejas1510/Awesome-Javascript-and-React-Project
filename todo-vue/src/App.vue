<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/">TODOS</a>
    </nav>
    <main class="container">
      <form @submit.prevent="insertTodo()" class="mt-3">
        <div class="form-group">
          <label for="todo">Enter a new todo</label>
          <input
            v-model="currentTodo"
            type="text"
            class="form-control"
            placeholder="Walk the dog..."
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <ul v-for="(todo, index) in todos" v-bind:key="todo.title" class="list-group mt-3">
        <li class="list-group-item text-center todo-title">
          <span :class="{
            isDone:todo.done
          }">{{todo.title}}</span>
        </li>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label v-if="!todo.done" class="btn btn-primary">
            <input @click="markDone(todo)" type="checkbox" /> Done
          </label>
          <label class="btn btn-primary">
            <input @click="remove(index)" type="checkbox" /> Remove
          </label>
        </div>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      currentTodo: "",
      todos: [],
    };
  },
  watch: {
    todos: {
      handler() {
        localStorage.todos = JSON.stringify(this.todos);
      },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos);
    }
  },
  methods: {
    insertTodo() {
      this.todos.push({
        title: this.currentTodo,
        done: false,
      });
      this.currentTodo = "";
    },
    markDone(todo) {
      todo.done = true;
    },
    remove(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style>
.todo-title {
  font-size: 1.5em;
}
.isDone {
  text-decoration: line-through;
}
</style>
