class PlaysController < ApplicationController

  def create
    play = Play.create(user_id: params[:play][:user_id], game_id: params[:play][:game_id])
    render json: play
  end

  def show
    play = current_user.games.uniq.select {|game| game.id == params[:game_id].to_i}
    render json: play
  end

  def update
    play = Play.find(params[:id])
    @game = Game.find(params[:game_id])
    num = play.num_plays
    num = num + 1
    play.update(num_plays: num)
    play.save
    render json: play
  end

  def destroy
    binding.pry
  end

end
