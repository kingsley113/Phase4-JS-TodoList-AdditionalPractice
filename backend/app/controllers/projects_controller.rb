class ProjectsController < ApplicationController

	# index
	# create
	# show
	# update
	# delete

	private
	# strong params
	def project_params
		params.require(:project).permit(:name, :description, :user_id)
	end
	
end