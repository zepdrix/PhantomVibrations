class Api::TracksController < ApplicationController

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render json: @track
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
    render json: @track
  end

  def index
    @tracks = Track.all
    render "api/tracks/index"
  end



  private

  def track_params
    params.require(:track).permit(:title, :description)
  end

end
