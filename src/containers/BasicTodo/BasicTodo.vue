<script setup lang="ts">
import { ref, watch } from 'vue';

interface ITodo {
  id: number,
  name: string,
  checked?: boolean,
}

const newTodo = ref('');
const searchQuery = ref('');
const todos = ref<ITodo[]>([
  { id: 1, name: 'study vue', checked: true },
  { id: 2, name: 'make vue app' },
  { id: 3, name: 'add dynamic css' },
  { id: 4, name: 'toggle hide all completed' },
  { id: 5, name: 'add search feature' },
]);
const filteredTodos = ref<ITodo[]>([...todos.value]);
const hideCompleted = ref(false);

const handleFilter = (newTodos: ITodo[]) => {
  filteredTodos.value = newTodos.filter(todo => (hideCompleted.value ? !todo.checked : true) && todo.name.includes(searchQuery.value));
};

watch([searchQuery, todos], ([, newTodos]) => handleFilter(newTodos));

const createTodo = async () => {
  const newTodos = [...todos.value, { id: todos.value.length + 1, name: newTodo.value }];
  todos.value = [...newTodos];
  handleFilter(newTodos);
  newTodo.value = '';
};

const deleteTodo = (todo: ITodo) => {
  todos.value = todos.value.filter(currentTodo => currentTodo.id !== todo.id);
};

const handleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value;
  handleFilter(todos.value);
};

</script>

<template>
  <main>
    <h1>todo</h1>
    <section>
      <label for="search">Search</label>
      <input type="text" id="search" v-model="searchQuery" placeholder="search for todos..." />
    </section>
    <section>
      <input type="text" v-model="newTodo" @keyup.enter="createTodo" />
      <button @click="createTodo">add</button>
    </section>
    <ol>
      <li v-for="todo in filteredTodos" :key="todo.id" :class="[todo.checked && 'strikethrough']">
        <input type="checkbox" v-model="todo.checked" />
        <label :for="todo.id.toString()" @click="todo.checked = !todo.checked">{{ todo.name }}</label>
        <button @click="deleteTodo(todo)">x</button>
      </li>
    </ol>
    <button @click="handleHideCompleted">{{ hideCompleted ? 'show all' : 'hide completed' }}</button>
  </main>
</template>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
