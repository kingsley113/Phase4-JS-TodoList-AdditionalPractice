class UserSerializer
	def initialize(user_object)
		@user = user_object
	end

	def to_serialized_json
		options = {
			include: {
				responses: {:only => [:username, :id]},
			},
			except: [:updated_at, :created_at]
		}
		@user.to_json(options)
	end

	def full_user_serialized_json
		options = {
			include: {
				responses: {:only => [:username, :id, :projects]},
			},
			except: [:updated_at, :created_at]
		}
	end
end