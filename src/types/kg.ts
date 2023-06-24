export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface CategoryPhoto {
  name: string;
  photo: ComplexImage;
  slug?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface CategoryLink {
  name: string;
  slug: string;
}
