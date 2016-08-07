class Editcomments < ActiveRecord::Migration
  def change
    add_column :comments, :song_percentage, :float
    change_column_null :comments, :song_percentage, false
  end
end
