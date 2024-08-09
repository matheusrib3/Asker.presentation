import { useParams } from "react-router-dom";
import { Message } from "./message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UseMessagesWebsockets } from "../hooks/use-messages-websockets";
import { getRoomMessages } from "../http/get-room-messages";


export function Messages() {

    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Os componentes da messagem só podem ser usados em uma room page!.')
    }


    const { data } = useSuspenseQuery({
        queryKey: ['messages', roomId],
        queryFn: () => getRoomMessages({ roomId }),

    })

    UseMessagesWebsockets({ roomId })

    const  sortedMessages = data.messages.sort((a,b) => {
        return b.amountOfReactions - a.amountOfReactions
    })

    return (

        < ol className="list-decimal list-outside px-3 space-y-8" >
            {sortedMessages.map(message => {
                return (
                    <Message
                        key={message.id}
                        id={message.id}
                        text={message.text}
                        amountOfReactions={message.amountOfReactions}
                        answered={message.answered}
                    />
                )
            })}


        </ol >
    )



}