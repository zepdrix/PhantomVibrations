class Renamecommentssongcolumn < ActiveRecord::Migration
  def change
    rename_column :comments, :song_percentage, :track_percentage
  end
end
