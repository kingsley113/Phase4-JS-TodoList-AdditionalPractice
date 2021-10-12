class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.integer :project_id
      t.string :priority
      t.date :dueDate
      t.boolean :complete

      t.timestamps
    end
  end
end
