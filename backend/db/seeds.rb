# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Users
jimmy = User.create(username: "Jimmy")
david = User.create(username: "David")
bob = User.create(username: "Bob")

# Create Projects
p1 = Project.create(name: "R2D2", user: bob)
p2 = Project.create(name: "Speakers", user: david)
p3 = Project.create(name: "Tv Show", user: jimmy)
p4 = Project.create(name: "Lego Table", user: bob)
p5 = Project.create(name: "Go Kart", user: david)
p6 = Project.create(name: "Guitar", user: jimmy)

