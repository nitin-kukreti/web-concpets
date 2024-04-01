import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
    const navigate = useNavigate();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={()=>{
        navigate({to:'/about',params:{
            person: 'nitin',
            age: 23,
        }})
      }}>navigate to about</button>
    </div>
  )
}