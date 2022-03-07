import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';

import BasicTodo from '../containers/BasicTodo/BasicTodo.vue';

const createTodoString = 'test';
const todoTextboxSelector = '[data-testid=todo-textbox]';
const addTodoSelector = '[data-testid=add-button]';
const listSelector = '[data-testid=list] li:last-child label';
const childrenSelector = '[data-testid=list] li';
const toggleSelector = '[data-testid=toggle]';
const searchSelector = '[data-testid=search]';
const checkboxChildSelector = (todo: string) => `[data-testid=list] li input[data-testid=${todo}]`;
const deleteChildSelector = (todo: string) => `[data-testid=list] li button[data-testid=${todo}]`;

const wrapper = mount(BasicTodo);

const createTodo = async (todo: string) => {
  await wrapper.find(todoTextboxSelector).setValue(todo);
  await wrapper.find(addTodoSelector).trigger('click');
}

const deleteTodo = async (todo: string) => {
  await wrapper.find(deleteChildSelector(todo)).trigger('click');
};

const checkTodo = async (todo: string) => {
  await wrapper.find(checkboxChildSelector(todo)).trigger('click');
};

test('create todo', async () => {
  await createTodo(createTodoString);
  expect(wrapper.find(listSelector).text()).toBe(createTodoString);
});

test('delete todo', async () => {
  await deleteTodo(createTodoString);
  expect(wrapper.find(deleteChildSelector(createTodoString)).exists()).toBe(false);
  expect(wrapper.find(deleteChildSelector(createTodoString)).exists()).toBe(false);
});

test('toggle show/hide completed todos', async () => {
  // initial length
  const initialLength = wrapper.findAll(childrenSelector).length;

  // initial length of only incomplete todos
  await wrapper.find(toggleSelector).trigger('click');
  const initialIncompleteTodosLength = wrapper.findAll(childrenSelector).length;
  await wrapper.find(toggleSelector).trigger('click');

  await createTodo('test');
  await checkTodo('test');
  await createTodo('test 2');
  await deleteTodo('test');
  await createTodo('test 3');
  await checkTodo('test 3');

  expect(wrapper.findAll(childrenSelector).length).toBe(initialLength + 2);
  // show incomplete
  await wrapper.find(toggleSelector).trigger('click');
  expect(wrapper.findAll(childrenSelector).length).toBe(initialIncompleteTodosLength + 2);
});

test('search todos', async () => {
  // show all
  await wrapper.find(toggleSelector).trigger('click');
  await wrapper.find(searchSelector).setValue('test');
  const renderedChildren: any[] = wrapper.findAll(childrenSelector);
  for (let i = 0; i < renderedChildren.length; i++) {
    expect(renderedChildren[i].text()).toContain('test');
  }
});
