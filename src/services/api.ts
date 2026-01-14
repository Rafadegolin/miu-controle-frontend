import { authActions } from "./auth.actions";
import { userActions } from "./user.actions";
import { accountsActions } from "./accounts.actions";
import { transactionsActions } from "./transactions.actions";
import { categoriesActions } from "./categories.actions";
import { goalsActions } from "./goals.actions";
import { budgetsActions } from "./budgets.actions";
import { recurringActions } from "./recurring.actions";
import { reportsActions } from "./reports.actions";
import { gamificationActions } from "./gamification.actions";
import { aiActions } from "./ai.actions";

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
};

export { api };
export default api;
