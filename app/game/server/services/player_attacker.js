PlayerAttacker = class PlayerAttacker {

  constructor(game, card) {
    this.game = game
    this.card = card
  }

  attack(attacker) {
    let ordered_player_cards = TurnOrderedPlayerCardsQuery.turn_ordered_player_cards(this.game)
    ordered_player_cards.shift()

    UrchinResolver.resolve(this.game, attacker)

    _.each(ordered_player_cards, (attacked_player_cards) => {
      let attack_event_processor = new AttackEventProcessor(this.game, attacked_player_cards)
      attack_event_processor.process()

      if (attacked_player_cards.moat || attacked_player_cards.champion || this.lighthouse_in_play(attacked_player_cards)) {
        delete attacked_player_cards.moat
        this.game.log.push(`&nbsp;&nbsp;<strong>${attacked_player_cards.username}</strong> is immune to the attack`)
      } else {
        this.card.attack(this.game, attacked_player_cards, attacker)
      }
      GameModel.update(this.game._id, this.game)
      PlayerCardsModel.update(this.game._id, attacked_player_cards)
    })
  }

  lighthouse_in_play(player_cards) {
    let lighthouse_in_play = _.some(player_cards.in_play, function(card) {
      return card.name === 'Lighthouse'
    })
    let lighthouse_in_duration = _.some(player_cards.duration, function(card) {
      return card.name === 'Lighthouse'
    })
    return lighthouse_in_play || (lighthouse_in_duration && player_cards.player_id !== this.game.turn.player._id)
  }
}
