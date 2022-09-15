import tracker from "../utils/tracker";
import { useEffect } from "react";
import getSelector from "../utils/getSelector";
import getLastEvent from "../utils/getLastEvent";
export default function ErrorMonitor(props) {
  useEffect(() => {
    return () => {
      window.removeEventListener("error", jsErrorCapture);
      window.removeEventListener("unhandledrejection", unhandledrejection);
    };
  }, []);
  const jsErrorCapture = (e) => {
    e.preventDefault();
    const temp = e.message.search(/:\s/);
    tracker.send({
      kind:'JSerror',
      url: e.target.location.href,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      message: e.message.slice(temp + 2),
      type: e.message.slice(0, temp).split(" ")[1],
    });
  };
  const unhandledrejection = (e) => {
    e.preventDefault();
    const lastEvent = getLastEvent();
    // let reason = e.reason;
    // if (typeof e.reason === "string") {
    //   message = reason;
    // } else if (typeof e.reason === "object") {
    //   let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)\n/);
    //   filename = matchResult[1];
    //   line = matchResult[2];
    //   column = matchResult[3];
    //   message = reason.stack.message;
    //   stack = getLines(reason.stack);
    // }
    tracker.send({
      kind: "JSerror", //监控指标的大类
      type: e.type, //小类型
      url: e.target.location.href,
      selector: lastEvent ? getSelector(lastEvent.path) : "",
    });
  };
  window.addEventListener("error", jsErrorCapture, true);

  window.addEventListener("unhandledrejection", unhandledrejection);

  return <>{props.children}</>;
}
