import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CreateDeadlineDto } from '../types';

export function useDeadlineForm(initialValues: CreateDeadlineDto, onSubmit: (values: CreateDeadlineDto) => void) {
  const [values, setValues] = useState<CreateDeadlineDto>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.subject.trim() || !values.title.trim() || !values.dueDate) return;
    onSubmit(values);
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, reset: () => setValues(initialValues) };
}