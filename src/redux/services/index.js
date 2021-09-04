// export API from "./serviceList";
export { apiCall, apiNoTokenCall, createQueryParams } from "./service";
export {
  login,
  registerUser,
  forgotPassword,
  updateUser,
  getUser,
  getFilteredUserList,
  getUserTransactions,
  addMoneyToWallet
} from "./user";

export {
  getWallets  
} from "./wallets";

export {
  getTransactionHistory,
  getUserRequest,
  updateUserRequest
} from "./transactionHistory";

export {
  getGameBets
} from "./gameBets";

export {
  getGames,
  addGame,
  getGamesBets,
  updateGameResults,
  getGamesResult
} from "./games";