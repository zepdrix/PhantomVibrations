class Renamecommentscolumn < ActiveRecord::Migration
  def change
    rename_column :comments, :song_id, :track_id
  end
end
