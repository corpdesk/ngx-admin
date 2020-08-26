/**
 * interface for palette controlls
 * Created: 
 *  @georemo
 *  August 2020
 */

export interface CarouselData {
    title: string;
    autoSetting:{
        active: boolean;
        timeOut?: number;
    };
    content: CarouselContent[]
}

export interface CarouselContent {
    numbertext: string;
    src: string;
    style: string;
    caption: string;
}