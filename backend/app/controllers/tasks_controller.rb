class TasksController < ApplicationController

	# index
	# create
	# show
	# update
	# delete

	private

	# strong params
	def task_params
		params.require(:task).permit(:name, :description, :project_id, :priority, :dueDate, :complete)
	end
	
end