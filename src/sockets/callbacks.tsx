import { Message } from "../types/Chat.js";

export default interface EventHandlerCallbacks {
    groupMessageCallback: (message: Message) => void;
}