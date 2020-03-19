'use strict'

const TodoService=require('./../services/Todo-service');


exports.list=(request,response)=>{
    const totalQuery = request.query.total;
    const params = {};
    if(totalQuery) {
        params.total = totalQuery
    };
    const promise=TodoService.search(params);
    //const params={};
    const result=(Todo)=>{
        response.status(200);
        response.json(Todo);
    }
    promise.then(result)
    .catch(renderErrorResponse(response));
}
/**
 * Returns Todo response.
 *
 * @param request
 * @param response
*/
exports.get=(request,response)=>{
    const TodoId=request.params.id;
    // console.log(TodoId);
    const result=(Todo)=>{
        response.status(200);
        response.json(Todo);
    };
    const promise=TodoService.get(TodoId);
    promise.then(result).catch(renderErrorResponse(response));

}
/**
 * Creates a new Todo and sets the response.
 *
 * @param request
 * @param response
*/

exports.save = (request, response) => {
    const Todo = Object.assign({}, request.body);
    const result = (savedTodo) => {
        response.status(201);
        response.json(savedTodo);
    };
    const promise = TodoService.save(Todo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the order resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const TodoId = request.params.id;
    const updatedTodo = Object.assign({}, request.body);
    updatedTodo.id = TodoId;
    const result = (Todo) => {
        response.status(200);
        response.json(Todo);
    };
    const promise = TodoService.update(updatedTodo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};
/**
 * Deletes a Todo resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const TodoId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = TodoService.delete(TodoId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};
