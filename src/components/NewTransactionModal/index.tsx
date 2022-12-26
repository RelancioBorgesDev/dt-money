import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionsContexts } from "../../contexts/TransactionsContext";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./style";
const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

//Declaração do componente
export function NewTransactionModal() {
  //Código do componente
  const createTransaction = useContextSelector(
    TransactionsContexts,
    (context) => {
      return context.createTransaction;
    }
  );
  const { control, register, handleSubmit, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        type: "income",
      },
    });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data;
    await createTransaction({
      description,
      category,
      price,
      type,
    });
    reset();
  }

  //Retorno do componente, que será exibido em tela
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='Descrição'
            required
            {...register("description")}
          />
          <input
            type='number'
            placeholder='Preço'
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type='text'
            placeholder='Categoria'
            required
            {...register("category")}
          />
          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type='submit'>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
