class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render "api/users/show"
  end

  def index
    if params[:random]
      @users = User.all.shuffle[0, 5]
    else
      @users = User.all
    end
    render "api/users/index"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :avatar_image)
  end

end
