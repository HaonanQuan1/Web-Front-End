'use strict';
const mongoose=require('mongoose'),
    Todo=mongoose.model('Todo');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Todo.find(params).exec();
    return promise;
};

/**
 * Returns the Todo object by id.
 *
 * @param TodoId
*/

exports.get=(TodoId)=>{
    const promise =Todo.findById(TodoId).exec();
    return promise;
};

/**
 * Updates an existing Todo.
 *
 * @param updatedTodo
*/
exports.update = (updatedTodo) => {
    // updatedTodo.modifiedDate=Date.now;
    const promise = Todo.findByIdAndUpdate(updatedTodo.id, updatedTodo).exec();
    return promise;
};

/**
 * Deletes an existing Todo.
 *
 * @param TodoId
*/
exports.delete = (TodoId) => {
    const promise = Todo.findByIdAndRemove(TodoId).exec();
    return promise;
};

/**
 * Saves the new Todo object.
 *
 * @param Todo
*/
exports.save = (todo) => {
    const newTodo = new Todo(todo);
    return newTodo.save();
};