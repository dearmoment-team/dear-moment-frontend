'use client'

import { StudioFormDataType } from "@/admin/_types/studio";
import { useForm } from "react-hook-form";

export const usePostStudio = () => {
    const methods = useForm<StudioFormDataType>({
        defaultValues: {
            status: 'ACTIVE',
            isCasted: true,
            name: '',
            contact: '',
            studioIntro: '',
            artistsIntro: '',
            instagramUrl: '',
            kakaoChannelUrl: '',
            reservationNotice: '',
            cancellationPolicy: '',
            partnerShops: [],
        }
    })

    const { reset } = methods;

    const onSubmit = async (data: StudioFormDataType) => {
        try {
          console.log('Form data:', data);
          // API 호출 로직
          reset()
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

    return {
        ...methods,
        onSubmit,
      };
}