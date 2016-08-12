# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  track_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ActiveRecord::Base

  validates :user_id, uniqueness: { scope: :track_id }

  belongs_to(
    :track,
    class_name: 'Track',
    foreign_key: :track_id,
    primary_key: :id
    )

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
    )


end
