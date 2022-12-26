import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./style";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContexts } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";
const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

//Declaração da função
export function SearchFormComponent() {
  //Código da função
  const fetchTransactions = useContextSelector(
    TransactionsContexts,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  //Retorno da função
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type='text'
        placeholder='Busque por transações'
        {...register("query")}
      />

      <button type='submit'>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
