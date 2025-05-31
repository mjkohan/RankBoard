import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Major, useUniversityStore } from '@/store/universityStore';

const majorSchema = z.object({
  name: z.string().min(2, 'نام رشته باید حداقل ۲ کاراکتر باشد'),
  universityId: z.string().min(1, 'انتخاب دانشگاه الزامی است'),
  code: z.string().optional(),
  capacity: z.number().optional(),
});

type MajorFormData = z.infer<typeof majorSchema>;

interface MajorFormProps {
  major?: Major;
  universityId?: string;
  onSuccess?: () => void;
}

export default function MajorForm({ major, universityId, onSuccess }: MajorFormProps) {
  const { universities, addMajor, updateMajor } = useUniversityStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MajorFormData>({
    resolver: zodResolver(majorSchema),
    defaultValues: major || {
      name: '',
      universityId: universityId || '',
      code: '',
      capacity: undefined,
    },
  });

  const onSubmit = async (data: MajorFormData) => {
    setIsSubmitting(true);
    try {
      if (major) {
        updateMajor(major.id, data);
      } else {
        addMajor(data);
        reset();
      }
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text">
            نام رشته
          </label>
          <input
              id="name"
              type="text"
              {...register('name')}
              className={`mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text placeholder:text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition`}
              placeholder="نام رشته را وارد کنید"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
          />
          {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
          )}
        </div>

        {!universityId && (
            <div>
              <label htmlFor="universityId" className="block text-sm font-medium text-text">
                دانشگاه
              </label>
              <select
                  id="universityId"
                  {...register('universityId')}
                  className={`mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition`}
                  aria-invalid={!!errors.universityId}
                  aria-describedby="universityId-error"
                  defaultValue=""
              >
                <option value="" disabled>
                  انتخاب دانشگاه
                </option>
                {universities.map((univ) => (
                    <option key={univ.id} value={univ.id}>
                      {univ.name}
                    </option>
                ))}
              </select>
              {errors.universityId && (
                  <p id="universityId-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.universityId.message}
                  </p>
              )}
            </div>
        )}

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-text">
            کد رشته
          </label>
          <input
              id="code"
              type="text"
              {...register('code')}
              className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text placeholder:text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="کد رشته (اختیاری)"
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-text">
            ظرفیت
          </label>
          <input
              id="capacity"
              type="number"
              {...register('capacity', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-text placeholder:text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="ظرفیت "
              min={0}
          />
        </div>

        <div className="flex justify-center">
          <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary bg-primary text-white hover:bg-primary-hover w-full px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {major ? 'ویرایش رشته' : 'افزودن رشته'}
          </button>
        </div>
      </form>
  );
}
