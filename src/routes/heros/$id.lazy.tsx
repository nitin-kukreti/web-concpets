import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { herosQueryOptionById } from '../../api/herro.api';

export const Route = createLazyFileRoute('/heros/$id')({
  component: Hero,
});


function Hero(){
  const {id} = Route.useParams();
  const {data,isLoading,isError,error} = useQuery(herosQueryOptionById(id));
  if(isLoading) return <div>...loading</div>
  if(isError) return <div>something went wrong {error.message}</div>
  return <div>
       <div>{data && data[0]?.hero}</div>
       <div>{data && data[0]?.alterEgo}</div>
  </div>
}