import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { data, isPending, error } = useQuery(userQueryOptions)

  if (isPending) return 'Loading'
  if (error) return 'not logged in'

  return (
    <div>
      <h1 className='mb-4'>Profile</h1>
      <p>Hello {data.user.family_name}</p>
      <a href="/api/logout">Logout</a>
    </div>
  )
}
