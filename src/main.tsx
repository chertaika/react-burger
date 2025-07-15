import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
