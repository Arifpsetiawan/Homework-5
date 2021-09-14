import { useQuery } from "react-query";

const useGetTransactions = (id = "") => {
  const { data, isLoading, isError } = useQuery(
    `transactions:`,
    async () => {
        const response = await fetch(`http://localhost:5000/transactions/${id}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }
  );


  return {data, isLoading, isError}
};

export default useGetTransactions
