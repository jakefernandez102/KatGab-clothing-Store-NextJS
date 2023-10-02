import StoreContext from "@/context/StoreProvider";
import { useContext } from  "react" ;

const useStore = ()=>{
    return useContext(StoreContext)
}
export default useStore