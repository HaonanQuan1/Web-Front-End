'use strict';

const TodoController=require('../controllers/Todo-controller');

module.exports=(app)=>{

    app.route('/Todo')
        .get(TodoController.list)
        .post(TodoController.save);

    app.route('/Todo/:id')
        .get(TodoController.get)
        .put(TodoController.update)
        .delete(TodoController.delete);

}