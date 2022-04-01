<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';

import { GET_ALL_TODOS } from '../../utils/queries';
import { ADD_TODO, DELETE_TODO, CHECK_OR_UNCHECK } from '../../utils/mutations';
import { useStore } from '../../utils/store';

interface ITodo {
  id: number,
  name: string,
  checked?: boolean,
  __typename?: any,
}

const newTodo = ref('');
const searchQuery = ref('');
const todos = ref<ITodo[]>([]);
const hideCompleted = ref(false);
// use client (if multiple clients)
const options = ref({
  clientId: 'todos'
});

const computedFilter = computed(() => todos.value.filter(todo => (hideCompleted.value ? !todo.checked : true) && todo.name.includes(searchQuery.value)));

const {result: fetchedTodos, error: errorTodos, refetch: refetchTodos} = useQuery(GET_ALL_TODOS, null, options);
const {mutate: addTodoMutation, onDone: addTodoDone} = useMutation(ADD_TODO, options);
const {mutate: deleteTodoMutation, onDone: deleteTodoDone} = useMutation(DELETE_TODO, options);
const {mutate: checkOrUncheckMutation, onDone: checkOrUncheckDone} = useMutation(CHECK_OR_UNCHECK, options);

watchEffect(async () => {
  todos.value = await fetchedTodos.value.todos;
});

const createTodo = async () => {
  // hardcoded todos
  // const uniqueId = todos.value.reduce((currMax, item) => item.id > currMax.id ? item : currMax);
  // const newTodos = [...todos.value, { id: uniqueId.id + 1, name: newTodo.value }];
  // todos.value = [...newTodos];
  // newTodo.value = '';

  // postgres todos
  addTodoMutation({ name: newTodo.value });
};

const deleteTodo = (todo: ITodo) => {
  // hardcoded todos
  // todos.value = todos.value.filter(currentTodo => currentTodo.id !== todo.id);

  // postgres todos
  deleteTodoMutation({ id: todo.id.toString() });
};

const checkOrUncheck = (id: string) => {
  checkOrUncheckMutation({ id });
};

addTodoDone(() => {
  refetchTodos();
});

deleteTodoDone(() => {
  refetchTodos();
});

checkOrUncheckDone(() => {
  refetchTodos();
})

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
        <input :data-testid="todo.name" type="checkbox" @click="checkOrUncheck(todo.id.toString())" :checked="todo.checked" />
        <label :for="todo.id.toString()" @click="checkOrUncheck(todo.id.toString())">{{ todo.name }}</label>
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
