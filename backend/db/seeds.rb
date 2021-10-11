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

# Create Tasks
t1 = Task.create(name: "Sand in the place where you live", project: p5, priority: 1, complete: false)
t2 = Task.create(name: "Cut wood", project: p5, priority: 1, complete: false)
t3 = Task.create(name: "Paint", project: p1, priority: 1, complete: false)
t4 = Task.create(name: "Buy things", project: p1, priority: 1, complete: false)
t5 = Task.create(name: "More sanding", project: p2, priority: 1, complete: false)
t6 = Task.create(name: "Glue parts together", project: p2, priority: 1, complete: false)
t7 = Task.create(name: "Assemble project", project: p3, priority: 1, complete: false)
t8 = Task.create(name: "Sand in the place where you live", project: p3, priority: 1, complete: false)
t9 = Task.create(name: "Paint", project: p4, priority: 1, complete: false)
t10 = Task.create(name: "Cut wood", project: p4, priority: 1, complete: false)
t11 = Task.create(name: "Sand in the place where you live", project: p6, priority: 1, complete: false)
t12 = Task.create(name: "Glue parts together", project: p6, priority: 1, complete: false)