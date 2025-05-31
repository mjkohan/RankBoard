import Link from "next/link";

export default function Dashboard() {
  return (
      <main className="min-h-[calc(100vh-4rem)]  text-text py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl  border border-border bg-white shadow-sm p-6 flex flex-col justify-between transition-shadow hover:shadow-md">
              <div>
                <h2 className="text-xl font-display font-semibold text-text mb-3">
                  مدیریت دانشگاه‌ها
                </h2>
                <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
                  افزودن، ویرایش و حذف دانشگاه‌ها و رشته‌های تحصیلی
                </p>
              </div>
              <Link
                  href="/universities"
                  className="inline-block text-center text-white bg-primary hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg text-sm sm:text-base font-medium"
              >
                ورود به بخش مدیریت
              </Link>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-border bg-white shadow-sm p-6 flex flex-col justify-between transition-shadow hover:shadow-md">
              <div>
                <h2 className="text-xl font-display font-semibold text-text mb-3">
                  انتخاب رشته
                </h2>
                <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
                  جستجو و انتخاب رشته‌های مورد نظر و اولویت‌بندی آن‌ها
                </p>
              </div>
              <Link
                  href="/selection"
                  className="inline-block text-center text-white bg-primary hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg text-sm sm:text-base font-medium"
              >
                شروع انتخاب رشته
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}
