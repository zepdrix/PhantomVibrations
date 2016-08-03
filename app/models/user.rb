class User < ActiveRecord::Base

  attr_reader :password

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

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
