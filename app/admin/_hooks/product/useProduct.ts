import { ImageType } from './../../_types/product';
import { getMineProduct, getProduct, patchProduct, postProduct } from '@/admin/_services/product';
import { adminTokenStore } from '@/admin/_stores/adminTokenStore';
import { productIdStore } from '@/admin/_stores/productIdStore';
import { ProductFormDataType } from '@/admin/_types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export const useProduct = () => {
  const searchParams = useSearchParams();
  const studioId = searchParams.get('studioId');
  const productId = searchParams.get('productId') || undefined;

  const { token } = adminTokenStore();
  const { setProductId } = productIdStore();
  const router = useRouter();

  const methods = useForm<ProductFormDataType>({
    defaultValues: {
      productId: undefined,
      productType: 'WEDDING_SNAP',
      shootingPlace: 'JEJU',
      availableSeasons: [],
      cameraTypes: [],
      retouchStyles: [],
      mainImage: {},
      subImages: [],
      additionalImages: [],
      createdAt: '',
      updatedAt: '',
      options: [
        {
          productId: undefined,
          optionId: null,
          name: '',
          optionType: 'SINGLE',
          discountAvailable: false,
          originalPrice: 0,
          discountPrice: undefined,
          description: '',
          costumeCount: 0,
          shootingLocationCount: 0,
          shootingHours: 0,
          shootingMinutes: 0,
          retouchedCount: 0,
          originalProvided: false,
          partnerShops: [],
        },
      ],
    },
  });

  const { reset, control } = methods;

  const fetchProduct = async () => {
    if (!productId) {
      const { data: responseMineData } = await getMineProduct(token);
      if (responseMineData.length === 0) return;
      const mine = responseMineData.data[0];
      if (mine?.productId) {
        setProductId(mine.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${mine.productId}`);
        reset({
          ...mine,
          subImages: mine.subImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          additionalImages: mine.additionalImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
        });
      }
    } else {
      try {
        const { data: responseData } = await getProduct(token, productId);
        reset({
          ...responseData.data,
          subImages: responseData.data.subImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          additionalImages:
            responseData.data.additionalImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
        });
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, reset, token]);

  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (data: ProductFormDataType) => {
    const formData = new FormData();

    if (!productId) {
      const productInfo = {
        shootingPlace: data.shootingPlace,
        availableSeasons: data.availableSeasons,
        productType: data.productType,
        retouchStyles: data.retouchStyles,
        contactInfo: 'test contactInfo',
        studioId: Number(studioId),
        cameraTypes: data.cameraTypes,
        title: 'test',
        description: 'test 설명',
        detailedInfo: 'test 상세 설명',
        options: data.options,
      };

      formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
      formData.append('mainImageFile', data.mainImageFile!);
      data.subImageFiles?.forEach(file => formData.append('subImageFiles', file));
      data.additionalImageFiles?.forEach(file => formData.append('additionalImageFiles', file));

      try {
        const { data: productData } = await postProduct({ token, body: formData });
        alert('상품 등록에 성공했습니다.');
        setProductId(productData.data.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${productData.data.productId}`);
      } catch (error) {
        console.error(error, '상품 등록 실패');
      }
    } else {
      const subImagesFinal = data.subImages!.flatMap((img, index) => {
        const actions = [];

        if (img.action === 'UPLOAD' && 'deletedImageId' in img && img.deletedImageId) {
          actions.push({ action: 'DELETE', index, imageId: img.deletedImageId });
          actions.push({ action: 'UPLOAD', index, imageId: null });
          return actions;
        }

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', index, imageId: img.imageId });
        }

        if (img.action === 'UPLOAD' && !('deletedImageId' in img)) {
          console.warn('UPLOAD만 존재하는 잘못된 상태입니다. 서버가 거부할 수 있습니다.');
        }

        return actions;
      });

      const additionalImagesFinal = data.additionalImages!.flatMap(img => {
        const actions = [];

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', imageId: img.imageId });
        }

        if (img.action === 'DELETE') {
          actions.push({ action: 'DELETE', imageId: img.imageId });
        }

        if (img.action === 'UPLOAD') {
          actions.push({ action: 'UPLOAD', imageId: null });
        }

        return actions;
      });

      const productInfo = {
        productId: Number(productId),
        studioId: Number(studioId),
        productType: data.productType,
        shootingPlace: data.shootingPlace,
        title: 'test',
        description: 'test 설명',
        detailedInfo: 'test 상세 설명',
        availableSeasons: data.availableSeasons,
        cameraTypes: data.cameraTypes,
        retouchStyles: data.retouchStyles,
        contactInfo: '010-1234-5678',
        subImagesFinal,
        additionalImagesFinal,
      };

      const optionsInfo = data.options;

      formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
      formData.append('options', new Blob([JSON.stringify(optionsInfo)], { type: 'application/json' }));

      if (data.mainImageFile) {
        formData.append('mainImageFile', data.mainImageFile);
      }
      data.subImageFiles?.forEach(file => formData.append('subImageFiles', file));
      data.additionalImageFiles?.forEach(file => formData.append('additionalImageFiles', file));

      console.log(data.subImageFiles);
      console.log(productInfo);
      console.log(optionsInfo);

      try {
        const { data: updatedProduct } = await patchProduct({
          token,
          productId,
          body: formData,
        });

        alert('상품 수정에 성공했습니다.');
        reset(updatedProduct.data);
      } catch (error) {
        console.error('상품 수정 실패:', error);
      }
    }
  };

  return {
    ...methods,
    onSubmit,
    optionFields,
    optionAppend,
    optionRemove,
  };
};
