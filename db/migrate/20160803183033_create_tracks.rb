class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :track_length
      t.integer :plays, null: false, default: 0

      t.timestamps null: false
    end

    add_index(:tracks, :user_id)
  end
end
