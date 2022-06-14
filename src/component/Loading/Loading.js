import dexLogo from '../../images/pokeapi-dex-icon.png'
import './Loading.css'
//fix: add a looping gif here later
export default function Loading() {
  return (
    <div className='text-center'>
    <h1 className="display-2">Loading . . .</h1>
    <img src={dexLogo} alt="" className='spinning'/>
    </div>
  )
}
