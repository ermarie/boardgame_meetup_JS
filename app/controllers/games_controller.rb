class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    game = Game.new(game_params)
    if game.save
      current_user.games << game
      render json: game, status: 201
    else
      render json: { errors: game.errors.full_messages }, status: :bad_request
    end
  end

  def index
    games = Game.all
    render json: games
  end

  def show
    game = Game.find_by(id: params[:id])
    render json: game.to_json(only: [:id, :name, :min_play_time, :max_play_time, :min_num_players, :max_num_players, :min_age, :max_age],
                                include: [plays: { only: [:num_plays]}])                     
  end

  def edit
    @game = Game.find_by(id: params[:id])
  end

  def update
    @game = Game.new(game_params)
    @game.save
    if @game.valid?
      current_user.games << @game
      redirect_to game_path(@game)
    else
      render :new
    end
  end

  def destroy
    game = Game.find_by(id: params[:id])
    game.destroy
  end

  private

  def game_params
    params.require(:game).permit(:name, :min_play_time, :max_play_time, :min_num_players, :max_num_players, :min_age, :max_age)
  end
end
