import type { Todo } from '$types/todo';

export let TODOS: Todo[] = [];

export const getAll = () => TODOS;

export const add = (todo: string) => {
    const newTodo: Todo = {
        text: todo,
        uid: Date.now().toString(),
        done: false,
    };

    TODOS.push(newTodo);

    return newTodo;
};

export const remove = (uid: string) => {
    TODOS = TODOS.filter((todo) => todo.uid !== uid);
};

export const update = ({
    uid,
    text,
    done,
}: {
    uid: Todo['uid'];
    text?: Todo['text'];
    done?: Todo['done'];
}) => {
    const todo = TODOS.find((todo) => todo.uid === uid);

    if (!todo) {
        throw new Error(`Todo with id ${uid} not found!`);
    }

    todo.done = done ?? todo.done;
    todo.text = text ?? todo.text;
};
