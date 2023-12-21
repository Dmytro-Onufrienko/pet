import { useCurrentUserLazyQuery, } from "../../../../types.d"

const Homepage = () => {
  const [loadGreeting, { data }] = useCurrentUserLazyQuery();

  const handleClick = () => {
    loadGreeting()
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>
          getUser
        </button>
        {data && <>{data.currentUser.username}</>}
      </div>
    </>
  )
}

export default Homepage;
