import { authActions } from "./auth.actions";
import { userActions } from "./user.actions";
import { accountsActions } from "./accounts.actions";
import { transactionsActions } from "./transactions.actions";
import { categoriesActions } from "./categories.actions";
import { goalsActions } from "./goals.actions";
import { getBudgetsSummary, createBudget } from "./budgets.actions";

const budgetsActions = {
  getBudgetsSummary,
  createBudget
};

import { recurringActions } from "./recurring.actions";
import { reportsActions } from "./reports.actions";
import { gamificationActions } from "./gamification.actions";
import { aiActions } from "./ai.actions";
import { planningActions } from "./planning.actions";
import { inflationActions } from "./inflation.actions";
import * as emergencyFundActions from "./emergency-fund.actions";

// Re-export actions for individual usage
export {
  authActions,
  userActions,
  accountsActions,
  transactionsActions,
  categoriesActions,
  goalsActions,
  budgetsActions,
  recurringActions,
  reportsActions,
  gamificationActions,
  aiActions,
  planningActions,
  inflationActions,
  emergencyFundActions,
};

// Default object for backward compatibility (simulating the old class instance)
const api = {
  ...authActions,
  ...userActions,
  ...accountsActions,
  ...transactionsActions,
  ...categoriesActions,
  ...goalsActions,
  ...budgetsActions,
  ...recurringActions,
  ...reportsActions,
  ...gamificationActions,
  ...aiActions,
  ...planningActions,
  ...inflationActions,
  ...emergencyFundActions,
};

export { api };
export default api;
