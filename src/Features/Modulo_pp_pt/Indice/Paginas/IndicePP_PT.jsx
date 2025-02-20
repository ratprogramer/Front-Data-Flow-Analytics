import { IndicePP_PT_organismo } from "../Organismos/IndicePP_PT_organismo"
import { CardPP_molecula } from "../../Vista_pp/Moleculas/CardPP_molecula/CardPP_molecula"
import './IndicePP_PT.css'

export function IndicePP_PT(){
    return(
        <div className="indicepppt">
            <IndicePP_PT_organismo />
            <CardPP_molecula />
        </div>
    )
}