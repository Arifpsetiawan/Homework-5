import { useMutation } from "react-query"

const useCreateAgent = (agent, onSuccess, onError) => {
  const { mutate, dataAgent, isLoadingAgent, isErrorAgent } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/agent`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(agent), // body data type must match "Content-Type" header
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    { onError, onSuccess }
  )

  return { mutate, dataAgent, isLoadingAgent, isErrorAgent }
}

export default useCreateAgent
