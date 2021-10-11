class UsersController < ApplicationController

	def index 
		users = User.all
		# render json: UserSerializer.new(users).to_serialized_json
		render json: users
	end

	def create
		user = User.create(user_params)

		if user.save
			# render json: UserSerializer.new(user).full_user_serialized_json
			render json: user, include:[:projects]
		else
			render json: user.errors, status: :unprocessable_entity 
		end
	end

	def show
		user = User.find(params[:id])
		# render json: UserSerializer.new(user).full_user_serialized_json
		render json: user, include:[:projects]
	end

	private
	# strong params
	def user_params
		params.require(:user).permit(:username, :id)
	end
end