import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { University, useUniversityStore } from '@/store/universityStore';

const universitySchema = z.object({
  name: z.string().min(2, 'نام دانشگاه باید حداقل ۲ کاراکتر باشد'),
  city: z.string().optional(),
  type: z.enum(['دولتی', 'آزاد', 'غیرانتفاعی', 'پیام نور']).optional(),
});

type UniversityFormData = z.infer<typeof universitySchema>;

interface UniversityFormProps {
  university?: University;
  onSuccess?: () => void;
}

export default function UniversityForm({ university, onSuccess }: UniversityFormProps) {
  const { addUniversity, updateUniversity } = useUniversityStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UniversityFormData>({
    resolver: zodResolver(universitySchema),
    defaultValues: university || {
      name: '',
      city: '',
      type: 'دولتی',
    },
  });

  const onSubmit = async (data: UniversityFormData) => {
    setIsSubmitting(true);
    try {
      if (university) {
        updateUniversity(university.id, data);
      } else {
        addUniversity(data);
        reset();
      }
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            نام دانشگاه <span className="text-red-500">*</span>
          </label>
          <input
              id="name"
              type="text"
              {...register('name')}
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              placeholder="نام دانشگاه را وارد کنید"
              className={`mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text placeholder:text-muted shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition
            ${errors.name ? 'border-red-600 focus:ring-red-400 focus:border-red-600' : ''}`}
          />
          {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-text mb-1">
            شهر
          </label>
          <input
              id="city"
              type="text"
              {...register('city')}
              placeholder="شهر دانشگاه (اختیاری)"
              className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text placeholder:text-muted shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
          />
        </div>


        <div>
          <label htmlFor="type" className="block text-sm font-medium text-text mb-1">
            نوع دانشگاه
          </label>
          <div className="relative ">
            <select
                id="type"
                {...register('type')}
                defaultValue={university?.type || 'دولتی'}
                className={`appearance-none !cursor-pointer mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 pr-10 text-text shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition
              ${
                    errors.type
                        ? 'border-red-600 focus:ring-red-400 focus:border-red-600'
                        : ''
                }`}
                aria-invalid={!!errors.type}
                aria-describedby="type-error"
            >
              <option value="دولتی">دولتی</option>
              <option value="آزاد">آزاد</option>
              <option value="غیرانتفاعی">غیرانتفاعی</option>
              <option value="پیام نور">پیام نور</option>
            </select>

            <div className="pointer-events-none  absolute inset-y-0 right-3 flex items-center">
              <svg
                  className="h-5 w-5 text-muted"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
              >
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {errors.type && (
              <p id="type-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.type.message}
              </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-primary text-white hover:bg-primary-hover w-full btn-primary px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {university ? 'ویرایش دانشگاه' : 'افزودن دانشگاه'}
          </button>
        </div>
      </form>
  );
}
