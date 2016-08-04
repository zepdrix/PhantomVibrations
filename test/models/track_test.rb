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

require 'test_helper'

class TrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
