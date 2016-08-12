class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :track_id, null: false

      t.timestamps null: false
    end

    add_index(:likes, [:user_id, :track_id])
  end
end
