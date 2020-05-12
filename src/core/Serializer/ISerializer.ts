/* eslint-disable no-unused-vars */
import { IMessage } from "../Message";
import { IRequest } from "../Request";

export interface ISerializer {
	serializeMessage<TMessage extends IMessage>(message: TMessage): IRequest;
	deserialize<TResponse>(response: any): TResponse;
}
