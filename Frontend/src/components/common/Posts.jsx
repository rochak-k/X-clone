import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";

const Posts = ({feedType , username , userId}) => {
const getPostEndPoint = () => {
switch (feedType) {
	case "forYou":
	return "/api/post/all"
    case "following" : 
	return "/api/post/followingPosts"
  case "posts" : 
  return `/api/post/userPosts/${username}`
  case  "likes" :
  return `/api/post/likedPosts/${userId}`
	default:
	return "/api/post/all"
}}
const POST_ENDPOINT = getPostEndPoint ();
  const {data : posts , isLoading} = useQuery({
	queryKey : ['posts',feedType] ,
	queryFn : async () =>{
		try {
			const res = await fetch(POST_ENDPOINT)
			const data = await res.json()
			if(!res.ok){
        throw new Error (data.error || "Something went wrong")
      }
      return data;
		} catch (error) {
			throw new Error (error)
		}
	}
  })
  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
