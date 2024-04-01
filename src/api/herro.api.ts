import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export interface HeroInterface  {
    id: string,
    hero: string,
    alterEgo: string
}

export interface HeroApiResponse {
   first: number,
   prev: number,
   next: number,
   last: number,
   pages: number,
   items : number,
   data: HeroInterface[]
}

export async function fetchAllHeroes(){
    // await (new Promise((resolve)=>{
    //     setTimeout(()=>{
    //         resolve(1);
    //     },1000);
    // }));
    const herroResponse = await axios.get<HeroInterface[]>('http://localhost:4000/superheros');
    return herroResponse.data;
}

export async function fetchHeroesById(id:string|number){
    // await (new Promise((resolve)=>{
    //     setTimeout(()=>{
    //         resolve(1);
    //     },1000);
    // }));
    const herroResponse = await axios.get<HeroInterface[]>(`http://localhost:4000/superheros?id=${id}`);
    return herroResponse.data;
}

export async function registerNewHero(hero:HeroInterface){
    const herroResponse = await axios.post<HeroInterface>('http://localhost:4000/superheros',hero);
    return herroResponse.data;
}




export async function getHerosPage ({ pageParam }:{pageParam:number}) {
    await (new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(1);
        },2000);
    }));
    const herroResponse = await axios.get<HeroApiResponse>(`http://localhost:4000/superheros?_page=${pageParam}&_per_page=${12}`);
    return herroResponse;
  }



export function herosQueryOption(){
    return queryOptions({
        queryKey: ['heros'],
        queryFn: fetchAllHeroes,
        refetchOnWindowFocus: false,
        staleTime: 1000,
        refetchOnMount: false,
    })
}
export function herosQueryOptionById(id:number|string){
    return queryOptions({
        queryKey: ['herosId',id],
        queryFn: ()=>fetchHeroesById(id),
        staleTime: 1000 * 60 *5,
    })
}


