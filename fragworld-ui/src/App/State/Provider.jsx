import React from "react";
import { useQuery } from "react-query";
import useLocalStorage from "Shared/useLocalStorage";
import StateContext from "./context";
import { getUser } from "User/api";
import { useQueryClient } from "react-query";
import { getFavorites, createFavorite, deleteFavorite } from "Favorite/api";
import { ResponsiveContext } from "grommet";

export const RESPONSIVE_SECTIONS = {
  SERVERS: 0,
  RCON: 1,
  USER: 2
};

export default (props) => {
  const [activeResponsiveSection, setActiveResponsiveSection] = React.useState(
    RESPONSIVE_SECTIONS.SERVERS
  );
  const [game, setGame] = React.useState("hl");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [toasts, setToasts] = React.useState([]);
  const [storedUserId, setStoredUserId] = useLocalStorage("id", null);
  const queryClient = useQueryClient();
  const { isFetching: isRestoringSession } = useQuery(
    "restore session",
    async () => {
      return !currentUser && storedUserId
        ? await getUser(storedUserId)
        : currentUser;
    },
    {
      onSuccess: (user) => {
        setCurrentUser(user);
      }
    }
  );

  React.useEffect(() => {
    if (!currentUser && storedUserId) return;
  }, [currentUser, storedUserId]);

  const showToast = React.useCallback(
    (toast) => {
      setToasts([...toasts, toast]);
    },
    [toasts]
  );

  const hideToast = React.useCallback(() => {
    setToasts(toasts.slice(0, -1));
  }, [toasts]);

  const logIn = React.useCallback((user) => {
    setCurrentUser(user);
    setStoredUserId(user._id);
  }, []);

  const logOut = React.useCallback(() => {
    setStoredUserId(null);
    setCurrentUser(null);
  }, []);

  const focusServers = () =>
    setActiveResponsiveSection(RESPONSIVE_SECTIONS.SERVERS);
  const focusRcon = () =>
    activeResponsiveSection === RESPONSIVE_SECTIONS.RCON
      ? setActiveResponsiveSection(RESPONSIVE_SECTIONS.SERVERS)
      : setActiveResponsiveSection(RESPONSIVE_SECTIONS.RCON);
  const focusUser = () =>
    activeResponsiveSection === RESPONSIVE_SECTIONS.USER
      ? setActiveResponsiveSection(RESPONSIVE_SECTIONS.SERVERS)
      : setActiveResponsiveSection(RESPONSIVE_SECTIONS.USER);

  const loggedIn = !!storedUserId;

  ///////////////////////////
  const favoriteParams = {
    game,
    userId: currentUser?._id
  };

  const {
    data: favorites = [],
    isFetching: isFetchingFavorites,
    refetch: refetchFavorites
  } = useQuery(
    ["favorites", favoriteParams],
    () => getFavorites(favoriteParams),
    {
      enabled: false,
      onError: (e) => alert(`could not load favorites: ${e.message}`)
    }
  );

  React.useEffect(() => {
    if (loggedIn && currentUser) refetchFavorites();
  }, [loggedIn, currentUser, refetchFavorites]);

  const toggleFavorite = React.useCallback(
    async (serverId) => {
      if (!loggedIn) return;
      if (isFetchingFavorites) return;
      const fav = favorites.find(
        (favorite) =>
          favorite.serverId === serverId && favorite.userId === currentUser?._id
      );

      if (fav) {
        await deleteFavorite(fav._id);
        queryClient.setQueryData(
          ["favorites", favoriteParams],
          favorites.filter(({ _id }) => _id !== fav._id)
        );
      } else {
        const newFav = await createFavorite({
          userId: currentUser?._id,
          serverId
        });
        queryClient.setQueryData(
          ["favorites", favoriteParams],
          [...favorites, newFav]
        );
      }
    },
    [favorites, currentUser, isFetchingFavorites, queryClient, loggedIn]
  );

  ///////////////////////////

  const viewport = React.useContext(ResponsiveContext);

  React.useEffect(() => {
    if (loggedIn) {
      focusServers();
      showToast({ title: "login", message: "welcome" });
    }
  }, [loggedIn]);

  const ctx = {
    viewport,
    game,
    setGame,
    favorites,
    toggleFavorite,
    toasts,
    showToast,
    hideToast,
    loggedIn,
    currentUser,
    isRestoringSession,
    isFetchingFavorites,
    logIn,
    logOut,
    activeResponsiveSection,
    focusServers,
    focusRcon,
    focusUser
  };

  return (
    <StateContext.Provider value={ctx}>{props.children}</StateContext.Provider>
  );
};
