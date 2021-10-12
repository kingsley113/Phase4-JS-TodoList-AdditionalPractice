class TasksController < ApplicationController

	# index
	# create
	def create
		task = Task.new(task_params)
		# byebug
		if task.save
			render json: task
		else
			render json: task.errors, status: :unprocessable_entity
		end
	end
	# show
	# update
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
	# delete

	private

	# strong params
	def task_params
		params.require(:task).permit(:name, :description, :project_id, :priority, :dueDate, :complete)
	end
	
end