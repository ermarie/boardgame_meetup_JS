class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_many :games
  class GameSerializer < ActiveModel::Serializer
    attributes :id, :name, :plays
  end
end
