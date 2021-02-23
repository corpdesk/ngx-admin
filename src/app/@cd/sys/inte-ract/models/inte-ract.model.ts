export interface InteRactData {
  pushRecepients?: any;
  inte_ract_media?: InteRactMedia;
  data?: InteRactPub;
}

export interface InteRactPub {
  inte_ract_pub_id?: number;
  inte_ract_pub_guid?: string;
  inte_ract_pub_name?: string;
  inte_ract_pub_description?: string;
  doc_id?: number;
  inte_ract_pub_type_id?: number;
  public?: string;
  m?: string;
  c?: string;
  j_val?: string;
}

export interface InteRactMedia {
  inte_ract_media_id?: number;
  inte_ract_media_guid?: string;
  inte_ract_media_name?: string;
  inte_ract_media_description?: string;
  doc_id?: number;
  inte_ract_media_type_id?: number;
  inte_ract_pub_id?: number;
  inte_ract_react_id?: number;
  location?: string;
  mime_type?: string;
}

export interface InteRactReact {
  inte_ract_react_id?: number;
  inte_ract_react_guid?: string;
  inte_ract_react_name?: string;
  inte_ract_react_description?: string;
  doc_id?: number;
  inte_ract_react_type_id?: number;
  inte_ract_react_type_optval?: string;
  j_val?: string;
  inte_ract_pub_id?: number;
  parent_id?: number;
}

