import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import './index.css';
import { Provider } from 'react-redux';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/store
import { store } from '@store/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
