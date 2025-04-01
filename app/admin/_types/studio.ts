interface PartnerShopsType {
    category: 'MODERN' | 'CHIC' | 'CALM' | 'VINTAGE' | 'FAIRYTALE' | 'WARM' | 'DREAMY' | 'BRIGHT' | 'NATURAL';
    name: string;
    urlLink: string;
  }
  
  export interface StudioFormDataType {
    id?: number;
    userId?: number;
    status: 'ACTIVE' | 'INACTIVE';
    name: string;
    contact: string;
    studioIntro: string;
    artistsIntro: string;
    instagramUrl: string;
    kakaoChannelUrl: string;
    reservationNotice?: string;
    cancellationPolicy?: string;
    partnerShops?: PartnerShopsType[];
    isCasted: boolean;
  }
  
  export const DEFAULT_STUDIO_DATA: StudioFormDataType = {
    status: 'ACTIVE',
    name: '',
    contact: '',
    studioIntro: '',
    artistsIntro: '',
    instagramUrl: '',
    kakaoChannelUrl: '',
    reservationNotice: '',
    cancellationPolicy: '',
    partnerShops: [],
    isCasted: true
  };
  