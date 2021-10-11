class ProjectsController < ApplicationController

	# index
	# create
	# show
	def show
		project = Project.find(params[:id])

		render json: project, include: [:tasks]
	end
	# update
	# delete

	private
	# strong params
	def project_params
		params.require(:project).permit(:name, :description, :user_id)
	end
	
end