import cloud from "../../../../static/image/cloud.svg";

import classes from "./NotFound.module.css";

export const NotFound = () => {
   return (
      <div className={classes.notFound}>
         <div>
            <img src={cloud} alt="cloud" />
         </div>
         <div className={classes.notFoundText}>
            We could not find weather information for the location above
         </div>
      </div>
   );
};
