<script setup lang="ts">
import { ref, computed } from 'vue';

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
const hideCompleted = ref(false);

const computedFilter = computed(() => todos.value.filter(todo => (hideCompleted.value ? !todo.checked : true) && todo.name.includes(searchQuery.value)));

const createTodo = async () => {
  const newTodos = [...todos.value, { id: todos.value.length + 1, name: newTodo.value }];
  todos.value = [...newTodos];
  newTodo.value = '';
};

const deleteTodo = (todo: ITodo) => {
  todos.value = todos.value.filter(currentTodo => currentTodo.id !== todo.id);
};

const handleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value;
};

</script>

<template>
  <main>
    <h1>todo</h1>
    <section>
      <label for="search">Search</label>
      <input
        data-testid="search"
        type="text"
        id="search"
        v-model="searchQuery"
        placeholder="search for todos..."
      />
    </section>
    <section>
      <input type="text" data-testid="todo-textbox" v-model="newTodo" @keyup.enter="createTodo" />
      <button @click="createTodo" data-testid="add-button">add</button>
    </section>
    <ol data-testid="list">
      <li v-for="todo in computedFilter" :key="todo.id" :class="[todo.checked && 'strikethrough']">
        <input :data-testid="todo.name" type="checkbox" v-model="todo.checked" />
        <label :for="todo.id.toString()" @click="todo.checked = !todo.checked">{{ todo.name }}</label>
        <button :data-testid="todo.name" @click="deleteTodo(todo)">x</button>
      </li>
    </ol>
    <button
      data-testid="toggle"
      @click="handleHideCompleted"
    >{{ hideCompleted ? 'show all' : 'hide completed' }}</button>
  </main>
</template>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
