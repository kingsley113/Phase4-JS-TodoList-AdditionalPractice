class Task < ApplicationRecord
	belongs_to :project

	validates :name precense: true
end
