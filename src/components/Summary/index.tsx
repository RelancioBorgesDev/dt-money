import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContexts } from "../../contexts/TransactionsContext";
import { useSummary } from "../../hooks/useSummary";
import { SummaryCard, SummaryContainer } from "./style";

export function Summary() {
  const  transactions  = useContextSelector(TransactionsContexts, (context) => {
    return context.transactions
  });

  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>

        <strong>R$ {summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>

        <strong>R$ -{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#fff' />
        </header>

        <strong>R$ {summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
