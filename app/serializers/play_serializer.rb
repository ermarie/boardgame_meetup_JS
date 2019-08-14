class PlaySerializer < ActiveModel::Serializer

    attributes :id, :user_id, :num_plays
    belongs_to :game
end