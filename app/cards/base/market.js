Market = class Market extends Card {

  types() {
    return ['action']
  }

  coin_cost() {
    return 5
  }

  play(game, player_cards) {
    let card_drawer = new CardDrawer(player_cards, game);
    [player_cards, game] = card_drawer.draw(1, true)

    game.turn.actions += 1
    game.turn.buys += 1
    game.turn.coins += 1
    game.log.push(`&nbsp;&nbsp;<strong>${player_cards.username}</strong> gets +1 action, +1 buy, and +$1`)
    Games.update(game._id, game)
    PlayerCards.update(player_cards._id, player_cards)
  }

}
