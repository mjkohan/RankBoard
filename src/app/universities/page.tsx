'use client';

import { useState } from 'react';
import UniversityForm from '../../components/UniversityForm';
import MajorForm from '../../components/MajorForm';
import { University, Major, useUniversityStore } from '@/store/universityStore';

export default function UniversitiesPage() {
  const { universities, majors, removeUniversity, removeMajor } = useUniversityStore();
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [showMajorForm, setShowMajorForm] = useState(false);

  const handleUniversitySuccess = () => {
    setShowUniversityForm(false);
    setEditingUniversity(null);
  };

  const handleMajorSuccess = () => {
    setShowMajorForm(false);
    setEditingMajor(null);
  };

  const filteredMajors = selectedUniversity
      ? majors.filter(major => major.universityId === selectedUniversity.id)
      : [];

  return (
      <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-secondary/50 to-white text-text py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Universities List */}
            <section className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 border border-border h-fit">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-display font-semibold text-primary">دانشگاه‌ها</h2>
                <button
                    className="btn btn-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-2"
                    onClick={() => {
                      setEditingUniversity(null);
                      setShowUniversityForm(true);
                    }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  افزودن
                </button>
              </div>

              {showUniversityForm && (
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 shadow-sm p-5">
                  <h3 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {editingUniversity ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                    {editingUniversity ? 'ویرایش دانشگاه' : 'افزودن دانشگاه جدید'}
                  </h3>
                  <UniversityForm
                    university={editingUniversity || undefined}
                    onSuccess={handleUniversitySuccess}
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setShowUniversityForm(false);
                        setEditingUniversity(null);
                      }}
                      className="text-muted hover:text-text text-sm flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      انصراف
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                {universities.length === 0 ? (
                  <div className="bg-secondary/20 p-6 text-center rounded-xl border border-border/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-muted/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-muted">هنوز دانشگاهی اضافه نشده است</p>
                    <button
                      className="mt-3 text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 mx-auto"
                      onClick={() => {
                        setEditingUniversity(null);
                        setShowUniversityForm(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      افزودن اولین دانشگاه
                    </button>
                  </div>
                ) : (
                  universities.map(university => (
                    <div
                      key={university.id}
                      className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 hover:shadow-md ${
                        selectedUniversity?.id === university.id
                          ? 'bg-primary/10 border-primary shadow-sm'
                          : 'bg-white border-border/50 hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedUniversity(university)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedUniversity?.id === university.id ? 'bg-primary/20 text-primary' : 'bg-secondary/30 text-muted'
                          }`}>
                            {university.name.substring(0, 1)}
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-text">{university.name}</h3>
                            {university.city && (
                              <p className="text-sm text-muted flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {university.city}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button
                            aria-label={`ویرایش دانشگاه ${university.name}`}
                            className="text-primary p-1.5 hover:bg-primary/10 rounded-full transition-colors "
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingUniversity(university);
                              setShowUniversityForm(true);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                              <path d="M16.586 3.586a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            aria-label={`حذف دانشگاه ${university.name}`}
                            className="text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('آیا از حذف این دانشگاه اطمینان دارید؟')) {
                                removeUniversity(university.id);
                                if (selectedUniversity?.id === university.id) {
                                  setSelectedUniversity(null);
                                }
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                              <path d="M10 11v6m4-6v6" />
                              <path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                              <path d="M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                ))
              )}
            </div>
          </section>

          {/* Majors List */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 h-fit border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold text-primary flex items-center gap-2">
                {selectedUniversity ? (
                  <>
                    <span>رشته‌های</span>
                    <span className="text-text">{selectedUniversity.name}</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      {filteredMajors.length} رشته
                    </span>
                  </>
                ) : (
                  'رشته‌ها'
                )}
              </h2>
              {selectedUniversity && (
                <button
                  className="btn btn-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-2"
                  onClick={() => {
                    setEditingMajor(null);
                    setShowMajorForm(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  افزودن رشته
                </button>
              )}
            </div>

            {!selectedUniversity ? (
              <div className="bg-secondary/20 p-8 text-center rounded-xl border border-border/50 flex flex-col items-center justify-center min-h-[300px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-muted/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-muted mb-2">برای مدیریت رشته‌ها ابتدا یک دانشگاه انتخاب کنید</p>
                <p className="text-sm text-muted/70">از لیست سمت راست یک دانشگاه را انتخاب کنید</p>
              </div>
            ) : (
              <>
                {showMajorForm && (
                  <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 shadow-sm p-5">
                    <h3 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {editingMajor ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        )}
                      </svg>
                      {editingMajor ? 'ویرایش رشته' : 'افزودن رشته جدید'}
                    </h3>
                    <MajorForm
                      major={editingMajor || undefined}
                      universityId={selectedUniversity.id}
                      onSuccess={handleMajorSuccess}
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          setShowMajorForm(false);
                          setEditingMajor(null);
                        }}
                        className="text-muted hover:text-text text-sm flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        انصراف
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredMajors.length === 0 ? (
                    <div className="md:col-span-2 bg-secondary/20 p-6 text-center rounded-xl border border-border/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-muted/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-muted">هنوز رشته‌ای برای این دانشگاه اضافه نشده است</p>
                      <button
                        className="mt-3 text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 mx-auto"
                        onClick={() => {
                          setEditingMajor(null);
                          setShowMajorForm(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        افزودن اولین رشته
                      </button>
                    </div>
                  ) : (
                    filteredMajors.map(major => (
                      <div
                        key={major.id}
                        className="p-4 rounded-xl border border-border/50 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-display font-semibold text-text">{major.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {major.code && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted bg-secondary/30 px-2 py-1 rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                  </svg>
                                  کد: {major.code}
                                </span>
                              )}
                              {major.capacity && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted bg-secondary/30 px-2 py-1 rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  ظرفیت: {major.capacity}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button
                              aria-label={`ویرایش رشته ${major.name}`}
                              className="text-primary p-1.5 hover:bg-primary/10 rounded-full transition-colors"
                              onClick={() => {
                                setEditingMajor(major);
                                setShowMajorForm(true);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                                <path d="M16.586 3.586a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              aria-label={`حذف رشته ${major.name}`}
                              className="text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                              onClick={() => {
                                if (confirm('آیا از حذف این رشته اطمینان دارید؟')) {
                                  removeMajor(major.id);
                                }
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                                <path d="M10 11v6m4-6v6" />
                                <path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                                <path d="M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>


    </main>
  );
}
