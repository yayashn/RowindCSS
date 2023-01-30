import classes from "../classes"
import { BorderValueName, ClassList, ClassName, ClassType, ClassValueName, Color3ValueName, UDimValueName, Vector2ValueName, ZValueName } from "../types"
import values from "../values/values"
import Object from "@rbxts/object-utils"

export default (classList: ClassList, classType: ClassType) => {
    const classValueTypes = classes[classType].valueTypes
    const specialClassValues = ((classes[classType] as any).specialValues || []) as ClassName[]
    for(const class_ of classList) {
        if(classValueTypes.some(classValueType => classValueType === "special") 
        && specialClassValues.some(specialClassValue => specialClassValue === class_)) {
            return class_
        } else if(class_.match(`^${classType}%-`).size() > 0) {
            const classValueString = class_.split(`${classType}-`)[1] as ClassValueName
            const isUDim = classValueTypes.some(classValueType => classValueType === "udim")

            if(classValueString.match("%[").size() > 0) {
                const classArbitraryValue = classValueString.sub(1,-2).sub(2)
                if(classValueTypes.some(classValueType => classValueType === "udim")) {
                    if(classArbitraryValue.match("px").size() > 0) {
                        return new UDim(0, tonumber(classArbitraryValue.sub(1,-3)))
                    } else if(classArbitraryValue.match("%%").size() > 0) {
                        return new UDim(tonumber(classArbitraryValue.sub(1,-2))!/100, 0)
                    }
                }
            } else {
                const hasUDim = isUDim
                                && Object.keys(values.udim).some(u => u === classValueString)

                const isColor3 = classValueTypes.some(classValueType => classValueType === "color3")
                            && Object.keys(values.color3).some(u => u === classValueString)

                const isVector2 = classValueTypes.some(classValueType => classValueType === "vector2")
                            && Object.keys(values.vector2).some(u => u === classValueString)
                
                const isZ = classValueTypes.some(classValueType => classValueType === "z")
                            && Object.keys(values.z).some(u => u === classValueString)

                const isBorder = classValueTypes.some(classValueType => classValueType === "border")
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