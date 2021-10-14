class TasksController < ApplicationController

	# index

	def create
		task = Task.new(task_params)
		# byebug
		if task.save
			render json: task
		else
			render json: task.errors, status: :unprocessable_entity
		end
	end

	def show
		task = Task.find_by(id: params[:id])

		if task
			render json: task
		else
			render plain: "Task not found"
		end
	end

	def update
		task = Task.find(params[:id])
		task.name = params[:task][:name]
		task.description = params[:task][:description]
		task.priority = params[:task][:priority]
		task.dueDate = params[:task][:dueDate]
		task.complete = params[:task][:complete]
		# byebug
		
		if task.save
			render json: task
		else
			render json: task.errors, status: :unprocessable_entity
		end
	end

	def destroy
		task = Task.find(params[:id])
		# task.delete
		if task.delete 
			render json: {message: 'Task has been successfully yeeted'}
		end
	end

	private

	# strong params
	def task_params
		params.require(:task).permit(:name, :description, :project_id, :priority, :dueDate, :complete)
	end
	
end