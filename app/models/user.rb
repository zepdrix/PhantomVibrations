# == Schema Information
#
# Table name: users
#
#  id                        :integer          not null, primary key
#  username                  :string           not null
#  session_token             :string           not null
#  password_digest           :string           not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  avatar_image_file_name    :string
#  avatar_image_content_type :string
#  avatar_image_file_size    :integer
#  avatar_image_updated_at   :datetime
#

class User < ActiveRecord::Base

  attr_reader :password

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  has_attached_file :avatar_image, default_url: 'avatar_med.png'
  validates_attachment_content_type :avatar_image, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  has_many(
    :tracks,
    class_name: 'Track',
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: 'Comment',
    foreign_key: :user_id,
    primary_key: :id
    )

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    if user && user.matches_password?(password)
      return user
    end
    nil
  end

  def generate_session_token
    session_token = SecureRandom.urlsafe_base64(16)
    while User.find_by(session_token: session_token)
      session_token = SecureRandom.urlsafe_base64(16)
    end
    return session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def matches_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token = generate_session_token
  end

end
