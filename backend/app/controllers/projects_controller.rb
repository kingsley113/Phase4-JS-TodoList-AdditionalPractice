class ProjectsController < ApplicationController

	# index
	# create
	def create
		project = Project.new(project_params)
		if project.save
			render json: project, include: [:tasks]
		else
			render json: project.errors, status: :unprocessable_entity
		end
	end
	# show
	def show
		project = Project.find_by(id: params[:id])

		if project
			render json: project, include: [:tasks]
		else
			render plain: "Project not found"
		end
	end
	# update
	# delete

	private
	# strong params
	def project_params
		params.require(:project).permit(:name, :description, :user_id)
	end
	
end