import { useParams } from "react-router-dom";
import PokeLookUp from "../component/PokeLookUp";
import Pokemon from "./Pokemon";

const SearchPage = () => {
    const {type} = useParams();
    return ( 
        <div>
            This is the Search Page.
            {type === 'bulbasaur' && <Pokemon />}
            <PokeLookUp />
        </div>
     );
}
 
export default SearchPage;