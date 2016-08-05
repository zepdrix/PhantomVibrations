class AddAttachmentAvatarImageToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :avatar_image
    end
  end

  def self.down
    remove_attachment :users, :avatar_image
  end
end
