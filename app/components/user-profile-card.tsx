import React from 'react';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userCreateSchema } from '@/lib/validations/userSchema';

type UserProfileFormData = {
    email: string;
    name?: string;
    image?: string;
};

const UserProfileCard = ({ onSubmit }: { onSubmit: (data: UserProfileFormData) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userCreateSchema),
  });

interface UserProfileCardProps {
    onSubmit: (data: UserProfileFormData) => void;
}

const onSubmitForm = (data: UserProfileFormData) => {
    onSubmit(data);
};

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input {...register('email', { required: true })} placeholder="Email" />
      {typeof errors.email?.message === 'string' && <p className="error">{errors.email.message}</p>}

      <input {...register('name')} placeholder="Name" />

      <input {...register('image', { required: false })} placeholder="Image URL" />

      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};