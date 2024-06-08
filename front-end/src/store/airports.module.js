export default {
  state: {
    favorites: [],
  },
  mutations: {
    ADD_FAVORITES(state, payload) {
      state.favorites = payload;
    },
    REMOVE_FAVORITES(state, payload) {
      state.favorites = payload;
    },
  },
  actions: {
    addToFavorites(context, payload) {
      const favorites = context.state.favorites;

      const index = favorites.findIndex(
        (airport) => airport.abbreviation === payload.abbreviation
      );

      // add to favourites, if not existing in favourites
      if (index < 0) {
        favorites.push(payload);
      }
      context.commit("ADD_FAVORITES", favorites);
    },
    removeFromFavorites(context, payload) {
      const favorites = context.state.favorites;
      const modifiedFavorites = favorites.filter(
        (airport) => airport.abbreviation !== payload.abbreviation
      );

      context.commit("REMOVE_FAVORITES", modifiedFavorites);
    },
  },
};
