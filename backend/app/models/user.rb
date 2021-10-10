class User < ApplicationRecord
	has_many :projects

	# validates :username presence: true
end
