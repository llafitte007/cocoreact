/* eslint-disable no-unused-vars */
import { IMessage } from "../Message";
import { IRequest } from "../Request";

export default interface ISerializer {
	serialize<TMessage extends IMessage>(message: TMessage): IRequest;
	deserialize<TResponse>(response: string): TResponse;
}
