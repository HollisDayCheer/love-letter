/*
 * Author: Austin Bisharat
 * Contents: This file contains methods that create and 
 *           manipulate a single game state dictionary
 */

var _ = require('underscore')

var gameLogicApi = {

    // Return a fully constructed game state object with the given users,
    // using the same turn order as the passed array.
    // A game state object looks like:
    //    {
    //       opCount: 5, 
    //       turnCount: 2,
    //       users: ['a', 'b'],
    //       playerState: {
    //                       'a': {
    //                               hand: [1, 3],
    //                               hasLost: false,
    //                               discard: [1]
    //                            },
    //                        'b': {...} 
    //                    },
    //       deck: [4, 5, 1, 1, ...]
    //    }
    //
    // Note that opCount is the number of operations that have been performed
    // on this game state, whereas turnCount is the number of completed turns.
    createGameState: function (users=[]) {
	deck = _.shuffle([1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8])

	playerState = _.object(
	    _.map(users, function(user) {
		return	[user,
			 {
			     hand: [deck.pop()],
			     discard: [],
			     hasLost: false
			 }
			];
	    })
	)

	return {
	    opCount: 0,
	    turnCount: 0,
	    users: users,
	    playerState: playerState,
	    deck: deck
	}
    },
}

module.exports = gameLogicApi

