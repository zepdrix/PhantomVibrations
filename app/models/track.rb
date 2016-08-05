# == Schema Information
#
# Table name: tracks
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  title        :string           not null
#  description  :text
#  track_length :integer
#  plays        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Track < ActiveRecord::Base

  validates  :user_id, :title, :plays, presence: true

  has_attached_file :image, default_url: 'avatar_med.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_attached_file :audio, default_url: 'nocturne.ogg'
  # validates_attachment_content_type :audio, content_type: /\Aimage\/.*\Z/

  belongs_to( :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )

end
