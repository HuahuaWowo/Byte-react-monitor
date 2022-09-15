import tracker from "../utils/tracker";
import { useEffect } from "react";
import { useLocation,useParams } from "react-router-dom";
export default function PageDuration(props) {
  const location = useLocation();
  const params=useParams()
  useEffect(() => {
    let start = Date.now();
    return () => {
      tracker.send({
        kind:'pageStay',
        url: location.pathname,
        query: location.search.slice(1).split('&')
        .map((item)=>{
          item=item.split('=')
          return {[item[0]]:item[1]}
        }),
        params,
        duration: Date.now() - start,
      },[location,params]);
    };
  });
  return <>{props.children}</>;
}
