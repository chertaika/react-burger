describe('Burger Constructor', () => {
	beforeEach(() => {
		window.localStorage.setItem('accessToken', 'mocked-access-token');
		cy.intercept('GET', '**/auth/user', {
			statusCode: 200,
			body: {
				success: true,
				user: {
					name: 'Test User',
					email: 'test@test.ru',
				},
			},
		}).as('getUser');
		cy.fixture('ingredients').then((ingredients) => {
			cy.intercept('GET', '**/ingredients', {
				statusCode: 200,
				body: {
					success: true,
					data: ingredients,
				},
			}).as('getIngredients');
		});

		cy.visit('/');
		cy.wait(['@getUser', '@getIngredients']);
	});

	it('should open ingredient details modal on click', () => {
		cy.get('[data-testid^="ingredient-"]').first().as('ingredient');

		cy.get('@ingredient')
			.find('[data-testid="ingredient-name"]')
			.invoke('text')
			.then((name) => {
				const ingredientName = name;

				cy.get('@ingredient').click();

				cy.get('[data-testid="ingredient-details-modal"]')
					.as('modal')
					.should('exist');

				cy.get('@modal')
					.find('[data-testid="ingredient-name"]')
					.invoke('text')
					.should('eq', ingredientName);

				cy.url().should('include', '/ingredients/');

				cy.get('[data-testid="close-modal-button"]').click();
				cy.get('@modal').should('not.exist');
			});
	});

	it('should drag and drop an ingredient into the constructor', () => {
		cy.contains('Перетащи ингредиенты сюда 🍔').should('exist');
		cy.get('[data-testid="burger-constructor"]').as('constructor');

		cy.get('[data-testid^="ingredient-bun-"]')
			.first()
			.as('bun')
			.invoke('attr', 'data-testid')
			.then((testId) => {
				const id = testId!.split('ingredient-bun-')[1];

				cy.get('@bun').trigger('dragstart');
				cy.get('@constructor').trigger('drop');

				cy.get(`[data-testid="burger-top-${id}"]`).should('be.visible');
				cy.get(`[data-testid="burger-bottom-${id}"]`).should('be.visible');
			});

		cy.get('[data-testid^="ingredient-main-"]')
			.first()
			.as('filling')
			.invoke('attr', 'data-testid')
			.then((testId) => {
				const id = testId!.split('ingredient-main-')[1];

				cy.get('@filling').trigger('dragstart');
				cy.get('@constructor').trigger('drop');

				cy.get(`[data-testid="burger-filling-${id}"]`).should('exist');
			});
	});

	it('should open order details modal on clicking "Оформить заказ"', () => {
		cy.get('[data-testid="burger-constructor"]').as('constructor');

		cy.get('[data-testid^="ingredient-bun-"]').first().as('bun');
		cy.get('@bun').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('[data-testid^="ingredient-main-"]').first().as('filling');
		cy.get('@filling').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('[data-testid="order-button"]')
			.as('createOrderButton')
			.should('not.be.disabled')
			.click();

		cy.intercept('POST', '**/orders', {
			statusCode: 200,
			body: {
				success: true,
				order: {
					number: 123456,
				},
			},
		}).as('createOrderRequest');

		cy.wait('@createOrderRequest').then((interception) => {
			const orderNumber = interception.response.body.order.number;

			cy.get('[data-testid="order-details"]').as('modal').should('exist');
			cy.get('[data-testid="order-number"]')
				.invoke('text')
				.should('eq', orderNumber.toString());

			cy.get('[data-testid="close-modal-button"]').click();
			cy.get('@modal').should('not.exist');
		});
	});
});
