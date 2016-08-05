class Api::TracksController < ApplicationController

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def edit

  end

  def destroy

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
    @tracks = Track.all
    render "api/tracks/index"
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :image, :audio)
  end

end
