export type PeriodType = 'years' | 'months';
export type RateType = 'annual' | 'monthly';

export interface SimulationInput {
  initialValue: number;
  monthlyWithdrawal: number;
  interestRate: number;
  rateType: RateType;
  period: number;
  periodType: PeriodType;
}

export interface MonthlyResult {
  month: number;
  interestAmount: number;
  balanceBeforeWithdrawal: number;
  balanceAfterWithdrawal: number;
  totalInterest: number;
  totalWithdrawn: number;
  isZeroed: boolean;
}

export interface SimulationSummary {
  finalBalance: number;
  totalWithdrawn: number;
  totalInterestEarned: number;
  monthsLasted: number;
  details: MonthlyResult[];
}