import { useCallback, useState, ChangeEvent } from 'react';

const useFormValidator = <T extends Record<string, string | number>>(
	initialValues: T
) => {
	const [inputValues, setInputValues] = useState<T>(initialValues);
	const [errorMessages, setErrorMessages] = useState<
		Partial<Record<keyof T, string>>
	>({});
	const [isValid, setIsValid] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setInputValues({ ...inputValues, [name]: value });
		setErrorMessages({
			...errorMessages,
			[name]: event.target.validationMessage,
		});
		const form = event.target.closest('form');
		setIsValid(form ? form.checkValidity() : true);
	};

	const resetForm = useCallback(() => {
		setInputValues(initialValues);
		setErrorMessages({});
		setIsValid(false);
	}, [initialValues]);

	return {
		inputValues,
		errorMessages,
		isValid,
		handleChange,
		resetForm,
		setInputValues,
		setIsValid,
	};
};

export default useFormValidator;
