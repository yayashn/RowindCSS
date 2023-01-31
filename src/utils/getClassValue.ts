import classes from "../classes"
import { BorderValueName, ClassList, ClassName, ClassType, ClassValueName, ClassValueType, Color3ValueName, UDimValueName, Vector2ValueName, ZValueName } from "../types"
import values from "../values/values"
import Object from "@rbxts/object-utils"

export default (classList: ClassList, classType: ClassType, valueType: ClassValueType = classes[classType].valueTypes[0] as ClassValueType) => {
    const specialClassValues = ((classes[classType] as any).specialValues || []) as ClassName[]
    for(const class_ of classList) {
        if(classType === (class_ as unknown) || (valueType === "special" && (specialClassValues.some(s => s === class_)))) {
            return class_
        } else if(class_.match(`^${classType}%-`).size() > 0) {
            const classValueString = class_.split(`${classType}-`)[1] as ClassValueName
            const isUDim = valueType === "udim"

            if(classValueString.match("%[").size() > 0) {
                const classArbitraryValue = classValueString.sub(1,-2).sub(2)
                if(isUDim) {
                    if(classArbitraryValue.match("px").size() > 0) {
                        return new UDim(0, tonumber(classArbitraryValue.sub(1,-3)))
                    } else if(classArbitraryValue.match("%%").size() > 0) {
                        return new UDim(tonumber(classArbitraryValue.sub(1,-2))!/100, 0)
                    }
                }
            } else {
                const hasUDim = isUDim
                                && Object.keys(values.udim).some(u => u === classValueString)

                const isColor3 = valueType === 'color3'
                            && Object.keys(values.color3).some(u => u === classValueString)

                const isVector2 = valueType === 'vector2'
                            && Object.keys(values.vector2).some(u => u === classValueString)
                
                const isZ = valueType === 'z'
                            && Object.keys(values.z).some(u => u === classValueString)

                const isBorder = valueType === 'border'
                            && Object.keys(values.border).some(u => u === classValueString)


                if(hasUDim) {
                    return values.udim[classValueString as UDimValueName]
                } else if(isColor3) {
                    return values.color3[classValueString as Color3ValueName]
                } else if(isZ) {
                    return values.z[classValueString as ZValueName]
                } else if(isVector2) {
                    return values.vector2[classValueString as Vector2ValueName]
                } else if (isBorder) {
                    return values.border[classValueString as BorderValueName]
                }
            }
        }
    }
    return false
}