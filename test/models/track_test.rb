# == Schema Information
#
# Table name: tracks
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  title              :string           not null
#  description        :text
#  track_length       :integer
#  plays              :integer          default(0), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  audio_file_name    :string
#  audio_content_type :string
#  audio_file_size    :integer
#  audio_updated_at   :datetime
#

require 'test_helper'

class TrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
