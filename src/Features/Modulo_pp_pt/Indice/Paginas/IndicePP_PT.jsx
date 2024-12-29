import { IndicePP_PT_organismo } from "../Organismos/IndicePP_PT_organismo"
import { CardPP_molecula } from "../../Vista_pp/Moleculas/CardPP_molecula/CardPP_molecula"

export function IndicePP_PT(){
    return(
        <>
            <IndicePP_PT_organismo></IndicePP_PT_organismo>
            <CardPP_molecula></CardPP_molecula>
        </>
    )
}