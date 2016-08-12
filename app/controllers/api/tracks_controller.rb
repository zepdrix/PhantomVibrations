class Api::TracksController < ApplicationController

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find(params[:id])

    if @track.update(track_params)
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render json: @track
  end

  def show
    @track = Track.find(params[:id])
    if @track
      render "api/tracks/show"
    else
      render json: {}
    end
  end

  def index
    if params[:user_id]
      @tracks = Track.where("user_id = ?", params[:user_id].to_i)
    else
      @tracks = Track.includes(:comments, :user).all.shuffle[0,8]
    end
    render "api/tracks/index"
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :image, :audio)
  end

end
