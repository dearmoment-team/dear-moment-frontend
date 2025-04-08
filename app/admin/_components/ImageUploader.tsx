'use client';

import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageType } from '../_types/product';
import Image from 'next/image';

const MAX_IMAGE_COUNT = 4;

const ImageUploader = () => {
  const { watch, setValue } = useFormContext();

  const mainImage = (watch('mainImage') ?? { imageId: undefined, url: '' }) as ImageType;
  const subImages: ImageType[] = watch('subImages') || [];
  const subImageFiles: File[] = watch('subImageFiles') || [];
  const additionalImages: ImageType[] = watch('additionalImages') || [];
  const additionalImageFiles: File[] = watch('additionalImageFiles') || [];

  const mainInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const showLimitAlert = () => {
    alert(`최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setValue('mainImageFile', file);
    setValue('mainImage', { imageId: undefined, url: previewUrl });

    e.target.value = '';
  };

  const handleSubImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGE_COUNT - subImageFiles.length;
    if (remaining <= 0) {
      showLimitAlert();
      e.target.value = '';
      return;
    }

    const filesToAdd = files.slice(0, remaining);
    const previews = filesToAdd.map(file => ({
      imageId: undefined,
      url: URL.createObjectURL(file),
    }));

    setValue('subImageFiles', [...subImageFiles, ...filesToAdd]);
    setValue('subImages', [...subImages, ...previews]);
    e.target.value = '';
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGE_COUNT - additionalImageFiles.length;
    if (remaining <= 0) {
      showLimitAlert();
      e.target.value = '';
      return;
    }

    const filesToAdd = files.slice(0, remaining);
    const previews = filesToAdd.map(file => ({
      imageId: undefined,
      url: URL.createObjectURL(file),
    }));

    setValue('additionalImageFiles', [...additionalImageFiles, ...filesToAdd]);
    setValue('additionalImages', [...additionalImages, ...previews]);
    e.target.value = '';
  };

  const handleRemoveImage = (type: 'main' | 'sub' | 'add', index?: number) => {
    if (type === 'main') {
      if (mainImage?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(mainImage.url);
      }
      setValue('mainImageFile', undefined);
      setValue('mainImage', { imageId: undefined, url: '' });
    } else if (type === 'sub' && typeof index === 'number') {
      const removedUrl = subImages[index]?.url;
      if (removedUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(removedUrl);
      }

      setValue(
        'subImageFiles',
        subImageFiles.filter((_, i) => i !== index)
      );
      setValue(
        'subImages',
        subImages.filter((_, i) => i !== index)
      );
    } else if (type === 'add' && typeof index === 'number') {
      const removedUrl = additionalImages[index]?.url;
      if (removedUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(removedUrl);
      }

      setValue(
        'additionalImageFiles',
        additionalImageFiles.filter((_, i) => i !== index)
      );
      setValue(
        'additionalImages',
        additionalImages.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 대표 이미지 */}
        <div>
          <label className="mb-1 block">
            대표 이미지 <span className="text-[#FF0000]">*</span>
          </label>
          <input type="file" onChange={handleMainImageChange} ref={mainInputRef} className="hidden" accept="image/*" />
          <label
            onClick={() => mainInputRef.current?.click()}
            className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
          >
            파일 추가
          </label>
          {mainImage?.url && mainImage.url !== '' && (
            <div className="relative mt-2 h-32 w-32">
              <Image src={mainImage.url} alt="Main Image" fill sizes="128px" style={{ objectFit: 'cover' }} />
              <button
                type="button"
                className="absolute right-0 top-0 h-6 w-6 rounded-full bg-red-600 text-xs text-white"
                onClick={() => handleRemoveImage('main')}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 서브 이미지 */}
        <div>
          <label className="mb-1 block">
            서브 이미지 <span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="file"
            multiple
            ref={subInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleSubImagesChange}
          />
          <label
            onClick={() => subInputRef.current?.click()}
            className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
          >
            파일 추가
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {subImages.map(
              (img, index) =>
                img.url && (
                  <div key={index} className="relative h-24 w-24">
                    <Image
                      src={img.url}
                      alt={`Sub Image ${index + 1}`}
                      fill
                      sizes="96px"
                      style={{ objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('sub', index)}
                      className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-600 text-xs text-white"
                    >
                      ×
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* 추가 이미지 */}
      <div className="mt-6">
        <label className="mb-1 block">추가 이미지</label>
        <input
          type="file"
          multiple
          ref={addInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAdditionalImagesChange}
        />
        <label
          onClick={() => addInputRef.current?.click()}
          className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
        >
          파일 추가
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {additionalImages.map(
            (img, index) =>
              img.url && (
                <div key={index} className="relative h-24 w-24">
                  <Image
                    src={img.url}
                    alt={`Additional Image ${index + 1}`}
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage('add', index)}
                    className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-600 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
