class SessionsController < ApplicationController
  def new
    binding.pry
  end

  def create 
    binding.pry
    if params["name"] && params["name"] != ""
      session[:name] = params["name"]
    else
      redirect_to '/login'
    end
  end

  def destroy
    session.delete :name
    redirect_to login_path
  end
end
