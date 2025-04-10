import { getMineProduct, getProduct, postProduct } from '@/admin/_services/product';
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
      // title: '',
      // description: '',
      availableSeasons: [],
      cameraTypes: [],
      retouchStyles: [],
      mainImage: {},
      subImages: [],
      additionalImages: [],
      // detailedInfo: '',
      // contactInfo: '',
      options: [
        {
          optionId: undefined,
          productId: undefined,
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

      if (responseMineData.data[0].productId) {
        setProductId(responseMineData.data.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${responseMineData.data.productId}`);
        reset({ ...responseMineData.data });
      }
    } else {
      try {
        const { data: responseData } = await getProduct(token, productId);
        reset({ ...responseData.data });
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

    const productInfo = {
      // TODO : 임시 값 수정 필요
      title: 'test',
      shootingPlace: data.shootingPlace,
      contactInfo: 'test contactInfo',
      availableSeasons: data.availableSeasons,
      productType: data.productType,
      retouchStyles: data.retouchStyles,
      studioId: studioId,
      cameraTypes: data.cameraTypes,
      description: 'test 설명',
      detailedInfo: 'test 상세 설명',
      options: data.options,
    };

    formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
    formData.append('mainImageFile', data.mainImageFile!);
    data.subImageFiles?.forEach(file => {
      formData.append('subImageFiles', file);
    });
    if (data.additionalImageFiles) {
      data.additionalImageFiles?.forEach(file => {
        formData.append('subImageFiles', file);
      });
    }

    if (!productId) {
      try {
        formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
        formData.append('mainImageFile', data.mainImageFile!);
        data.subImageFiles?.forEach(file => {
          formData.append('subImageFiles', file);
        });
        if (data.additionalImageFiles) {
          data.additionalImageFiles?.forEach(file => {
            formData.append('subImageFiles', file);
          });
        }
        const { data: productData } = await postProduct({ token, body: formData });
        alert('상품 등록에 성공했습니다.');
        setProductId(productData.data.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${productData.data.productId}`);
      } catch (error) {
        console.error(error, '상품 등록 실패');
      }
    } else {
      try {
      } catch {}
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
