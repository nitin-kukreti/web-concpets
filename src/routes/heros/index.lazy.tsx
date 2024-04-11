import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { getHerosPage, registerNewHero } from '../../api/herro.api';
import {  useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, CircularProgress, FormControl, FormLabel, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const Route = createLazyFileRoute('/heros/')({
  component: HerosList,
});

function HerosList(){
  const {ref,inView} = useInView()
  const queryClient = useQueryClient();
  const {data,isLoading,fetchNextPage,isFetchingNextPage} = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['heros'],
    queryFn: getHerosPage,
    getNextPageParam: ({data})=> data.next,
    getPreviousPageParam: ({data})=> data.prev,
  });
  const [state,setState] = useState({
     hero : '',
     alterEgo: ''
  });

  useEffect(()=>{
    if(inView){
      fetchNextPage();
    }
  },[inView,fetchNextPage])
  const navigate = useNavigate({from: '/heros/$id'});
  const {mutate} = useMutation({
    mutationFn: registerNewHero,
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ['heros'],});
    }
  });
  const registerNewHeroHandel = ()=>{
    const id = Date.now().toString(36);
    mutate({...state,id});

  }
  if(isLoading) return <div>loading</div>
  console.log(data);
  return <Stack alignItems="center">
     <Stack spacing={1}>
      <FormControl>
       <FormLabel>Hero Name</FormLabel>
       <TextField value={state.hero} onChange={(e)=>{setState((val)=>({...val,hero:e.target.value}))}}/>
      </FormControl>
      <FormControl>
       <FormLabel>Alter Ego </FormLabel>
       <TextField value={state.alterEgo} onChange={(e)=>{setState((val)=>({...val,alterEgo:e.target.value}))}}/>
      </FormControl>
      <Button
      variant='rounded'
      sx={{color: (theme)=>theme.palette.primary.dark}}
      size='extraLarge'
      onClick={registerNewHeroHandel}
      >save</Button>
     </Stack>
     {data?.pages?.map(({data})=>{
       return data.data.map(({alterEgo,hero,id})=>{
      return  <Stack height={150} key={id} onClick={ ()=>{

          navigate({to:'/heros/$id',params: {id}});
        }
         }>
         <h1>{hero}</h1>
         <h2>{alterEgo}</h2>
        </Stack>
       })
     }
    )
     }
     {isFetchingNextPage && <CircularProgress />}
     <div ref={ref}></div>
  </Stack>
}


