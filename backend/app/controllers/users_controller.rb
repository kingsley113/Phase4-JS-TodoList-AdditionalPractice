class UsersController < ApplicationController

	# Index
	# Create
	# Show

	private
	# strong params
	def user_params
		params.require(:user).permit(:username)
	end
end