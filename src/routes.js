/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import { 
  Users,
  Game,
  GameBets,
  GameResults,
  Result,
  Wallet,
  Profile,
  Maps,
  Register,
  Login,
  Tables,
  Icons,
  TransactionsHistory,
  PaymentRequest,
  WinningResult
 } from "views/examples";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-circle-08 text-red",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/games",
    name: "Today Game's",
    icon: "ni ni-planet text-info",
    component: Game,
    layout: "/admin",
  },
  {
    path: "/gameBets",
    name: "Game Bets",
    icon: "ni ni-planet text-green",
    component: GameBets,
    layout: "/admin",
  },
  {
    path: "/gameResults",
    name: "Result",
    icon: "ni ni-pin-3 text-indigo",
    component: GameResults,
    layout: "/admin",
  },
  // {
  //   path: "/winningResults",
  //   name: "Recent Winning Results",
  //   icon: "ni ni-key-25 text-black",
  //   component: WinningResult,
  //   layout: "/admin",
  // },
  {
    path: "/wallet",
    name: "Wallet",
    icon: "ni ni-single-02 text-yellow",
    component: Wallet,
    layout: "/admin",
  },
  {
    path: "/paymentRequest",
    name: "Money Request",
    icon: "ni ni-bullet-list-67 text-orange",
    component: PaymentRequest,
    layout: "/admin",
  },
  {
    path: "/transactionsHistory",
    name: "Transaction History",
    icon: "ni ni-key-25 text-blue",
    component: TransactionsHistory,
    layout: "/admin",
  }
];
export default routes;
