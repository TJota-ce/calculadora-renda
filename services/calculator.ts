import { SimulationInput, SimulationSummary, MonthlyResult } from '../types';

export const calculateSimulation = (input: SimulationInput): SimulationSummary => {
  const { initialValue, monthlyWithdrawal, interestRate, rateType, period, periodType } = input;

  // 1. Normalize Rate to Monthly Decimal
  // If annual: i_monthly = (1 + i_annual)^(1/12) - 1
  // If monthly: i_monthly = i_monthly / 100
  let monthlyRate = 0;
  if (rateType === 'annual') {
    monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
  } else {
    monthlyRate = interestRate / 100;
  }

  // 2. Normalize Period to Months
  const totalMonths = periodType === 'years' ? period * 12 : period;

  let currentBalance = initialValue;
  let totalWithdrawn = 0;
  let totalInterestEarned = 0;
  const details: MonthlyResult[] = [];
  let monthsLasted = 0;

  // Initial state (Month 0)
  details.push({
    month: 0,
    interestAmount: 0,
    balanceBeforeWithdrawal: initialValue,
    balanceAfterWithdrawal: initialValue,
    totalInterest: 0,
    totalWithdrawn: 0,
    isZeroed: false
  });

  for (let m = 1; m <= totalMonths; m++) {
    if (currentBalance <= 0) {
        // If money ran out previously, just push zeroed rows or break depending on requirement.
        // We will continue to show it's zero.
         details.push({
            month: m,
            interestAmount: 0,
            balanceBeforeWithdrawal: 0,
            balanceAfterWithdrawal: 0,
            totalInterest: totalInterestEarned,
            totalWithdrawn: totalWithdrawn,
            isZeroed: true
          });
          continue;
    }

    const interest = currentBalance * monthlyRate;
    const balanceWithInterest = currentBalance + interest;
    
    // Determine actual withdrawal (can't withdraw more than exists)
    let actualWithdrawal = monthlyWithdrawal;
    if (actualWithdrawal > balanceWithInterest) {
      actualWithdrawal = balanceWithInterest;
    }

    const newBalance = balanceWithInterest - actualWithdrawal;

    totalInterestEarned += interest;
    totalWithdrawn += actualWithdrawal;
    currentBalance = newBalance;
    monthsLasted = m;

    details.push({
      month: m,
      interestAmount: interest,
      balanceBeforeWithdrawal: balanceWithInterest,
      balanceAfterWithdrawal: Math.max(0, newBalance), // Prevent negative precision errors
      totalInterest: totalInterestEarned,
      totalWithdrawn: totalWithdrawn,
      isZeroed: newBalance <= 0.01 // Threshold for floating point
    });
  }

  return {
    finalBalance: currentBalance,
    totalWithdrawn,
    totalInterestEarned,
    monthsLasted,
    details
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};