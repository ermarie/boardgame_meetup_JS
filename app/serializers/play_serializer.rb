class PlaySerializer < ActiveModel::Serializer

    attributes :id, :num_plays
    belongs_to :game
end