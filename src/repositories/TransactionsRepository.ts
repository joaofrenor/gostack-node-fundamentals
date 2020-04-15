import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transactionIncome => transactionIncome.value)
      .reduce((prev, next) => prev + next, 0);
    const outcome: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transactionOutcome => transactionOutcome.value)
      .reduce((prev, next) => prev + next, 0);
    const total: number = income - outcome;
    return {
      outcome,
      income,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
