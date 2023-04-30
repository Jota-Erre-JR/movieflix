import {Review} from "./review";
import {Genre} from "./genre";

export type Movie ={
    
        id: number;
        title: string;
        subTitle: string;
        year: number;
        imgUrl: string;
        synopsis: string;
        genres: Genre[];
        reviews: Review[];
}