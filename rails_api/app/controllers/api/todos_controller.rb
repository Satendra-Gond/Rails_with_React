module Api
  class TodosController < ApplicationController
    def index
      todos = Todo.all.order(updated_at: :desc)
      # render json: todos

      render json: todos.as_json(only: [:id, :title, :description, :status, :created_at, :updated_at])
    end

    def show
      todo = Todo.find(params[:id])
      render json: todo
    end

    def create
      todo = Todo.new(todo_params)
      if todo.save
        render json: todo, status: :created
      else
        render json: todo.errors, status: :unprocessable_entity
      end
    end

    def update
      puts("update")
      puts(todo_params.inspect)
      todo = Todo.find(params[:id])
      if todo.update(todo_params)
        render json: todo
      else
        render json: todo.errors, status: :unprocessable_entity
      end
    end

    def destroy
      todo = Todo.find(params[:id])
      todo.destroy
      head :no_content
    end

    private

    def todo_params
      params.require(:todo).permit(:title, :description, :status)
    end
  end
end