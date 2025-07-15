import { updateAuthTokens } from '@/utils/api';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '@store/hooks';

export type TWsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>,
	withTokenRefresh: boolean = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
		} = wsActions;
		const { dispatch } = store;
		let isConnected = false;
		let url = '';
		let reconnectId: NodeJS.Timeout | null = null;

		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				if (withTokenRefresh) {
					const accessToken = localStorage.getItem('accessToken') || '';
					const wssUrl = new URL(url);
					wssUrl.searchParams.set('token', accessToken);
					url = wssUrl.toString();
				}
				socket = new WebSocket(url);
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('WebSocket error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectId = setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = async (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);

						if (withTokenRefresh && parsedData.message === 'jwt expired') {
							try {
								const { accessToken } = await updateAuthTokens();
								const wssUrl = new URL(url);
								wssUrl.searchParams.set('token', accessToken);
								dispatch(connect(wssUrl.toString()));
							} catch (error) {
								dispatch(onError('Сессия истекла. Войдите снова.'));
								dispatch(disconnect());
							}
							return;
						}
						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			}

			if (disconnect.match(action)) {
				if (reconnectId) {
					clearTimeout(reconnectId);
					reconnectId = null;
				}
				isConnected = false;
				socket?.close();
				socket = null;
				return;
			}

			next(action);
		};
	};
};
